# Client logos

43 clients have a logo here. **The carousel on both sales pages shows only these
43.** A client with no logo is skipped rather than rendered as a bare text chip
in a row of marks, so a partial set never looks half-finished.

The counters above the rows report `CLIENT_COUNT` in `sales-data.js`, currently
62, which is the whole client book including accounts with no usable mark. That
number is deliberately independent of both `BOOK.length` and the number of logos
here. Raise it as the book grows.

Every file here was trimmed to its ink bounds and capped at 160px tall, because
the chips render at 26px and a logo with baked-in padding renders tiny inside
its box.

## Adding a real logo

1. Drop the file here as `<slug>.svg` (preferred) or `<slug>.png` at 2x.
   Use the client's own mark, transparent background, trimmed of whitespace.
2. Open `clients/toggle/sales-page/sales-data.js`, find the `BOOK` array, and add
   one field to that client's entry:

   ```js
   { n:"Petsmore", v:"Commerce", m:"Malaysia", logo:"../../../assets/logos/clients/petsmore.svg" },
   ```

3. That is the whole change. The chip and the modal switch to the image, the
   `alt` text stays the client name, and nothing else needs touching.

## Before you add one

Get permission. A client agreeing to work with us is not the same as a client
agreeing to appear on our website, and a logo used without a sign-off is the
kind of thing that turns into an awkward email. Note the permission in that
client's `CLIENT.md` when you get it.

Sizing: chips cap the logo at 26px tall and 172px wide. A mark with a long
wordmark will read small, so a stacked or icon-only lockup usually works better
than a wide horizontal one.
