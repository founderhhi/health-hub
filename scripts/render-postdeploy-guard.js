/* eslint-disable no-console */
const { execSync } = require('node:child_process');

const RENDER_API_BASE = 'https://api.render.com/v1';

function requiredEnv(name) {
  const value = (process.env[name] || '').trim();
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function optionalEnv(name) {
  const value = (process.env[name] || '').trim();
  return value || null;
}

function buildHeaders(apiKey) {
  return {
    authorization: `Bearer ${apiKey}`,
    accept: 'application/json',
    'content-type': 'application/json'
  };
}

async function renderRequest(path, init) {
  const response = await fetch(`${RENDER_API_BASE}${path}`, init);
  const bodyText = await response.text();
  let json = {};
  if (bodyText) {
    try {
      json = JSON.parse(bodyText);
    } catch {
      json = { raw: bodyText };
    }
  }

  if (!response.ok) {
    throw new Error(`Render API ${path} failed (${response.status}): ${JSON.stringify(json)}`);
  }

  return json;
}

async function getCurrentLiveDeployId(apiKey, serviceId) {
  if (!apiKey || !serviceId) {
    return null;
  }

  const deploys = await renderRequest(
    `/services/${serviceId}/deploys?limit=20`,
    {
      method: 'GET',
      headers: buildHeaders(apiKey)
    }
  );

  if (!Array.isArray(deploys)) {
    return null;
  }

  const liveDeploy = deploys.find((deploy) => deploy?.status === 'live');
  return liveDeploy?.id || null;
}

async function rollbackDeploy(apiKey, serviceId, deployId) {
  if (!apiKey || !serviceId || !deployId) {
    console.warn('Rollback skipped: missing Render API context.');
    return;
  }

  await renderRequest(
    `/services/${serviceId}/deploys/${deployId}/rollback`,
    {
      method: 'POST',
      headers: buildHeaders(apiKey),
      body: JSON.stringify({})
    }
  );

  console.log(`Rollback triggered to deploy ${deployId}.`);
}

async function triggerDeployHook(hookUrl) {
  const response = await fetch(hookUrl, { method: 'POST' });
  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(`Deploy hook failed (${response.status}): ${bodyText}`);
  }
}

function runSmokeChecks(baseUrl) {
  execSync('npm run deploy:smoke', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DEPLOY_BASE_URL: baseUrl
    }
  });
}

async function main() {
  const hookUrl = requiredEnv('RENDER_DEPLOY_HOOK_URL');
  const baseUrl = requiredEnv('DEPLOY_BASE_URL');
  const envLabel = optionalEnv('RENDER_ENV_LABEL') || 'environment';
  const rollbackOnFailure = (optionalEnv('RENDER_ROLLBACK_ON_FAILURE') || 'true').toLowerCase() !== 'false';
  const apiKey = optionalEnv('RENDER_API_KEY');
  const serviceId = optionalEnv('RENDER_SERVICE_ID');

  console.log(`Starting post-deploy guard for ${envLabel}.`);
  const previousLiveDeployId = await getCurrentLiveDeployId(apiKey, serviceId);
  if (previousLiveDeployId) {
    console.log(`Previous live deploy captured: ${previousLiveDeployId}`);
  } else {
    console.log('No previous live deploy captured (rollback may be unavailable).');
  }

  await triggerDeployHook(hookUrl);
  console.log('Deploy hook accepted. Running post-deploy smoke checks.');

  try {
    runSmokeChecks(baseUrl);
    console.log(`Post-deploy smoke checks passed for ${envLabel}.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Post-deploy smoke checks failed for ${envLabel}: ${message}`);
    if (rollbackOnFailure) {
      await rollbackDeploy(apiKey, serviceId, previousLiveDeployId);
    } else {
      console.warn('Rollback disabled by RENDER_ROLLBACK_ON_FAILURE=false.');
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`Post-deploy guard failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
