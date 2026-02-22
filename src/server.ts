import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { apiRouter } from './server/api';
import { healthCheck as dbHealthCheck } from './server/db';
import { initWebSocketServer } from './server/realtime/ws';
import * as wsModule from './server/realtime/ws';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const isTestEnv = process.env['NODE_ENV'] === 'test';
const canonicalRedirectSourceHost = (
  process.env['CANONICAL_REDIRECT_SOURCE_HOST'] || 'healthhubinternational.com'
).toLowerCase();
const canonicalRedirectTargetHost = (
  process.env['CANONICAL_REDIRECT_TARGET_HOST'] || 'www.healthhubinternational.com'
).toLowerCase();

type WsHealthResponse = {
  status: 'ok' | 'degraded' | 'unavailable';
  metrics?: Record<string, unknown>;
  note?: string;
};

async function getWsHealthResponse(): Promise<WsHealthResponse> {
  const wsExports = wsModule as Record<string, unknown>;
  const statusHelperCandidates = [
    'getWsHealthStatus',
    'getWebSocketHealth',
    'getWsHealth',
  ];
  const metricsHelperCandidates = [
    'getWsHealthMetrics',
    'getWebSocketMetrics',
    'getWsMetrics',
  ];

  for (const helperName of statusHelperCandidates) {
    const helper = wsExports[helperName];
    if (typeof helper !== 'function') {
      continue;
    }

    try {
      const snapshot = await Promise.resolve((helper as () => unknown)());
      if (snapshot && typeof snapshot === 'object') {
        const statusSnapshot = snapshot as Record<string, unknown>;
        const ok = statusSnapshot['ok'];
        const reasons = statusSnapshot['reasons'];
        const status = ok === false ? 'degraded' : 'ok';
        const note = Array.isArray(reasons) && reasons.length > 0
          ? String(reasons.join(', '))
          : undefined;
        return {
          status,
          metrics: statusSnapshot,
          ...(note ? { note } : {}),
        };
      }

      return {
        status: 'ok',
        metrics: { value: snapshot ?? null },
      };
    } catch (error) {
      return {
        status: 'degraded',
        note: 'WS health helper failed',
        metrics: {
          error: error instanceof Error ? error.message : 'Unknown error',
          helper: helperName,
        },
      };
    }
  }

  for (const helperName of metricsHelperCandidates) {
    const helper = wsExports[helperName];
    if (typeof helper !== 'function') {
      continue;
    }

    try {
      const snapshot = await Promise.resolve((helper as () => unknown)());
      if (snapshot && typeof snapshot === 'object') {
        return { status: 'ok', metrics: snapshot as Record<string, unknown> };
      }

      return {
        status: 'ok',
        metrics: { value: snapshot ?? null },
      };
    } catch (error) {
      return {
        status: 'degraded',
        note: 'WS health helper failed',
        metrics: {
          error: error instanceof Error ? error.message : 'Unknown error',
          helper: helperName,
        },
      };
    }
  }

  return {
    status: 'unavailable',
    note: 'WS health helper not exported',
  };
}

function getForwardedHeaderValue(rawHeader: string | string[] | undefined): string {
  if (Array.isArray(rawHeader)) {
    return (rawHeader[0] || '').split(',')[0].trim().toLowerCase();
  }
  return (rawHeader || '').split(',')[0].trim().toLowerCase();
}

function normalizeHostHeader(rawHost: string | undefined): string {
  return (rawHost || '').trim().toLowerCase().replace(/\.$/, '').replace(/:\d+$/, '');
}

app.set('trust proxy', true);

// Canonical custom-domain redirect: apex -> www for production traffic.
app.use((req, res, next) => {
  if (process.env['NODE_ENV'] !== 'production') {
    return next();
  }

  const forwardedHost = getForwardedHeaderValue(req.headers['x-forwarded-host']);
  const host = normalizeHostHeader(forwardedHost || req.headers.host);
  if (host !== canonicalRedirectSourceHost) {
    return next();
  }

  const forwardedProto = getForwardedHeaderValue(req.headers['x-forwarded-proto']);
  const protocol = forwardedProto || 'https';
  const targetPath = req.originalUrl || '/';
  return res.redirect(308, `${protocol}://${canonicalRedirectTargetHost}${targetPath}`);
});

// INF-04: Structured JSON request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(JSON.stringify({
        ts: new Date().toISOString(),
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration,
      }));
    }
  });
  next();
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// INF-03: Global rate limiter (100 req / 15 min per IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
  skip: () => isTestEnv,
});

// AUTH-04: Strict login limiter (5 req / 1 min per IP)
const authLoginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts. Please try again later.' },
  skip: () => isTestEnv,
});

// INF-03: Strict limiter for non-login auth routes (10 req / 15 min per IP)
const authSignupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts. Please try again later.' },
  skip: () => isTestEnv,
});

app.use('/api', globalLimiter);
app.use('/api/auth/login', authLoginLimiter);
app.use('/api/auth/signup', authSignupLimiter);

// INF-06: Deep readiness response for infra observability.
// Keep /api/health and /api/healthz as lightweight liveness routes from apiRouter.
app.get('/api/ready', async (_req, res) => {
  try {
    const dbOk = await dbHealthCheck();
    const ws = await getWsHealthResponse();
    const ok = dbOk;

    res.status(ok ? 200 : 503).json({
      ok,
      db: { ok: dbOk },
      ws,
    });
  } catch (error) {
    res.status(503).json({
      ok: false,
      db: { ok: false },
      ws: {
        status: 'degraded',
        note: error instanceof Error ? error.message : 'Health check failed',
      },
    });
  }
});

app.use('/api', apiRouter);

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Global error handler - returns JSON instead of HTML stack traces.
 */
app.use((err: any, _req: any, res: any, next: any) => {
  console.error(JSON.stringify({
    ts: new Date().toISOString(),
    level: 'error',
    message: err?.message || 'Unknown error',
    stack: process.env['NODE_ENV'] !== 'production' ? err?.stack : undefined,
  }));
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    error: 'Something went wrong. Please try again.'
  });
});

/**
 * Production safety: reject startup if JWT_SECRET is missing or insecure.
 */
if (
  process.env['NODE_ENV'] === 'production' &&
  (!process.env['JWT_SECRET'] || process.env['JWT_SECRET'] === 'demo_secret')
) {
  console.error('FATAL: JWT_SECRET must be set to a secure value in production.');
  process.exit(1);
}

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  const server = createServer(app);
  initWebSocketServer(server);

  server.on('error', (error) => {
    throw error;
  });

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  // INF-05: Graceful shutdown handler
  function shutdown(signal: string) {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
    // Force exit after 10 seconds if connections don't close
    setTimeout(() => {
      console.error('Forced shutdown after timeout.');
      process.exit(1);
    }, 10_000).unref();
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
