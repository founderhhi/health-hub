import { APIRequestContext, expect } from '@playwright/test';

interface ApiWithAuth {
  token: string;
}

async function readJson<T>(response: Awaited<ReturnType<APIRequestContext['get']>>, label: string): Promise<T> {
  const bodyText = await response.text();
  expect(
    response.ok(),
    `${label} failed (${response.status()}): ${bodyText}`
  ).toBeTruthy();

  return bodyText ? (JSON.parse(bodyText) as T) : ({} as T);
}

function authHeader(auth: ApiWithAuth) {
  return {
    Authorization: `Bearer ${auth.token}`
  };
}

export async function requestGpConsult(
  api: APIRequestContext,
  auth: ApiWithAuth,
  complaint: string
): Promise<any> {
  const response = await api.post('/api/patient/consults', {
    headers: authHeader(auth),
    data: {
      mode: 'video',
      symptoms: {
        complaint
      }
    }
  });

  const payload = await readJson<{ request: any }>(response, 'Patient consult request');
  return payload.request;
}

export async function listGpQueue(api: APIRequestContext, auth: ApiWithAuth): Promise<any[]> {
  const response = await api.get('/api/gp/queue', {
    headers: authHeader(auth)
  });

  const payload = await readJson<{ queue: any[] }>(response, 'GP queue fetch');
  return payload.queue;
}

export async function acceptGpQueueItem(
  api: APIRequestContext,
  auth: ApiWithAuth,
  requestId: string
): Promise<{ consultation: any; roomUrl: string }> {
  const response = await api.post(`/api/gp/queue/${requestId}/accept`, {
    headers: authHeader(auth)
  });

  return readJson<{ consultation: any; roomUrl: string }>(response, 'GP accept queue item');
}

export async function createPrescription(
  api: APIRequestContext,
  auth: ApiWithAuth,
  patientId: string,
  items: Array<{ name: string; dosage: string; frequency: string; duration: string }>
): Promise<any> {
  const response = await api.post('/api/prescriptions', {
    headers: authHeader(auth),
    data: {
      patientId,
      items
    }
  });

  const payload = await readJson<{ prescription: any }>(response, 'Create prescription');
  return payload.prescription;
}

export async function listPatientPrescriptions(
  api: APIRequestContext,
  auth: ApiWithAuth,
  patientId?: string
): Promise<any[]> {
  const query = patientId ? `?patientId=${encodeURIComponent(patientId)}` : '';
  const response = await api.get(`/api/prescriptions${query}`, {
    headers: authHeader(auth)
  });

  const payload = await readJson<{ prescriptions: any[] }>(response, 'List prescriptions');
  return payload.prescriptions;
}

export async function createReferral(
  api: APIRequestContext,
  auth: ApiWithAuth,
  patientId: string,
  reason: string
): Promise<any> {
  const response = await api.post('/api/referrals', {
    headers: authHeader(auth),
    data: {
      patientId,
      urgency: 'routine',
      reason,
      specialty: 'Cardiology'
    }
  });

  const payload = await readJson<{ referral: any }>(response, 'Create referral');
  return payload.referral;
}

export async function listSpecialistReferrals(api: APIRequestContext, auth: ApiWithAuth): Promise<any[]> {
  const response = await api.get('/api/referrals/specialist', {
    headers: authHeader(auth)
  });

  const payload = await readJson<{ referrals: any[] }>(response, 'List specialist referrals');
  return payload.referrals;
}

export async function updateReferralStatus(
  api: APIRequestContext,
  auth: ApiWithAuth,
  referralId: string,
  status: string
): Promise<any> {
  const response = await api.post(`/api/referrals/${referralId}/status`, {
    headers: authHeader(auth),
    data: { status }
  });

  const payload = await readJson<{ referral: any }>(response, 'Update referral status');
  return payload.referral;
}

export async function createLabOrder(
  api: APIRequestContext,
  auth: ApiWithAuth,
  patientId: string,
  tests: string[]
): Promise<any> {
  const response = await api.post('/api/labs', {
    headers: authHeader(auth),
    data: {
      patientId,
      tests
    }
  });

  const payload = await readJson<{ order: any }>(response, 'Create lab order');
  return payload.order;
}

export async function listDiagnosticsOrders(api: APIRequestContext, auth: ApiWithAuth): Promise<any[]> {
  const response = await api.get('/api/labs/diagnostics', {
    headers: authHeader(auth)
  });

  const payload = await readJson<{ orders: any[] }>(response, 'List diagnostics orders');
  return payload.orders;
}

export async function updateDiagnosticsOrderStatus(
  api: APIRequestContext,
  auth: ApiWithAuth,
  orderId: string,
  status: string,
  resultNotes?: string
): Promise<any> {
  const response = await api.post(`/api/labs/diagnostics/${orderId}/status`, {
    headers: authHeader(auth),
    data: {
      status,
      resultNotes
    }
  });

  const payload = await readJson<{ order: any }>(response, 'Update diagnostics status');
  return payload.order;
}

export async function lookupPrescriptionByCode(
  api: APIRequestContext,
  auth: ApiWithAuth,
  code: string
): Promise<any> {
  const response = await api.get(`/api/pharmacy/prescriptions/${encodeURIComponent(code)}`, {
    headers: authHeader(auth)
  });

  const payload = await readJson<{ prescription: any }>(response, 'Lookup prescription by code');
  return payload.prescription;
}

export async function claimPrescription(
  api: APIRequestContext,
  auth: ApiWithAuth,
  prescriptionId: string
): Promise<any> {
  const response = await api.post(`/api/pharmacy/prescriptions/${prescriptionId}/claim`, {
    headers: authHeader(auth),
    data: {
      dispensedItems: []
    }
  });

  const payload = await readJson<{ prescription: any }>(response, 'Claim prescription');
  return payload.prescription;
}

export async function listNotifications(api: APIRequestContext, auth: ApiWithAuth): Promise<any[]> {
  const response = await api.get('/api/notifications', {
    headers: authHeader(auth)
  });

  const payload = await readJson<{ notifications: any[] }>(response, 'List notifications');
  return payload.notifications.map((notification) => {
    if (typeof notification.data === 'string') {
      try {
        return {
          ...notification,
          data: JSON.parse(notification.data)
        };
      } catch {
        return notification;
      }
    }

    return notification;
  });
}
