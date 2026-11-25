# VERONNE — Contemporary Watch & Fine Jewellery Showroom

A static, multi-page Watch & Fine Jewellery Showroom website built with semantic HTML5, modular CSS3, and vanilla JavaScript.

## Pages

- `index.html` — **Home 1 (Showroom Storefront)**: Photographic hero slider, New Collections, Explore by Category, Featured Timepieces carousel, The Jewellery Edit, Craftsmanship in Detail, Watchmaker Discovery, Meaningful Gifts, Showroom Experience, and Closing Visit Invitation.
- `pages/home2.html` — **Home 2 (Editorial Experience — The Art of Time & Adornment)**: Overlapping split hero, Watch Styles for Every Hour, Gold & Diamond Diptych, Layering & Styling notes, Atelier Watchmaking feature, Curated Gift Selections, and Choosing a Timepiece guide.
- `pages/about.html` — **About**: Showroom philosophy, collection approach, materials & finishes, and visit preparation.
- `pages/products.html` — **Products Catalogue**: 24 illustrative showroom pieces across Gold Jewellery (6), Diamond Jewellery (6), Silver Jewellery (6), and Watches (6) with category tabs, dynamic category-aware specification filters, search, price/name sorting, empty state, and Product Detail dialog.
- `pages/brands.html` — **Brands**: Editorial watchmaker discovery dossiers (Rolex, IWC Schaffhausen, TAG Heuer, Tissot, Omega, Longines, Tudor, Grand Seiko) with official maison links and pre-filled enquiry shortcuts.
- `pages/gifting.html` — **Gifting**: Occasion, category, and indicative-budget gift discovery connected directly to the shared catalogue.
- `pages/contact.html` — **Contact & Showroom Visit**: Client-side validated visit request builder with past-date protection, URL preselection, live preview summary, edit mode, clipboard copy, `.txt` download, and showroom FAQ.

## Architecture & Features

- **GitHub Pages Compatible**: Relative paths anchored via `<meta name="site-root">` (`"."` on `index.html`, `".."` on `pages/*.html`) and `veronneResolvePath()` in `assets/js/site-config.js`.
- **Custom Accessible Dropdowns (`VeronneSelect`)**: Viewport-aware fixed listbox panels with collision detection (auto-flipping above/below), 15px readable option typography, `44px` minimum row height, keyboard navigation (`ArrowUp`/`ArrowDown`/`Home`/`End`/`Enter`/`Space`/`Escape`), and RTL alignment.
- **Dark Mode & RTL Support**: True neutral near-black dark mode (`#0B0C0E` / `#141619` with `#C8B38D` accent), unmirrored photography and brand mark in RTL, physical-left drawer preserved in both LTR and RTL, and `localStorage` persistence across all pages.

## Local Preview

Run any static HTTP server from the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.
