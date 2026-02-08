#!/bin/bash
# Load .env file and start the server
set -a
source .env
set +a
node dist/health-hub/server/server.mjs
