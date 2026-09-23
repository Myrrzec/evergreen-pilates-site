#!/usr/bin/env bash
# Replaces the YOUR-DOMAIN-HERE placeholder with your real domain across
# every HTML/XML/txt file. Run once you own a domain, before going live.
#
# Usage: ./scripts/set-domain.sh example.com
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 yourdomain.com"
  exit 1
fi

DOMAIN="$1"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

grep -rl "YOUR-DOMAIN-HERE" "$ROOT" --include="*.html" --include="*.xml" --include="*.txt" | while read -r file; do
  sed -i '' "s/YOUR-DOMAIN-HERE/$DOMAIN/g" "$file"
  echo "updated: ${file#$ROOT/}"
done

echo "Done. Review the changes with 'git diff' before committing."
