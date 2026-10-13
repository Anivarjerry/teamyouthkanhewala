# Website UX, Content and Asset Review

**Reviewed:** `website/index.html`, `website/css/style.css`, `website/js/app.js`, and the existing PRD/speech notes.  
**Status:** This records the pre-redesign review. The website was subsequently redesigned; the user confirmed the team representative’s spelling as **Sapinder Singh**. This file is retained as review history, not as a description of the current page.

## What currently exists

- The page is a 420-line Hindi landing page for a Kanhewala sarpanch campaign, with a comparison slider, claims/about sections, manifesto, Instagram link, pledge form and WhatsApp sharing.
- The local folder contains no image, video, WebP, PNG, JPEG or SVG assets. The comparison areas currently render styled text/background blocks, not the real Instagram/reel photographs requested in the PRD.
- The page is UTF-8 valid and includes `<meta charset="UTF-8">`; Hindi is not corrupted in the file itself. The earlier garbled appearance came from terminal output encoding.
- Before the redesign, local documents named **श्रीमती संदीप कौर** and **सरदार सतिंदर सिंह**. The user later confirmed the team representative’s spelling as **Sapinder Singh**; the live website and project references were updated to that name.

## User-facing problems to fix

1. **The framing can feel combative.** Phrases such as “15–20 साल के अंधेरे”, “कुर्सी पर बैठने वालों”, “कागजी विकास” and the comparison table assert failure by unnamed opponents. This can read as an attack rather than a calm service record. Replace it with a respectful, evidence-led structure: what was done, when, by whom, who funded it, and what remains planned.
2. **The strongest proof is not prominent.** Real before/after photos, dates, captions, location and source/consent notes should lead the page. Until genuine assets are supplied, avoid fake image blocks or implication that a screenshot/photo exists.
3. **The pledge flow overstates what happens.** `app.js` displays “आपका समर्थन संकल्प दर्ज हुआ”, but does not persist or transmit the pledge to a database. It then inserts the visitor’s name into a political endorsement and opens WhatsApp. The phone field is collected but unused. Add clear consent/preview and privacy wording, or remove the phone field and “recorded” claim if no storage exists.
4. **Mobile validation is incomplete.** HTML allows ten characters, while JS only checks `length < 10`; it does not filter digits or reject 11+ digits. Make validation exactly ten digits and avoid sharing a person’s name without an explicit action.
5. **The web page has no campaign contact/official verification details visible in the reviewed markup.** Add a clear contact route and mark which statements are documented, estimated, proposed, or personal claims.
6. **Location wording needs one consistent official form.** The page/notes use “कान्हेवाला”, “खरचक्क”, “26 JRK”, “गोलूवाला”, and “जिला हनुमानगढ़ / श्रीगंगानगर” inconsistently. A Rajasthan government source lists Kanhewala under Pilibanga/Hanumangarh; another government gazette concerns the separate Goluwala Niwadan/Singhan municipal area. Use “ग्राम पंचायत कान्हेवाला-26 जेआरके, पंचायत समिति पीलीबंगा, जिला हनुमानगढ़, राजस्थान” only after confirming the intended village/constituency boundary with the client. Keep Goluwala as a postal/nearby reference only if factually applicable.
7. **Name/role verification is unresolved.** The existing campaign PRD says candidate Sandeep Kaur and team lead Satinder Singh; the user now supplied “Pushpendra Singh”. Confirm exact spelling, honorific, candidate/team role, and whether the site is still for this same campaign before any copy or visual change.

## Instagram and image status

The existing link points to `@teamyouthforkanhewala`. I tried opening the public profile and searching for the handle, but Instagram throttled the page and search did not return a reliable matching public result. No reel/photo screenshot was available to attach from this review. A supplied profile/reel URL or downloaded, approved image files are needed before selecting or embedding campaign imagery. Do not present unrelated search images as campaign evidence.

## Suggested calmer page order

1. Simple title, exact location and a short service-focused introduction.
2. Three or four verified work cards with real photos and date/location/source captions.
3. “What residents have asked for” and “What the team proposes” clearly separated from completed work.
4. A small timeline and transparent funding/volunteer credits where records exist.
5. Instagram link/gallery only with approved images and clear captions.
6. Contact/share section; optional pledge with explicit consent, no false “saved” status, and a privacy note.

## Sources checked for administrative naming

- Rajasthan Social Audit calendar lists **Pilibanga – Kanhewala**: [Rajasthan Social Audit PDF](https://socialaudit.rajasthan.gov.in/frontend/news/calendar%20january%202024%202nd%20Term%20-13%20Jan%20to%2017%20Jan%202024.pdf).
- Rajasthan government notification describes the municipal formation of **Goluwala** including Goluwala Niwadan and Goluwala Singhan: [Rajasthan government notification](https://lsg.urban.rajasthan.gov.in/content/dam/raj/udh/lsgs/lsg-jaipur/Order/order-2023-/June/2215.pdf).

These sources support distinguishing Kanhewala from Goluwala; they do not verify the campaign claims, candidate names, or exact local usage of “खरचक्क”.

