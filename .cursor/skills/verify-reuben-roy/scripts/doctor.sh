#!/bin/bash
# Read-only health check for a verification instance of reuben.roy.
# Usage: doctor.sh [--port 4101] [--base http://127.0.0.1:4101]
set -u
PORT=4101
BASE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --port) PORT="$2"; shift 2 ;;
    --base) BASE="$2"; shift 2 ;;
    *) echo "unknown flag: $1" >&2; exit 2 ;;
  esac
done
if [ -z "$BASE" ]; then BASE="http://127.0.0.1:${PORT}"; fi
FAIL=0
check() {
  if [ "$1" = "0" ]; then echo "ok: $2"; else echo "FAIL: $2"; FAIL=1; fi
}
if [ -f /tmp/reuben-roy-verify.pid ]; then
  PID="$(cat /tmp/reuben-roy-verify.pid)"
  if kill -0 "$PID" 2>/dev/null; then echo "ok: pid $PID alive"; else echo "FAIL: pid $PID not alive"; FAIL=1; fi
else
  echo "info: no /tmp/reuben-roy-verify.pid (proceeds if port answers)"
fi
HOME_BODY="$(curl -sf "$BASE/" 2>/dev/null)"; check "$?" "GET / answers 200"
echo "$HOME_BODY" | grep -q "Play the portfolio."; check "$?" "/ contains corridor marker"
CAREER_BODY="$(curl -sf "$BASE/career" 2>/dev/null)"; check "$?" "GET /career answers 200"
echo "$CAREER_BODY" | grep -q "A generalist"; check "$?" "/career contains narrative marker"
REDIRECT_LINE="$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$BASE/about" 2>/dev/null)"
echo "$REDIRECT_LINE" | grep -q "explosion.fun"; check "$?" "/about redirects to explosion.fun ($REDIRECT_LINE)"
[ "$FAIL" = "0" ] && echo "doctor: healthy ($BASE)" || echo "doctor: UNHEALTHY ($BASE)"
exit "$FAIL"
