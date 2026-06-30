#!/usr/bin/env python3
#
# path-guard.py — Claude Code PreToolUse hook for brain-bot.
#
# Hard boundary for the agentic-retrieval jail: deny any Read/Grep/Glob whose
# target resolves OUTSIDE the clean checkout root (the session cwd). This is the
# layer that stops a crafted or prompt-injected question from reading ~/.ssh,
# ~/.claude/MEMORY.md, /etc/passwd, or escaping via `..`. realpath() resolves
# symlinks first, so symlink escapes are caught too.
#
# Contract: reads the hook JSON on stdin; exit 0 = allow, exit 2 = deny (stderr
# is fed back to the model). Fails CLOSED — anything it can't prove safe is denied.

import json
import os
import sys


def deny(reason):
    # Claude Code PreToolUse "deny" contract: emit a permissionDecision on stdout
    # and exit 0. (Exit code 2 is NOT honored as a block in current versions —
    # verified empirically — so the JSON decision is the load-bearing mechanism.)
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))
    sys.stderr.write(reason + "\n")
    sys.exit(0)


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        deny("brain-bot path-guard: could not parse hook input — denying by default.")

    tool = data.get("tool_name", "")
    if tool not in ("Read", "Grep", "Glob"):
        sys.exit(0)  # not a filesystem-read tool we govern

    cwd = data.get("cwd") or os.getcwd()
    root = os.path.realpath(cwd)
    ti = data.get("tool_input") or {}

    # Opt-in trace (set BRAIN_BOT_HOOK_DEBUG=1) — proves the hook is actually
    # invoked by Claude on each governed tool call. Harmless when unset.
    dbg = os.environ.get("BRAIN_BOT_HOOK_DEBUG")
    if dbg:
        try:
            with open(dbg if dbg != "1" else "/tmp/brain-bot-hook.log", "a") as fh:
                fh.write(f"hook fired: tool={tool} input={json.dumps(ti)[:200]}\n")
        except Exception:
            pass

    # The path each tool will touch. Grep/Glob with no `path` default to cwd → fine.
    if tool == "Read":
        targets = [ti.get("file_path")]
    else:  # Grep, Glob
        p = ti.get("path")
        targets = [p] if p else []

    for t in targets:
        if not t:
            continue
        ap = t if os.path.isabs(t) else os.path.join(root, t)
        rp = os.path.realpath(ap)
        if rp != root and not rp.startswith(root + os.sep):
            deny(
                f"brain-bot: access to '{t}' is denied — it resolves outside the "
                f"repository checkout. The bot may only read the Toggle Brain repo."
            )

    sys.exit(0)  # allowed


if __name__ == "__main__":
    main()
