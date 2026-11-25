# QA Verification Report — VERONNE Showroom

## Environment & Scope

- **Browser Engine Tested**: Headless Chromium (Brave Browser via Chrome DevTools Protocol) served over local HTTP (`127.0.0.1:8765`).
- **Pages Tested (7)**: `index.html`, `pages/home2.html`, `pages/about.html`, `pages/products.html`, `pages/brands.html`, `pages/gifting.html`, `pages/contact.html`.
- **Viewports Tested (9)**:
  - Mobile: `320×568`, `390×844`, `430×932`
  - Tablet: `768×1024`, `820×1180`, `1024×768`
  - Desktop: `1280×800`, `1440×900`, `1920×1080`
- **Themes & Directions**: Light & Dark (`#0B0C0E` / `#141619`), LTR & RTL (`dir="rtl"`).

## Automated & Visual Matrix Results (Final Run)

- **Matrix checkpoints**: `63` (7 pages × 9 viewports)
- **Horizontal / Navbar overflows**: `0`
- **Broken images (`naturalWidth === 0`)**: `0`
- **Aspect-ratio distortion issues (>1.85×)**: `0`
- **Console / uncaught JS runtime errors**: `0`

## Functional Journeys Verified

1. **Catalogue Filtering & Category-Aware Controls (`pages/products.html`)**:
   - Watches filter displays `Movement Type` (`Showing 6 of 24 showroom pieces`).
   - Switching to Gold Jewellery replaces movement filter with `Finish & Metal Tone` (`Showing 6 of 24 showroom pieces`).
   - Product detail modal opens with full specifications and `Enquire About This Piece` link (`../pages/contact.html?product=gold-aurelia-chain&category=gold`).
2. **Custom Accessible Dropdowns (`VeronneSelect`)**:
   - Tested actually expanded on desktop (`1440×900`) and mobile (`390×844`) while page was scrolled.
   - Confirmed `15px` option font-size, `44px` option height, viewport collision containment, anchored positioning, and auto-closing on modal open / category refresh.
3. **Mobile Drawer & RTL Persistence**:
   - Verified `#mobileDrawer` opens at `left: 0` (`width: 343px`) in both LTR and RTL at `390×844`.
   - Verified Dark Mode and RTL toggles inside the drawer persist across page navigation (`index.html` and `pages/home2.html`).
4. **Gifting Discovery (`pages/gifting.html`)**:
   - Occasion filter (`Weddings`) updates live results (`Showing 9 gift suggestions`).
5. **Contact & Visit Request Builder (`pages/contact.html`)**:
   - Preselection from `?product=watch-fluted-bicolour` populates `category=watches` and `product=watch-fluted-bicolour`.
   - Past dates (`2020-01-01`) are rejected; valid future dates render the local Prepared Request Summary for review, edit, clipboard copy, and `.txt` download.

## Defects Identified & Fixed During QA

1. **Mobile Form Grid Expansion**: Preselected long product names in `.v-select` expanded CSS grid columns (`429px` on `390px` viewport); resolved by adding `min-width: 0` across `.contact-layout > *`, `.form-grid > *`, `.form-field`, `.v-select`, `.v-select__trigger`, and `.v-select__value`.
2. **Open Dropdown Layering Over Modal / Tab Change**: Closed active custom dropdowns automatically on `syncOptions()`, `openProductModal()`, and outside clicks.
3. **Scroll-Reveal & Carousel Lazy Loading**: Added viewport-safe reveal initialization and eager loading on the 6 Featured Timepieces carousel slides so no section or slide renders blank.
4. **Mobile Hero Portrait Framing & Grid Balance**: Added responsive `<picture>` portrait hero sources for `<= 680px` and balanced the catalogue to 24 pieces (6 per category) to eliminate orphaned grid cards on desktop and tablet.

## Remaining Production Limitations

- **Frontend-Only Enquiry Flow**: No backend API or email gateway is connected; the Contact form validates and prepares a local request summary for review, copy, or `.txt` download.
- **Venue & Stock Details**: Representative showroom photography, indicative prices, and editorial watchmaker profiles are illustrative until actual salon address, hours, and live inventory are configured in `assets/js/site-config.js` and `assets/js/products-data.js`.
- **Safari/WebKit**: Verified in Chromium (Brave headless CDP); physical Safari/iOS WebKit hardware testing was not run in this environment.
