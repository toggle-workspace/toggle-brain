# Scope of Work

The document we send a client at the point of close. It says what Toggle will deliver, how much of
it, and by when, then names what is not included. Both sides sign it.

It exists to stop two things: Toggle forgetting a committed deliverable, and a client claiming we
promised more than we did.

## The three files

| File | What it is |
|---|---|
| `build-scope-of-work.py` | Reads a JSON brief plus `brain/services/*.md`, writes the `.docx` |
| `example-input.json` | The JSON shape, with every service turned on. Copy it, do not edit it |
| `Toggle-Scope-of-Work-BLANK.docx` | Reference copy built from the example. Open it to see the shape |

The scope wording lives in `brain/services/*.md` and nowhere else. This folder holds the layout.

## Running it

```bash
# the reference copy
uv run --with python-docx templates/scope-of-work/build-scope-of-work.py \
  templates/scope-of-work/example-input.json \
  templates/scope-of-work/Toggle-Scope-of-Work-BLANK.docx

# a real client, with a PDF alongside
uv run --with python-docx templates/scope-of-work/build-scope-of-work.py \
  clients/<slug>/01-strategy/<slug>-scope-of-work.json --pdf
```

With no output path it writes `<slug>-scope-of-work-<document_date>.docx` next to the JSON.

Send the PDF rather than the `.docx` when the client will not have Inter Tight installed, which is
most of the time. Word substitutes a missing font and the document loses its brand face.

## Usually you do not run it by hand

Type `/scope-of-work` and give it the proposal and the quotation. The generator
(`generators/scope-of-work.md`) reads both, writes the JSON, and runs this script.

## The brain format

Every service file carries a `scope_line:` in its frontmatter plus three blocks under
`## Scope of work`. The parser is strict about them.

`scope_line` is the one plain sentence printed under the service name in the document. Keep it
descriptive. The tagline under the file's H1 is sales copy for the website and the decks, and it
reads wrong inside something a client signs, so it is only used when `scope_line` is missing.

### `### In scope`

A four column markdown table.

| Column | What goes in it |
|---|---|
| Deliverable | What the client reads in the first column of their table. Also the key used by JSON overrides |
| How much | The volume limit. Two revision rounds, up to ten fixes a month, four concepts |
| Type | `key`, `once` or `recurring` |
| Typical timing | A week code or free text, see below |

**Type** decides where the row shows up. `key` gets a real date and appears on the client's key
dates page. `once` gets a real date but stays inside its service section. `recurring` prints its
cadence as written.

**Typical timing** is either a week code or free text:

- `W0` resolves to the engagement start date. `W3` resolves to three weeks after it. A date landing
  on a Saturday or Sunday moves to the following Monday.
- Anything else prints exactly as written. `Every week`, `Every month, by the 5th working day`,
  `30 days from launch`.
- A recurring row can date its first occurrence, and name how that reads on the key dates page:
  `Every month, by the 5th working day (first: W5 = Your first performance report)`. Drop the
  `= label` part and the deliverable text is used instead.

Aim for three to five `key` rows per service. Only work the client would notice or chase. A client
buying four services should still be able to read their key dates page in one go.

### `### Not in scope`

Plain bullets. Name the adjacent things clients assume are included, not every conceivable exclusion.
The list is only useful if they read all of it.

### `### What we need from you`

A two column table: what we need, and when. The `when` column takes the same week codes, plus free
text like `Ongoing` or `Every month`.

## The JSON brief

Copy `example-input.json`. Every field is optional except `client`, `start_date`, `document_date`
and `services`. Anything you leave out prints as a bracketed placeholder, and the account manager
page lists it.

Per service you can adjust what the brain file says without editing the brain file:

```json
{
  "id": "performance-marketing",
  "amounts": { "Build and launch the first campaigns": "2 campaigns, 6 ad sets" },
  "drop": ["Test new audiences, placements or bidding"],
  "add_rows": [{ "deliverable": "...", "amount": "...", "type": "key", "timing": "W4" }],
  "add_not_in_scope": ["..."],
  "drop_not_in_scope": ["..."],
  "needs_when": { "A payment method loaded on each ad platform": "W1" },
  "add_needs": [{ "what": "...", "when": "W2" }]
}
```

`amounts`, `drop`, `drop_not_in_scope` and `needs_when` match on the exact text in the brain file,
ignoring case and spacing. A key that matches nothing stops the build and prints the valid keys.

Set `"font": "Arial"` at the top level to build in a font every client already has.

If the same number turns up for every client, it belongs in the brain file, not in `amounts`.

## Page 2

The build always writes an account manager page listing every `[N]` still unresolved and every field
still bracketed. Work through it, rebuild, then delete that page before sending. It is the last
thing in the "Before you send" list on the page itself.

## Changing the document

Wording of the scope goes in `brain/services/`. Layout, colors and section order go in
`build-scope-of-work.py`. Brand values come from `clients/toggle/design-system/TOKENS.md`. Every
line of client-facing copy follows `brain/voice/writing-standards.md`.
