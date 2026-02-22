#!/bin/bash
# Load .env file and start the server
set -a
source .env
set +a
node --dns-result-order=ipv4first dist/health-hub/server/server.mjs
