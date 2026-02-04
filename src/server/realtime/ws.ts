import type { Server as HttpServer } from 'node:http';
import { WebSocketServer, WebSocket, RawData } from 'ws';

type Role = string;

const roleConnections = new Map<Role, Set<WebSocket>>();
const userConnections = new Map<string, Set<WebSocket>>();

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

export function initWebSocketServer(server: HttpServer) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (raw: RawData) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.type === 'subscribe') {
          const { role, userId } = msg;
          if (role) addToMap(roleConnections, role, ws);
          if (userId) addToMap(userConnections, userId, ws);
          ws.send(JSON.stringify({ type: 'subscribed', role, userId }));
        }
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid WS message' }));
      }
    });

    ws.on('close', () => {
      for (const [role, set] of roleConnections.entries()) {
        if (set.has(ws)) removeFromMap(roleConnections, role, ws);
      }
      for (const [userId, set] of userConnections.entries()) {
        if (set.has(ws)) removeFromMap(userConnections, userId, ws);
      }
    });
  });
}

function broadcast(set: Set<WebSocket> | undefined, payload: unknown) {
  if (!set) return;
  const message = JSON.stringify(payload);
  for (const ws of set) {
    if (ws.readyState === ws.OPEN) {
      ws.send(message);
    }
  }
}

export function broadcastToRole(role: Role, event: string, data: unknown) {
  broadcast(roleConnections.get(role), { event, data });
}

export function broadcastToUser(userId: string, event: string, data: unknown) {
  broadcast(userConnections.get(userId), { event, data });
}
