# QA Verification Report — VERONNE Showroom

## Environment & Scope

- **Browser Engine Tested**: Headless Chromium (Brave Browser via Chrome DevTools Protocol) served over local HTTP (`127.0.0.1:8770`).
- **Safari / WebKit Note**: Attempted `safaridriver` automation check; Safari WebDriver returned `"You must enable 'Allow remote automation' in the Developer section of Safari Settings to control Safari via WebDriver."` Consequently, automated WebKit/Safari execution was unavailable in this environment and browser verification reflects Chromium only.
- **Pages Tested (7)**: `index.html`, `pages/home2.html`, `pages/about.html`, `pages/products.html`, `pages/brands.html`, `pages/gifting.html`, `pages/contact.html`.
- **Viewports Tested (8 in final pass; 1920px also verified in initial pass)**:
  - Mobile: `320×568`, `390×844`, `430×932`
  - Tablet: `768×1024`, `820×1180`, `1024×768`
  - Desktop: `1280×800`, `1440×900` (plus `1920×1080` in initial matrix)
- **Themes & Directions**: Light & Dark (`#0B0C0E` / `#141619`), LTR & RTL (`dir="rtl"`).

## Automated & Visual Matrix Results (Final Polishing Pass)

- **Matrix checkpoints**: `56` (7 pages × 8 viewports)
- **Horizontal / Navbar overflows**: `0`
- **Broken images (`naturalWidth === 0`)**: `0`
- **Console / uncaught JS runtime errors**: `0`
- **Home 2 Curated Gift Selections Alignment**: `titleTopSpread: 0px`, `footerTopSpread: 0px` across all 4 cards.
- **Dropdown Regression Suite (20 expanded checks across Desktop `1440×900`, Tablet `768×1024`, Mobile `320×568` and `390×844`)**:
  - `20 / 20` passed (`inViewport: true`, `noHeaderOverlap: true`, `anchoredClose: true`, `optionFontPx: 15`, `optionHeight: 44`, `syncedValue: true`).

## Final Polishing Corrections Verified

1. **Icon-Only Theme Control**: Removed `"Dark"` / `"Light"` text labels from `.js-theme-toggle` across all 7 desktop headers and mobile drawers while preserving `aria-label`, `aria-pressed`, and `localStorage` persistence.
2. **Simplified Home Dropdown & Navigation**: Renamed dropdown, drawer, and footer Home links cleanly to `Home 1` and `Home 2`, removing subtitle text and internal labels.
3. **Home 1 — The Jewellery Edit**: Replaced `justify-content: space-between` with consistent `1.25rem` spacing and adjusted the lead frame to `1:1` alongside `204px`-min-height stacked row cards for balanced columns.
4. **Home 1 — Closing Showroom CTA**: Removed the secondary `"View Editorial Home 2"` button, leaving the single primary **Plan a Showroom Visit** CTA.
5. **Home 2 — Curated Gift Selections & Shared Cards**: Added consistent 2-line minimum block heights on `.product-card__title`, `.product-card__material`, and 4-column `.product-card__meta` so card rows, divider lines, prices, and buttons align cleanly.
6. **Home 2 — Choosing a Timepiece That Fits Your Rhythm**: Replaced the awkward bullet list with three stacked specification blocks (**Case Size**, **Movement**, **Strap & Bracelet**).
7. **Footer Cleanup**: Removed `.footer-wordmark-band` and `.footer-wordmark-giant` across all 7 pages and `assets/css/style.css`, keeping the multi-column footer concise.
8. **Dropdown Viewport Bounds & Tablet Grids**: Clamped `VeronneSelect.positionPanel` height strictly to available viewport space below the sticky header (`<= 320px` and never forced above available space), and preserved 2-col diptych and 3-col occasion grid balance on `768px`–`1024px` tablets.

## Remaining Production Limitations

- **Frontend-Only Enquiry Flow**: No backend API or email gateway is connected; the Contact form validates and prepares a local request summary for review, copy, or `.txt` download.
- **Venue & Stock Details**: Representative showroom photography, indicative prices, and editorial watchmaker profiles are illustrative until actual salon address, hours, and live inventory are configured in `assets/js/site-config.js` and `assets/js/products-data.js`.
- **Safari/WebKit**: Not executed locally because Safari Remote Automation (`Allow remote automation`) is disabled in Safari Settings.
