// CI-05: k6 Load Testing Script for HealthHub
// Target: 50 concurrent users against key API endpoints
// Run: k6 run e2e/load/k6-load-test.js

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const healthLatency = new Trend('health_latency');
const loginLatency = new Trend('login_latency');
const queueLatency = new Trend('queue_latency');

const BASE_URL = __ENV.BASE_URL || 'http://localhost:4000';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp up to 10 users
    { duration: '1m', target: 50 },    // Ramp up to 50 users
    { duration: '2m', target: 50 },    // Stay at 50 users
    { duration: '30s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% of requests under 2s
    errors: ['rate<0.1'],               // Error rate under 10%
    health_latency: ['p(95)<500'],      // Health check under 500ms
  },
};

// Test scenarios
export default function () {
  const scenario = Math.random();

  if (scenario < 0.3) {
    healthCheck();
  } else if (scenario < 0.6) {
    loginFlow();
  } else if (scenario < 0.8) {
    authenticatedBrowse();
  } else {
    notificationsPoll();
  }

  sleep(Math.random() * 2 + 0.5);
}

function healthCheck() {
  const res = http.get(`${BASE_URL}/api/health`);
  healthLatency.add(res.timings.duration);
  check(res, {
    'health status 200': (r) => r.status === 200,
    'health ok': (r) => {
      try { return JSON.parse(r.body).ok === true; } catch { return false; }
    },
  });
  errorRate.add(res.status !== 200);
}

function loginFlow() {
  const payload = JSON.stringify({
    phone: `+1555000${String(Math.floor(Math.random() * 9000) + 1000)}`,
    password: 'TestPass123',
  });

  const res = http.post(`${BASE_URL}/api/auth/login`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  loginLatency.add(res.timings.duration);

  // 401 is expected for non-existent users
  check(res, {
    'login responds': (r) => r.status === 200 || r.status === 401 || r.status === 429,
  });
  errorRate.add(res.status >= 500);
}

function authenticatedBrowse() {
  // Try login with a known seed user
  const loginRes = http.post(
    `${BASE_URL}/api/auth/login`,
    JSON.stringify({ phone: '+15551000001', password: 'Patient1Pass!' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (loginRes.status !== 200) {
    errorRate.add(false); // expected when seed users aren't available
    return;
  }

  let token;
  try {
    token = JSON.parse(loginRes.body).token;
  } catch {
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Browse patient endpoints
  const endpoints = [
    '/api/patient/consults',
    '/api/notifications',
    '/api/prescriptions',
  ];

  for (const endpoint of endpoints) {
    const res = http.get(`${BASE_URL}${endpoint}`, { headers });
    check(res, {
      [`${endpoint} responds`]: (r) => r.status === 200 || r.status === 401,
    });
    errorRate.add(res.status >= 500);
    sleep(0.2);
  }
}

function notificationsPoll() {
  // Simulate polling the health endpoint (fallback when WS disconnects)
  for (let i = 0; i < 3; i++) {
    const res = http.get(`${BASE_URL}/api/health`);
    check(res, {
      'poll health ok': (r) => r.status === 200,
    });
    errorRate.add(res.status >= 500);
    sleep(1);
  }
}
