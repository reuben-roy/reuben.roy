#!/bin/bash
# Tear down only this run's verification server. Never kills by process name.
# Evidence in /tmp/reuben-roy-verify-<RUN_ID>/ is left intact.
# Usage: cleanup.sh [--port 4101]
set -u
PORT=4101
if [ "${1:-}" = "--port" ]; then PORT="${2:?missing port}"; fi
if [ -f /tmp/reuben-roy-verify.pid ]; then
  PID="$(cat /tmp/reuben-roy-verify.pid)"
  if kill -0 "$PID" 2>/dev/null; then kill "$PID" && echo "stopped pid $PID"; else echo "pid $PID already gone"; fi
  rm -f /tmp/reuben-roy-verify.pid
else
  echo "no pid file; nothing started by this run to stop"
fi
rm -f /tmp/reuben-roy-verify-server.log /tmp/reuben-roy-verify-home.html
echo "cleanup done (evidence preserved)"
