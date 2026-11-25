/**
 * VERONNE — Unified Illustrative Watch & Jewellery Catalogue (24 Pieces)
 * Balanced 6 pieces per category (Gold, Diamonds, Silver, Watches) for clean 2/3/4-column grids.
 * Single source of truth used across Home 1, Home 2, Products, Gifting, and Contact.
 * Indicative specs and pricing only; no unverified purity, grade, or depth ratings fabricated.
 */
(function (global) {
  'use strict';

  var PRODUCTS_DATA = [
    /* ===================== GOLD JEWELLERY (6) ===================== */
    {
      id: 'gold-aurelia-chain',
      name: 'Aurelia Figaro Link Necklace',
      category: 'gold',
      categoryLabel: 'Gold Jewellery',
      subcategory: 'Necklaces',
      materials: 'Yellow Gold Tone · Polished Link Craft',
      indicativePrice: 148000,
      image: 'assets/images/gold/gold-chain-necklace.jpg',
      imageAlt: 'Polished yellow gold-tone link necklace arranged on studio white surface',
      shortDescription: 'Fluid interlocking links with warm specular polish designed for solo wear or layered necklines.',
      description: 'An architectural link necklace crafted in warm yellow gold tones with balanced link articulation so the drape remains supple along the collarbone.',
      specs: {
        Metal: 'Yellow Gold Finish',
        Finish: 'High-Polish Mirror',
        'Jewellery Type': 'Chain Necklace',
        'Clasp Style': 'Integrated Box & Safety Catch',
        'Length Options': '42 cm / 45 cm (by enquiry)'
      },
      occasions: ['Anniversaries', 'Birthdays', 'Weddings'],
      featured: true
    },
    {
      id: 'gold-solis-bands',
      name: 'Solis Interlocked Band Pair',
      category: 'gold',
      categoryLabel: 'Gold Jewellery',
      subcategory: 'Rings',
      materials: 'Yellow Gold Tone · Bevelled Edge Profile',
      indicativePrice: 112000,
      image: 'assets/images/gold/gold-band-duo.jpg',
      imageAlt: 'Two yellow gold-tone wedding bands resting together on textured linen',
      shortDescription: 'Clean flat-court wedding and milestone bands with crisp chamfered borders.',
      description: 'Designed for comfortable daily wear, the Solis pair balances subtle interior curvature with architectural outer bevels that catch directional light.',
      specs: {
        Metal: 'Yellow Gold Finish',
        Finish: 'Mirror Polish with Chamfered Rim',
        'Jewellery Type': 'Classic Bands',
        'Band Width': '3.5 mm / 4.5 mm',
        'Available Sizes': 'EU 48–64 (confirmed in salon)'
      },
      occasions: ['Weddings', 'Engagements', 'Anniversaries'],
      featured: true
    },
    {
      id: 'gold-verona-crest',
      name: 'Verona Emerald-Cut Accent Ring',
      category: 'gold',
      categoryLabel: 'Gold Jewellery',
      subcategory: 'Rings',
      materials: 'Yellow Gold Tone · Clear Faceted Centre Stone',
      indicativePrice: 186000,
      image: 'assets/images/gold/gold-sculpted-ring.jpg',
      imageAlt: 'Yellow gold-tone ring set with a step-cut rectangular centre stone and accented shoulders',
      shortDescription: 'Step-cut centre silhouette elevated in a four-claw gallery over slender pavé shoulders.',
      description: 'Pairs warm yellow-tone gold with crisp linear faceting and delicate shoulder accents for an understated engagement or celebratory silhouette.',
      specs: {
        Metal: 'Yellow Gold Finish',
        Finish: 'High-Polish Shank',
        'Jewellery Type': 'Statement Ring',
        'Setting Style': 'Four-Prong Gallery with Shoulder Accents',
        'Available Sizes': 'EU 48–60'
      },
      occasions: ['Engagements', 'Anniversaries', 'Personal Celebrations'],
      featured: false
    },
    {
      id: 'gold-lyra-hoops',
      name: 'Lyra Two-Tone Ribbon Hoops',
      category: 'gold',
      categoryLabel: 'Gold Jewellery',
      subcategory: 'Earrings',
      materials: 'Yellow & White Gold Tones · Hinged Post',
      indicativePrice: 74000,
      image: 'assets/images/gold/extra-photo-1615655114865-4cc1bda5901e.jpg',
      imageAlt: 'Pair of intertwined yellow and white gold-tone hoop earrings on neutral surface',
      shortDescription: 'Interlocking dual-tone arcs crafted to bridge yellow-gold jewellery and steel timepieces.',
      description: 'Sculpted dual-tone ribbons wrap cleanly around the earlobe with secure snap-post closures—effortless to pair across mixed-metal wardrobes.',
      specs: {
        Metal: 'Yellow & White Gold Finish',
        Finish: 'High-Polish Dual Tone',
        'Jewellery Type': 'Hoop Earrings',
        'Closure Type': 'Hinged Snap Post',
        'Diameter': '18 mm (approx.)'
      },
      occasions: ['Birthdays', 'Professional Milestones', 'Personal Celebrations'],
      featured: true
    },
    {
      id: 'gold-heritage-drops',
      name: 'Kala Filigree Drop Earrings',
      category: 'gold',
      categoryLabel: 'Gold Jewellery',
      subcategory: 'Earrings',
      materials: 'Yellow Gold Tone · Granulated Filigree',
      indicativePrice: 134000,
      image: 'assets/images/gold/extra-photo-1626784215013-13322cb0e471.jpg',
      imageAlt: 'Pair of intricate granulated gold drop earrings presented on dark slate',
      shortDescription: 'Fine filigree dome work and articulated beaded drops tailored for ceremonial occasions.',
      description: 'Inspired by heritage metalcraft, the Kala drops feature delicate pierced domes and balanced movement without excessive weight.',
      specs: {
        Metal: 'Yellow Gold Finish',
        Finish: 'Textured Matte & Polished Granulation',
        'Jewellery Type': 'Ceremonial Drop Earrings',
        'Closure Type': 'Post & Screw Back',
        'Occasion Suitability': 'Festive & Bridal'
      },
      occasions: ['Weddings', 'Anniversaries', 'Personal Celebrations'],
      featured: false
    },
    {
      id: 'gold-surya-rosette',
      name: 'Surya Cluster Stud Earrings',
      category: 'gold',
      categoryLabel: 'Gold Jewellery',
      subcategory: 'Stud Earrings',
      materials: 'Yellow Gold Tone · Multi-Stone Rosette',
      indicativePrice: 92000,
      image: 'assets/images/gold/extra-photo-1626784215021-2e39ccf971cd.jpg',
      imageAlt: 'Pair of yellow gold rosette cluster stud earrings on dark textured background',
      shortDescription: 'Floral-inspired gold rosette studs framed by bright bezel-set accent stones.',
      description: 'Classic cluster proportions reinterpreted with low-profile settings that sit flush and catch ambient evening light.',
      specs: {
        Metal: 'Yellow Gold Finish',
        Finish: 'Polished Bezel & Bead Detail',
        'Jewellery Type': 'Stud Earrings',
        'Setting Style': 'Cluster Halo',
        'Closure Type': 'Butterfly / Screw Post'
      },
      occasions: ['Birthdays', 'Weddings', 'Anniversaries'],
      featured: false
    },

    /* ===================== DIAMOND JEWELLERY (6) ===================== */
    {
      id: 'diamond-lumiere-solitaire',
      name: 'Lumière Halo Solitaire Ring',
      category: 'diamonds',
      categoryLabel: 'Diamond Jewellery',
      subcategory: 'Solitaire Rings',
      materials: 'White Gold Tone · Brilliant-Cut Stones',
      indicativePrice: 295000,
      image: 'assets/images/diamonds/diamond-solitaire-box.jpg',
      imageAlt: 'White gold-tone solitaire diamond ring with halo and pavé band on black presentation box',
      shortDescription: 'Round centre stone encircled by a tight micro-pavé halo and tapered shoulder stones.',
      description: 'Engineered with an open under-gallery to admit light from every angle while maintaining a composed, wearable profile on the hand.',
      specs: {
        Metal: 'White Gold / Platinum Tone',
        Finish: 'Mirror Polish',
        'Jewellery Type': 'Solitaire Halo Ring',
        'Stone Type': 'Faceted Clear Diamonds (illustrative)',
        'Setting Style': 'Four-Prong Centre with Micro-Pavé Halo',
        'Available Sizes': 'EU 48–60'
      },
      occasions: ['Engagements', 'Anniversaries', 'Weddings'],
      featured: true
    },
    {
      id: 'diamond-celeste-rose',
      name: 'Céleste Rose-Tone Cushion Ring',
      category: 'diamonds',
      categoryLabel: 'Diamond Jewellery',
      subcategory: 'Halo Rings',
      materials: 'Rose Gold Tone · Rectangular Halo Setting',
      indicativePrice: 264000,
      image: 'assets/images/diamonds/diamond-halo-pink.jpg',
      imageAlt: 'Rose gold-tone ring featuring an emerald-cut pink centre gemstone and diamond halo',
      shortDescription: 'Blush-hued rectangular centre stone framed by crisp white diamond-accented gallery edges.',
      description: 'Combines soft rose metal warmth with geometric precision—suited to collectors seeking a distinctive silhouette beyond traditional solitaires.',
      specs: {
        Metal: 'Rose Gold Finish',
        Finish: 'High-Polish Slender Shank',
        'Jewellery Type': 'Halo Gemstone Ring',
        'Stone Type': 'Coloured Centre Stone & Accent Diamonds',
        'Setting Style': 'Corner-Prong Frame with Pavé Halo',
        'Available Sizes': 'EU 49–59'
      },
      occasions: ['Engagements', 'Birthdays', 'Personal Celebrations'],
      featured: true
    },
    {
      id: 'diamond-triad-stack',
      name: 'Triad Pavé Stackable Bands',
      category: 'diamonds',
      categoryLabel: 'Diamond Jewellery',
      subcategory: 'Band Rings',
      materials: 'Yellow Gold Tone · Pavé Accent Stones',
      indicativePrice: 178000,
      image: 'assets/images/diamonds/diamond-trio-rings.jpg',
      imageAlt: 'Three yellow gold-tone pavé diamond rings stacked on soft ivory textile',
      shortDescription: 'Three sculptural gold bands set with pavé clusters, designed to wear stacked or individually.',
      description: 'Balanced proportions let each band sit flush beside companion rings or frame a central solitaire without shifting.',
      specs: {
        Metal: 'Yellow Gold Finish',
        Finish: 'Polished & Bead-Set Pavé',
        'Jewellery Type': 'Stacking Ring Set',
        'Stone Type': 'Small Brilliant-Cut Diamonds',
        'Setting Style': 'Flush Channel & Pavé',
        'Available Sizes': 'EU 48–60'
      },
      occasions: ['Anniversaries', 'Personal Celebrations', 'Birthdays'],
      featured: false
    },
    {
      id: 'diamond-velvet-pave',
      name: 'Marquise Cluster Cocktail Ring',
      category: 'diamonds',
      categoryLabel: 'Diamond Jewellery',
      subcategory: 'Statement Rings',
      materials: 'Warm Gold Tone · Sculpted Cluster Mount',
      indicativePrice: 218000,
      image: 'assets/images/diamonds/diamond-pave-ring.jpg',
      imageAlt: 'Gold-tone diamond cluster cocktail ring resting on woven cream cloth',
      shortDescription: 'Articulated dome cluster mounted over a slender contoured gold band for evening wear.',
      description: 'Pairs organic floral geometry with generous facet spacing so each stone catches directional light independently.',
      specs: {
        Metal: 'Yellow Gold Finish',
        Finish: 'Satin & High-Polish Gallery',
        'Jewellery Type': 'Cocktail Ring',
        'Stone Type': 'Multi-Cut Clear Stones',
        'Setting Style': 'Raised Prong Cluster',
        'Available Sizes': 'EU 50–60'
      },
      occasions: ['Anniversaries', 'Weddings', 'Personal Celebrations'],
      featured: false
    },
    {
      id: 'diamond-serene-pear',
      name: 'Serene Pear-Cut Halo Ring',
      category: 'diamonds',
      categoryLabel: 'Diamond Jewellery',
      subcategory: 'Halo Rings',
      materials: 'White Gold Tone · Pear-Shaped Centre',
      indicativePrice: 315000,
      image: 'assets/images/diamonds/diamond-stud-ring-dark.jpg',
      imageAlt: 'White gold-tone pear-cut diamond halo ring on dark charcoal pedestal',
      shortDescription: 'Teardrop silhouette encircled by scalloped halo accents and a twin-row pavé band.',
      description: 'The elongated pear profile lengthens the line of the finger while twin pavé rows lend architectural poise from every viewing angle.',
      specs: {
        Metal: 'White Gold / Platinum Tone',
        Finish: 'Mirror Polish',
        'Jewellery Type': 'Pear Halo Ring',
        'Stone Type': 'Pear-Cut Centre & Round Accents',
        'Setting Style': 'V-Tip & Prong Halo',
        'Available Sizes': 'EU 48–58'
      },
      occasions: ['Engagements', 'Anniversaries'],
      featured: true
    },
    {
      id: 'diamond-serpent-cuff',
      name: 'Vespera Coiled Pavé Bracelet',
      category: 'diamonds',
      categoryLabel: 'Diamond Jewellery',
      subcategory: 'Bracelets',
      materials: 'White Precious Metal Tone · Articulated Links',
      indicativePrice: 420000,
      image: 'assets/images/diamonds/diamond-silver-bracelet.jpg',
      imageAlt: 'Coiled white gold-tone diamond-set articulated bracelet on black reflective glass',
      shortDescription: 'Flexible articulated scales set with graduated pavé stones for fluid wrist contouring.',
      description: 'Crafted in interlocking geometric segments that wrap comfortably around the wrist, combining sculpted metalwork with continuous brilliance.',
      specs: {
        Metal: 'White Gold / Rhodium Finish',
        Finish: 'Mirror-Polished Scales',
        'Jewellery Type': 'Articulated Cuff Bracelet',
        'Stone Type': 'Graduated Pavé Diamonds',
        'Setting Style': 'Flush Micro-Pavé',
        'Sizing': 'Flexible coil (15.5–17.5 cm wrist)'
      },
      occasions: ['Anniversaries', 'Weddings', 'Personal Celebrations'],
      featured: true
    },

    /* ===================== SILVER JEWELLERY (6) ===================== */
    {
      id: 'silver-mariner-chain',
      name: 'Nordic Heavy Curb Bracelet',
      category: 'silver',
      categoryLabel: 'Silver Jewellery',
      subcategory: 'Bracelets',
      materials: 'Sterling Silver · Rhodium-Toned Polish',
      indicativePrice: 28000,
      image: 'assets/images/silver/silver-chain-bracelet.jpg',
      imageAlt: 'Polished sterling silver link chain bracelet on clean white surface',
      shortDescription: 'Substantial oval-curb sterling links engineered for standalone wear or watch pairing.',
      description: 'Balanced link weight and rounded inner edges ensure smooth contact alongside stainless-steel watch bracelets without harsh abrasion.',
      specs: {
        Metal: 'Sterling Silver',
        Finish: 'Bright Mirror Polish',
        'Jewellery Type': 'Chain Bracelet',
        'Link Width': '6.5 mm',
        'Length Options': '18 cm / 20 cm'
      },
      occasions: ['Birthdays', 'Professional Milestones', 'Personal Celebrations'],
      featured: true
    },
    {
      id: 'silver-anneau-pendant',
      name: 'Anneau Interlocking Pendant',
      category: 'silver',
      categoryLabel: 'Silver Jewellery',
      subcategory: 'Pendants',
      materials: 'Sterling Silver · Fine Box Chain',
      indicativePrice: 24500,
      image: 'assets/images/silver/silver-ring-pendant.jpg',
      imageAlt: 'Minimalist sterling silver interlocking ring pendant suspended on fine chain',
      shortDescription: 'Twin interlocking silver circles on a slender chain—understated geometry for daily wear.',
      description: 'A quiet architectural pendant designed to sit cleanly over knitwear or open collars without overpowering tailored silhouettes.',
      specs: {
        Metal: 'Sterling Silver',
        Finish: 'Mirror Polish',
        'Jewellery Type': 'Pendant Necklace',
        'Chain Length': '45 cm',
        'Clasp Style': 'Spring Ring'
      },
      occasions: ['Birthdays', 'Personal Celebrations', 'Anniversaries'],
      featured: false
    },
    {
      id: 'silver-minimal-bands',
      name: 'Minimalist Twin Silver Rings',
      category: 'silver',
      categoryLabel: 'Silver Jewellery',
      subcategory: 'Minimalist Jewellery',
      materials: 'Sterling Silver · Clean Rounded Profile',
      indicativePrice: 19000,
      image: 'assets/images/silver/silver-minimal-rings.jpg',
      imageAlt: 'Pair of clean minimalist sterling silver rings on dark botanical surface',
      shortDescription: 'Slim, unadorned sterling silver hoops crafted for effortless stacking across fingers.',
      description: 'Defined by pure form and soft comfort-fit interiors, ideal as everyday silver essentials or refined couple bands.',
      specs: {
        Metal: 'Sterling Silver',
        Finish: 'High-Polish',
        'Jewellery Type': 'Minimalist Ring Pair',
        'Band Width': '2.4 mm',
        'Available Sizes': 'EU 48–62'
      },
      occasions: ['Personal Celebrations', 'Birthdays'],
      featured: false
    },
    {
      id: 'silver-bypass-band',
      name: 'Liaison Pavé Silver Band',
      category: 'silver',
      categoryLabel: 'Silver Jewellery',
      subcategory: 'Rings',
      materials: 'Sterling Silver · Pavé Clear Accents',
      indicativePrice: 36000,
      image: 'assets/images/silver/silver-solitaire-band.jpg',
      imageAlt: 'Sterling silver crossover ring set with clear pavé stones on light backdrop',
      shortDescription: 'Sculpted crossover ribbons accented with twin rows of channel-set clear stones.',
      description: 'Modern crossover geometry brings quiet shimmer to a contemporary sterling-silver ring suitable for day-to-evening dressing.',
      specs: {
        Metal: 'Sterling Silver',
        Finish: 'Bright Polish',
        'Jewellery Type': 'Accent Ring',
        'Stone Type': 'Clear Faceted Accents',
        'Available Sizes': 'EU 50–60'
      },
      occasions: ['Birthdays', 'Anniversaries', 'Personal Celebrations'],
      featured: false
    },
    {
      id: 'silver-architect-duo',
      name: 'Vektor Flat-Edge Silver Rings',
      category: 'silver',
      categoryLabel: 'Silver Jewellery',
      subcategory: 'Rings',
      materials: 'Brushed Sterling Silver · Contrast Groove',
      indicativePrice: 22500,
      image: 'assets/images/silver/silver-duo-rings.jpg',
      imageAlt: 'Two brushed sterling silver flat-profile rings on clean white surface',
      shortDescription: 'Crisp cylindrical profiles featuring fine recessed grooves and subdued satin lustre.',
      description: 'Inspired by machined watch-case flanks, the Vektor bands pair matte radial brushing with polished inner sleeves.',
      specs: {
        Metal: 'Sterling Silver',
        Finish: 'Satin Brushed',
        'Jewellery Type': 'Architectural Rings',
        'Band Width': '5.0 mm',
        'Available Sizes': 'EU 52–64'
      },
      occasions: ['Professional Milestones', 'Birthdays', 'Personal Celebrations'],
      featured: true
    },
    {
      id: 'silver-open-pendant',
      name: 'Cœur Pavé Silver Pendant',
      category: 'silver',
      categoryLabel: 'Silver Jewellery',
      subcategory: 'Pendants',
      materials: 'Sterling Silver · Fine Cable Chain',
      indicativePrice: 29500,
      image: 'assets/images/silver/silver-heart-pendant.jpg',
      imageAlt: 'Open-contour sterling silver pendant set with clear stones on fine silver chain',
      shortDescription: 'Delicate open silhouette accented with fine clear stones on an adjustable sterling chain.',
      description: 'A light, thoughtful keepsake pendant crafted for milestone gifting and effortless everyday layering.',
      specs: {
        Metal: 'Sterling Silver',
        Finish: 'High-Polish & Micro-Set',
        'Jewellery Type': 'Keepsake Pendant',
        'Chain Length': '40–45 cm adjustable',
        'Clasp Style': 'Lobster Clasp'
      },
      occasions: ['Birthdays', 'Anniversaries', 'Personal Celebrations'],
      featured: false
    },

    /* ===================== WATCHES (6) ===================== */
    {
      id: 'watch-fluted-bicolour',
      name: 'Valence Two-Tone Fluted Automatic',
      category: 'watches',
      categoryLabel: 'Watches',
      subcategory: 'Automatic Dress Watch',
      materials: 'Stainless Steel & Gold-Tone Bezel · Jubilee-Style Bracelet',
      indicativePrice: 685000,
      image: 'assets/images/watches/watch-two-tone.jpg',
      imageAlt: 'Two-tone steel and gold-tone mechanical wristwatch with fluted bezel and dark dial',
      shortDescription: 'Classic 36mm-proportioned fluted bezel, magnified date aperture, and five-link bracelet.',
      description: 'Pairs warm gold-tone bezel fluting with brushed steel outer links and a deep espresso-dark dial for effortless transition from tailoring to evening wear.',
      specs: {
        'Movement Type': 'Automatic Mechanical',
        'Case Material': 'Stainless Steel & Gold-Tone Fluted Bezel',
        'Case Diameter': '36 mm',
        'Strap / Bracelet': 'Five-Link Integrated Bracelet',
        'Dial Color': 'Deep Brown Sunburst',
        Complications: 'Date Aperture'
      },
      occasions: ['Weddings', 'Anniversaries', 'Professional Milestones'],
      featured: true
    },
    {
      id: 'watch-nocturne-slim',
      name: 'Nocturne Slim Sector Automatic',
      category: 'watches',
      categoryLabel: 'Watches',
      subcategory: 'Contemporary Slim Profile',
      materials: 'Polished Stainless Steel · Calfskin Strap',
      indicativePrice: 245000,
      image: 'assets/images/watches/watch-slim-black.jpg',
      imageAlt: 'Minimalist black-dial stainless steel dress watch with black leather strap',
      shortDescription: 'Svelte dress case with recessed date window, crisp baton indices, and supple black leather.',
      description: 'Conceived to slip effortlessly under tailored cuffs, the Nocturne balances high-contrast legibility with an architectural matte-black dial.',
      specs: {
        'Movement Type': 'Automatic Mechanical',
        'Case Material': 'Brushed & Polished Stainless Steel',
        'Case Diameter': '38.5 mm',
        'Strap / Bracelet': 'Black Leather Strap with Pin Buckle',
        'Dial Color': 'Matte Obsidian Black',
        Complications: 'Date at 3 O’Clock'
      },
      occasions: ['Professional Milestones', 'Birthdays', 'Anniversaries'],
      featured: true
    },
    {
      id: 'watch-calibre-chrono',
      name: 'Régulateur Steel Chronograph',
      category: 'watches',
      categoryLabel: 'Watches',
      subcategory: 'Chronograph',
      materials: 'Stainless Steel · Domed Sapphire Profile',
      indicativePrice: 540000,
      image: 'assets/images/watches/watch-omega-chrono.jpg',
      imageAlt: 'Close-up of silver-toned mechanical chronograph watch with tachymeter bezel',
      shortDescription: 'Three-register mechanical chronograph with sculpted pump pushers and high-contrast scale.',
      description: 'Built around classic motorsport timing geometry with recessed silver subdials, a crisp tachymeter bezel, and tactile start/stop actuation.',
      specs: {
        'Movement Type': 'Mechanical Hand-Wound Chronograph',
        'Case Material': 'Brushed Stainless Steel',
        'Case Diameter': '40 mm',
        'Strap / Bracelet': 'Three-Link Steel Bracelet',
        'Dial Color': 'Silver Opalescent',
        Complications: '12-Hour Chronograph & Tachymeter'
      },
      occasions: ['Professional Milestones', 'Anniversaries', 'Personal Celebrations'],
      featured: true
    },
    {
      id: 'watch-pelagic-tool',
      name: 'Pelagic Rotating-Bezel Automatic',
      category: 'watches',
      categoryLabel: 'Watches',
      subcategory: 'Dive-Style Watch',
      materials: 'Brushed Steel · Unidirectional Bezel',
      indicativePrice: 365000,
      image: 'assets/images/watches/watch-dark-hero.jpg',
      imageAlt: 'Brushed stainless steel dive-style mechanical watch with dark bezel on dark background',
      shortDescription: 'Tool-watch clarity with luminous geometric indices, knurled crown, and solid-link steel.',
      description: 'Inspired by mid-century marine instruments, combining rugged chamfered lugs with a cleanly legible matte dial and tactile 60-minute bezel.',
      specs: {
        'Movement Type': 'Automatic Mechanical',
        'Case Material': '316L-Style Brushed Stainless Steel',
        'Case Diameter': '41 mm',
        'Strap / Bracelet': 'Riveted-Style Steel Bracelet',
        'Dial Color': 'Charcoal Matte',
        Complications: 'Elapsed-Time Rotating Bezel'
      },
      occasions: ['Birthdays', 'Professional Milestones', 'Personal Celebrations'],
      featured: true
    },
    {
      id: 'watch-atelier-leather',
      name: 'Atelier White-Dial Classic Watch',
      category: 'watches',
      categoryLabel: 'Watches',
      subcategory: 'Classic Leather-Strap',
      materials: 'Stainless Steel · Saddle Brown Leather',
      indicativePrice: 128000,
      image: 'assets/images/watches/extra-photo-1617317376997-8748e6862c01.jpg',
      imageAlt: 'Classic white-dial wristwatch on dark brown leather strap resting on navy fabric',
      shortDescription: 'Clean white dial with slender applied markers paired with a warm stitched leather strap.',
      description: 'Timeless three-hand dress simplicity offering calm visual proportion for weddings, business attire, and everyday refinement.',
      specs: {
        'Movement Type': 'Automatic Mechanical',
        'Case Material': 'Polished Stainless Steel',
        'Case Diameter': '38 mm',
        'Strap / Bracelet': 'Brown Calfskin Leather',
        'Dial Color': 'Porcelain White',
        Complications: 'Central Seconds & Date'
      },
      occasions: ['Weddings', 'Anniversaries', 'Professional Milestones'],
      featured: false
    },
    {
      id: 'watch-minimal-quartz',
      name: 'Clair Minimalist Quartz Watch',
      category: 'watches',
      categoryLabel: 'Watches',
      subcategory: 'Quartz Everyday Watch',
      materials: 'Rose Gold-Tone Steel · Taupe Leather',
      indicativePrice: 54000,
      image: 'assets/images/watches/extra-photo-1524592094714-0f0654e20314.jpg',
      imageAlt: 'Minimalist white-dial quartz dress watch with thin rose-tone bezel and taupe strap',
      shortDescription: 'Featherweight quartz precision with ultra-clean baton dial and soft neutral leather strap.',
      description: 'Effortless grab-and-go accuracy in an understated 36mm unisex case—suited equally as a first fine timepiece or thoughtful milestone gift.',
      specs: {
        'Movement Type': 'High-Precision Quartz',
        'Case Material': 'Rose Gold-Tone Stainless Steel',
        'Case Diameter': '36 mm',
        'Strap / Bracelet': 'Taupe Leather Strap',
        'Dial Color': 'Matte Off-White',
        Complications: 'Two-Hand Minimalist Display'
      },
      occasions: ['Birthdays', 'Personal Celebrations', 'Professional Milestones'],
      featured: false
    }
  ];

  global.VERONNE_PRODUCTS = PRODUCTS_DATA;
})(window);
