export const E2E_SELECTORS = {
  auth: {
    loginPhone: '[data-testid="login-phone"]',
    loginPassword: '[data-testid="login-password"]',
    loginSubmit: '[data-testid="login-submit"]',
    forgotPasswordLink: '[data-testid="forgot-password-link"]',
    forgotPasswordPhone: '[data-testid="forgot-password-phone"]',
    forgotPasswordSubmit: '[data-testid="forgot-password-submit"]'
  },
  patient: {
    serviceGp: '[data-testid="service-gp"]',
    serviceSpecialist: '[data-testid="service-specialist"]',
    servicePharmacy: '[data-testid="service-pharmacy"]',
    serviceDiagnosticsComingSoon: '[data-testid="service-diagnostics-coming-soon"]'
  },
  pharmacy: {
    codeInput: '[data-testid="pharmacy-code-input"]',
    lookupButton: '[data-testid="pharmacy-lookup-button"]'
  },
  diagnostics: {
    acceptOrder: '[data-testid="diagnostics-accept-order"]',
    rejectOrder: '[data-testid="diagnostics-reject-order"]'
  }
} as const;
