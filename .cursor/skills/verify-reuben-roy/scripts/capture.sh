#!/bin/bash
# Fetch one route and store proof artifacts.
# Usage: capture.sh <RUN_ID> <feature> <path> [--port 4101]
set -u
RUN_ID="${1:?usage: capture.sh <RUN_ID> <feature> <path> [--port N]}"
FEATURE="${2:?usage: capture.sh <RUN_ID> <feature> <path> [--port N]}"
ROUTE_PATH="${3:?usage: capture.sh <RUN_ID> <feature> <path> [--port N]}"
PORT=4101
if [ "${4:-}" = "--port" ]; then PORT="${5:?missing port}"; fi
BASE="http://127.0.0.1:${PORT}"
DIR="/tmp/reuben-roy-verify-${RUN_ID}/${FEATURE}"
mkdir -p "$DIR"
HEADERS="$(mktemp)"
STATUS="$(curl -s -D "$HEADERS" -o "$DIR/response.html" -w "%{http_code}" "$BASE$ROUTE_PATH")"
{
  echo "route: $ROUTE_PATH"
  echo "status: $STATUS"
  echo "headers:"
  grep -i -E "^(HTTP|location|content-type)" "$HEADERS" || true
  echo "body_bytes: $(wc -c < "$DIR/response.html" | tr -d ' ')"
} | tee -a "$DIR/assertions.log"
rm -f "$HEADERS"
echo "saved: $DIR/response.html"
