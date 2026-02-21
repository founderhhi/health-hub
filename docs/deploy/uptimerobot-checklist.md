# UptimeRobot 5-Minute Ping Checklist

Use this checklist to set up basic uptime monitoring against production.

## Monitor target

- Monitor type: `HTTP(s)`
- Friendly name: `health-hub-prod-api-health`
- URL: `https://<your-production-domain>/api/health`
- Monitoring interval: `5 minutes`
- Timeout: default is acceptable

## Setup steps

1. Sign in to UptimeRobot and choose **Add New Monitor**.
2. Select `HTTP(s)` monitor type.
3. Set the monitor name and production URL from the target section.
4. Set monitoring interval to `5 minutes`.
5. Configure alert contacts (email/Slack/webhook) for the on-call path.
6. Save the monitor and wait for the first successful check.

## Validation checklist

- Confirm monitor status changes to **Up**.
- Open the latest check result and verify response body includes:
  - `ok`
  - `db.ok`
  - `ws.status`
- Confirm at least one alert contact receives a test notification.

## Troubleshooting

- If monitor is **Down**, open `https://<your-production-domain>/api/health` in browser or curl.
- If response returns `ok: false`, verify database connectivity and `DATABASE_URL` in deploy environment.
- If `ws.status` is `unavailable`, this does not block uptime checks; it indicates WS helper metrics are not exported.
