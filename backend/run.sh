#!/usr/bin/env bash
#
# Run the SAP CAP (Java) backend.
#
#   ./run.sh             # start on port 8080 (default)
#   ./run.sh 8081        # start on a different port
#
# Sets up the toolchain (JDK 21 + Maven) that isn't on the default PATH,
# then launches the Spring Boot / CAP runtime via Maven.

set -euo pipefail

# --- toolchain (not on the default PATH on this machine) ---
export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export PATH="$HOME/.npm-global/bin:/opt/homebrew/opt/openjdk@21/bin:/opt/homebrew/bin:$PATH"

# --- run from the directory this script lives in ---
cd "$(dirname "$0")"

PORT="${1:-8080}"

echo "Starting CAP backend on http://localhost:${PORT}/ ..."
echo "  Fiori preview: http://localhost:${PORT}/\$fiori-preview"
echo "  Invoices:      http://localhost:${PORT}/odata/v4/InvoiceService/Invoices"
echo "  Stop with Ctrl-C"
echo

exec mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=${PORT}"
