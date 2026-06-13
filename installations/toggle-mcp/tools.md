---
sidebar_position: 5
---

# Tools

Tools are callable scripts that run server-side and return output. They are auto-registered from any `.ts` or `.py` file found anywhere in `content/` (the toggle-brain root).

> **Currently:** no tools are registered — there are no scripts in `content/` yet.

---

## How tools are registered

The loader scans `content/**/*.ts` and `content/**/*.py` on startup. Each file becomes a tool with:

- **Name** — derived from the file path (`content/scripts/generate-pdf.ts` → `scripts_generate_pdf`)
- **Description** — the first comment line in the file (`// Generate a PDF from a brief` or `# Generate a PDF from a brief`)
- **Runtime** — `node` for `.ts` files (run via `tsx`), `python3` for `.py` files

---

## Input / output

Tools receive a single JSON object via stdin and return plain text via stdout:

```ts
// stdin
{ "args": { "client": "audaura-unitar", "month": "2026-05" } }

// stdout (returned to the MCP client)
"Generated report for audaura-unitar — May 2026"
```

---

## Adding a tool

1. Create a `.ts` or `.py` script anywhere in toggle-brain (e.g. `scripts/generate-report.ts`).
2. Add a single-line comment at the top describing what it does — this becomes the tool description in the MCP client.
3. Read args from stdin as JSON. Write output to stdout.
4. Push to `main` — the server auto-registers it on next restart.

**TypeScript example:**

```ts
// Generate a monthly performance summary for a client
import { readFileSync } from 'fs';

const input = JSON.parse(readFileSync('/dev/stdin', 'utf-8'));
const { client, month } = input.args ?? {};

console.log(`Performance summary for ${client} — ${month}`);
```

**Python example:**

```python
# Generate a monthly performance summary for a client
import json, sys

input = json.load(sys.stdin)
client = input.get("args", {}).get("client", "")
month = input.get("args", {}).get("month", "")

print(f"Performance summary for {client} — {month}")
```

---

## Timeout

Scripts are killed after **30 seconds**. Keep tools fast — heavy data processing belongs in a separate service, not an MCP tool.
