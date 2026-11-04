# Task Master weekly pull — lives outside this repo

The scripts are **not** here. They run from:

```
~/toggle-automation/task-pull/
```

## Why not in this folder

macOS TCC (Transparency, Consent & Control) blocks `launchd`-spawned processes
from reading or writing `~/Desktop`, `~/Documents` and `~/Downloads`. A copy
under `~/Desktop/Toggle_claude/` runs fine when *you* launch it from Terminal,
but the scheduled run dies with:

```
/bin/bash: .../run_pull.sh: Operation not permitted
```

Rather than granting Full Disk Access to `/bin/bash` (which would hand every
bash script on the machine access to everything), the tool lives in an
unprotected directory in `$HOME`.

## What it does

Every **Monday 19:07** it signs in to the `toggle-task-master` Firebase project
with anonymous auth — the same thing https://toggle-task-master.web.app/ does in
the browser — pulls the whole `tasks` collection over the Firestore REST API,
resolves `ownerId` against `team/roster`, and writes:

| File | Contents |
|---|---|
| `reports/active-tasks-latest.md` | Always the newest digest |
| `reports/active-tasks-YYYY-MM-DD.md` | Dated digest (overdue table + per-owner breakdown) |
| `reports/active-tasks-YYYY-MM-DD.json` | Full structured snapshot |
| `logs/pull.log` | Run history |

"Open" means `status` is `active` or `blocked`; `done` is excluded.

## Common commands

```bash
# Read the latest pull
cat ~/toggle-automation/task-pull/reports/active-tasks-latest.md

# Run right now, print to terminal
python3 ~/toggle-automation/task-pull/pull_active_tasks.py --stdout

# Force the scheduled job to fire now
launchctl kickstart -k gui/$(id -u)/com.toggle.taskpull

# Is it registered? (second column is the last exit code; 0 = healthy)
launchctl list | grep taskpull

# Change the schedule
#   edit ~/Library/LaunchAgents/com.toggle.taskpull.plist, then:
launchctl bootout    gui/$(id -u)/com.toggle.taskpull
launchctl bootstrap  gui/$(id -u) ~/Library/LaunchAgents/com.toggle.taskpull.plist

# Turn it off for good
launchctl bootout gui/$(id -u)/com.toggle.taskpull
rm ~/Library/LaunchAgents/com.toggle.taskpull.plist
```

## Caveat worth knowing

If the Mac is fully powered off at 19:07 Monday, the run is skipped. `launchd`
fires a missed calendar job as soon as the machine wakes from *sleep*, but a
shutdown window is simply lost — the next run is the following Monday. Run the
`kickstart` command above to catch up manually.
