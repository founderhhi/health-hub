import type { Server as HttpServer } from 'node:http';
import { WebSocketServer, WebSocket, RawData } from 'ws';
import * as jwt from 'jsonwebtoken';
import { createClient, type RedisClientType } from 'redis';

type Role = string;
type CloseCode = 1008;

interface WsAuthClaims {
  userId: string;
  role: string;
  tokenType: 'access';
}

interface WsHealthStatus {
  ok: boolean;
  metrics: WsHealthMetrics;
  reasons: string[];
}

export interface WsHealthMetrics {
  uptimeMs: number;
  activeConnections: number;
  authenticatedConnections: number;
  roleChannelCount: number;
  userChannelCount: number;
  roleSubscriptions: number;
  userSubscriptions: number;
  unauthorizedRejects: number;
  heartbeatTerminations: number;
}

const roleConnections = new Map<Role, Set<WebSocket>>();
const userConnections = new Map<string, Set<WebSocket>>();
const connectionClaims = new WeakMap<WebSocket, WsAuthClaims>();
const jwtSecret = process.env['JWT_SECRET'] || 'demo_secret';

const wsCounters = {
  unauthorizedRejects: 0,
  heartbeatTerminations: 0
};

let wsServer: WebSocketServer | null = null;
let wsStartedAt = 0;

// WS-07: Redis pub/sub adapter for multi-instance scaling
let redisPub: RedisClientType | null = null;
let redisSub: RedisClientType | null = null;
const REDIS_CHANNEL = 'healthhub:ws:broadcast';

async function initRedisAdapter(): Promise<boolean> {
  const redisUrl = process.env['REDIS_URL'];
  if (!redisUrl) return false;

  try {
    redisPub = createClient({ url: redisUrl }) as RedisClientType;
    redisSub = (redisPub as RedisClientType).duplicate() as RedisClientType;

    await redisPub.connect();
    await redisSub.connect();

    await redisSub.subscribe(REDIS_CHANNEL, (message: string) => {
      try {
        const { type, key, payload } = JSON.parse(message) as {
          type: 'role' | 'user';
          key: string;
          payload: unknown;
        };
        const targetMap = type === 'role' ? roleConnections : userConnections;
        localBroadcast(targetMap.get(key), payload);
      } catch {
        // ignore malformed redis messages
      }
    });

    console.log('WS-07: Redis pub/sub adapter connected');
    return true;
  } catch (error) {
    console.error('WS-07: Redis adapter failed to connect, falling back to local:', error);
    redisPub = null;
    redisSub = null;
    return false;
  }
}

function localBroadcast(set: Set<WebSocket> | undefined, payload: unknown) {
  if (!set) return;
  const message = JSON.stringify(payload);
  for (const ws of set) {
    if (ws.readyState === ws.OPEN) {
      ws.send(message);
    }
  }
}

const CLOSE_POLICY_VIOLATION: CloseCode = 1008;

function addToMap(map: Map<string, Set<WebSocket>>, key: string, ws: WebSocket) {
  if (!map.has(key)) {
    map.set(key, new Set());
  }
  map.get(key)?.add(ws);
}

function removeFromMap(map: Map<string, Set<WebSocket>>, key: string, ws: WebSocket) {
  const set = map.get(key);
  if (!set) return;
  set.delete(ws);
  if (set.size === 0) {
    map.delete(key);
  }
}

// WS-03: Heartbeat ping-pong interval (30 seconds)
const HEARTBEAT_INTERVAL = 30_000;
const aliveMap = new WeakMap<WebSocket, boolean>();

function resolveTokenClaims(token: string): WsAuthClaims | null {
  try {
    const payload = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    const userId = typeof payload['userId'] === 'string' ? payload['userId'] : '';
    const role = typeof payload['role'] === 'string' ? payload['role'] : '';
    const tokenType = typeof payload['tokenType'] === 'string' ? payload['tokenType'] : '';
    if (!userId || !role || tokenType !== 'access') {
      return null;
    }
    return { userId, role, tokenType: 'access' };
  } catch {
    return null;
  }
}

function getTokenFromConnectionUrl(rawUrl: string | undefined) {
  const requestUrl = rawUrl || '/ws';
  const parsedUrl = new URL(requestUrl, 'http://localhost');
  return parsedUrl.searchParams.get('token') || '';
}

export function initWebSocketServer(server: HttpServer) {
  const wss = new WebSocketServer({ server, path: '/ws' });
  wsServer = wss;
  wsStartedAt = Date.now();

  // WS-07: Attempt Redis adapter connection (non-blocking)
  initRedisAdapter().catch(() => {});

  // WS-03: Heartbeat timer to detect dead connections
  const heartbeatTimer = setInterval(() => {
    for (const ws of wss.clients) {
      if (!aliveMap.get(ws)) {
        wsCounters.heartbeatTerminations += 1;
        ws.terminate();
        continue;
      }
      aliveMap.set(ws, false);
      ws.ping();
    }
  }, HEARTBEAT_INTERVAL);

  wss.on('close', () => clearInterval(heartbeatTimer));

  wss.on('connection', (ws: WebSocket, request) => {
    const token = getTokenFromConnectionUrl(request.url);
    const claims = resolveTokenClaims(token);
    if (!claims) {
      wsCounters.unauthorizedRejects += 1;
      ws.close(CLOSE_POLICY_VIOLATION, 'Unauthorized');
      return;
    }

    connectionClaims.set(ws, claims);
    aliveMap.set(ws, true);

    ws.on('pong', () => {
      aliveMap.set(ws, true);
    });

    ws.on('message', (raw: RawData) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.type === 'subscribe') {
          const authClaims = connectionClaims.get(ws);
          if (!authClaims) {
            ws.close(CLOSE_POLICY_VIOLATION, 'Unauthorized');
            return;
          }
          const { role, userId } = authClaims;
          if (role) addToMap(roleConnections, role, ws);
          if (userId) addToMap(userConnections, userId, ws);
          ws.send(JSON.stringify({ type: 'subscribed', role, userId }));
        }
        // WS-03: Client can send ping, we reply with pong event
        if (msg.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong', ts: Date.now() }));
        }
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid WS message' }));
      }
    });

    // WS-02: Handle errors on individual connections
    ws.on('error', (err) => {
      console.error('WebSocket client error:', err.message);
    });

    ws.on('close', () => {
      connectionClaims.delete(ws);
      for (const [role, set] of roleConnections.entries()) {
        if (set.has(ws)) removeFromMap(roleConnections, role, ws);
      }
      for (const [userId, set] of userConnections.entries()) {
        if (set.has(ws)) removeFromMap(userConnections, userId, ws);
      }
    });
  });
}

// WS-07: Broadcast via Redis if available, otherwise local-only
async function distributedBroadcast(type: 'role' | 'user', key: string, payload: unknown) {
  if (redisPub) {
    try {
      await redisPub.publish(REDIS_CHANNEL, JSON.stringify({ type, key, payload }));
      return;
    } catch {
      // Redis publish failed, fall back to local
    }
  }
  const targetMap = type === 'role' ? roleConnections : userConnections;
  localBroadcast(targetMap.get(key), payload);
}

export function broadcastToRole(role: Role, event: string, data: unknown) {
  void distributedBroadcast('role', role, { event, data }).catch((error) => {
    console.error('WS broadcastToRole failed:', error);
  });
}

export function broadcastToUser(userId: string, event: string, data: unknown) {
  void distributedBroadcast('user', userId, { event, data }).catch((error) => {
    console.error('WS broadcastToUser failed:', error);
  });
}

function countSubscriptions(connectionMap: Map<string, Set<WebSocket>>) {
  let total = 0;
  for (const clients of connectionMap.values()) {
    total += clients.size;
  }
  return total;
}

export function getWsHealthMetrics(): WsHealthMetrics {
  const activeConnections = wsServer ? wsServer.clients.size : 0;
  return {
    uptimeMs: wsStartedAt ? Date.now() - wsStartedAt : 0,
    activeConnections,
    authenticatedConnections: activeConnections,
    roleChannelCount: roleConnections.size,
    userChannelCount: userConnections.size,
    roleSubscriptions: countSubscriptions(roleConnections),
    userSubscriptions: countSubscriptions(userConnections),
    unauthorizedRejects: wsCounters.unauthorizedRejects,
    heartbeatTerminations: wsCounters.heartbeatTerminations
  };
}

export function getWsHealthStatus(): WsHealthStatus {
  const metrics = getWsHealthMetrics();
  const reasons: string[] = [];

  if (!wsServer) {
    reasons.push('ws-server-not-initialized');
  }
  if (metrics.roleSubscriptions < metrics.activeConnections) {
    reasons.push('connections-missing-subscriptions');
  }

  return {
    ok: reasons.length === 0,
    metrics,
    reasons
  };
}
