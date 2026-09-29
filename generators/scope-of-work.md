# /scope-of-work

Draft the client-facing scope of work we send at the point of close. Reads the proposal and the
quotation we already sent, turns their timeline into real dates, and produces a Word document plus
a PDF. Both sides sign it.

It exists to stop two things: Toggle forgetting a committed deliverable, and a client claiming we
promised more than we did.

## READS
- brain/services/<service>.md               # one per service on the quotation; the scope wording lives here
- brain/voice/writing-standards.md          # binding on every line of client-facing copy
- clients/<slug>/CLIENT.md                  # contacts, geo, currency, account lead, start date
- templates/scope-of-work/README.md         # the JSON shape and the brain table format
- templates/scope-of-work/example-input.json
- the proposal the user names                # services, timeline, promises made
- the quotation the user names               # the authoritative service list and quote number

## WRITES
- clients/<slug>/01-strategy/<slug>-scope-of-work-YYYY-MM-DD.json   # the brief the build script reads
- clients/<slug>/01-strategy/<slug>-scope-of-work-YYYY-MM-DD.docx   # what the client signs
- clients/<slug>/01-strategy/<slug>-scope-of-work-YYYY-MM-DD.pdf    # what we usually send

## INPUTS
- $slug: client slug under clients/ (ask if omitted; list the folders to pick from)
- $proposal: path to the proposal (pdf, pptx, html or md)
- $quotation: path to the quotation, or the quote number if the file is not in the repo
- $start: engagement start date, YYYY-MM-DD

## STEPS

**1. Gather.** Read the proposal and the quotation. Read `clients/$slug/CLIENT.md`. Ask only for
what you cannot find, and ask for it all at once rather than one question at a time.

**2. Take the service list from the quotation, not the proposal.** The quotation is what the client
is paying for. A proposal often carries an idea that never got quoted. Map each quoted line to a
file in `brain/services/`. If a quoted line has no brain file, stop and say so: the service needs a
brain file before it can go in a scope document.

**3. Pull the real numbers.** Every `[N]` in a brain file is a number Toggle has not standardized.
Find each one in the proposal or the quotation. Where the answer is genuinely there, put it in
`amounts`. Where it is not, leave the `[N]` alone and let it land on the account manager page.
Never invent a volume the client has not been told about, and never invent one Toggle would then
have to honor.

**4. Date the work.** Read the proposal's timeline and convert it to week codes relative to $start.
"Week 1 to 2" on a milestone becomes `W2`, the week it finishes. Where the proposal names no timing
for a deliverable, keep the typical timing from the brain file and note the assumption in
`am_notes`. Keep three to five `key` rows per service. If the proposal committed to a date that the
brain file's typical timing cannot meet, say so rather than quietly writing the harder date.

**5. Write the JSON.** Copy the shape in `templates/scope-of-work/example-input.json`. Include only
the services on the quotation. Fill every contact, term and review date you have; leave the rest as
bracketed placeholders so they surface on the account manager page.

**6. Build.**
```bash
uv run --with python-docx templates/scope-of-work/build-scope-of-work.py \
  clients/<slug>/01-strategy/<slug>-scope-of-work-YYYY-MM-DD.json --pdf
```

**7. Read the output before you hand it over.** Check the key dates page against the proposal's
timeline, and the service list against the quotation line by line. Run the pre-flight checklist in
`brain/voice/writing-standards.md` over anything you wrote yourself.

**8. Report what is unresolved.** Tell the user every `[N]` and every bracketed field still open,
and remind them to delete page 2 before sending.

## RULES

- **Never put a price in this document.** It names the quotation number and date and says the fees
  live there. One source of truth for money.
- **Never write back into `brain/`.** If a number is the same for every client, tell the user it
  belongs in the brain service file and let them decide. Do not edit it yourself as a side effect
  of drafting a client document.
- **Do not add a deliverable the quotation does not cover**, however obviously useful it looks.
  Anything extra goes to the user as a suggestion, not into the document.
- **Do not soften the "Not in scope" list.** It is the half of the document that protects Toggle.
