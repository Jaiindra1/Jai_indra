#!/bin/sh
set -eu

python - <<'PY'
from core.browser import browser_session
from core import search_diagnostics as diagnostics

try:
    with browser_session() as driver:
        driver.set_page_load_timeout(15)
        driver.get('data:text/html,<title>SARTHI browser readiness</title>')
        if driver.title != 'SARTHI browser readiness':
            raise RuntimeError('Browser readiness page was not received.')
    diagnostics.event('browser_preflight_passed')
except Exception as error:
    diagnostics.event('browser_preflight_failed', **diagnostics.error_details(error))
    raise SystemExit('Browser readiness failed; inspect search-diagnostics logs.') from None
PY

# Explicit port binding is required in the container. Keep Gunicorn's timeout;
# moving driver discovery/downloads out of requests addresses the observed stall.
exec gunicorn --bind "0.0.0.0:${PORT:-10000}" main:app
