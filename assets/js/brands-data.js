/**
 * VERONNE — Editorial Watchmaker Discovery Dataset
 * Accurate horological profiles & official maison links.
 * Configured for editorial discovery without implying unauthorized official dealership claims.
 */
(function (global) {
  'use strict';

  var BRANDS_DATA = [
    {
      id: 'rolex',
      name: 'Rolex',
      origin: 'Geneva, Switzerland',
      discipline: 'Chronometer Mechanical Watchmaking',
      summary:
        'Renowned for robust waterproof Oyster cases, Perpetual self-winding calibres, and stringent Superlative Chronometer precision across Oyster Perpetual, Datejust, Submariner, and Daytona families.',
      signatureFocus: 'Oystersteel & precious-metal cases, Cerachrom bezels, and in-house Perpetual movements.',
      movementFocus: 'Automatic mechanical (Superlative Chronometer)',
      officialUrl: 'https://www.rolex.com/',
      imageKey: 'brand-rolex',
      availableForEnquiry: true
    },
    {
      id: 'iwc',
      name: 'IWC Schaffhausen',
      origin: 'Schaffhausen, Switzerland',
      discipline: 'Engineering-Led Horology & Complications',
      summary:
        'Combining precision engineering with understated architectural dials across Pilot’s Watches, Portugieser, Portofino, and Ingenieur collections.',
      signatureFocus: 'Pellaton winding architecture, titanium and ceramic cases, and clean legible chronographs.',
      movementFocus: 'In-house automatic & hand-wound mechanical calibres',
      officialUrl: 'https://www.iwc.com/',
      imageKey: 'brand-iwc',
      availableForEnquiry: true
    },
    {
      id: 'tag-heuer',
      name: 'TAG Heuer',
      origin: 'La Chaux-de-Fonds, Switzerland',
      discipline: 'Avant-Garde Chronographs & Motorsport Timing',
      summary:
        'Defined by legible motorsport chronographs and sporty daily watches—from the Carrera and Monaco to the Aquaracer.',
      signatureFocus: 'High-contrast tachymeter dials, skeletonized chronograph bridges, and athletic steel bracelets.',
      movementFocus: 'Automatic mechanical chronographs & high-precision quartz',
      officialUrl: 'https://www.tagheuer.com/',
      imageKey: 'brand-tag',
      availableForEnquiry: true
    },
    {
      id: 'tissot',
      name: 'Tissot',
      origin: 'Le Locle, Switzerland',
      discipline: 'Accessible Swiss Mechanical & Quartz Craft',
      summary:
        'Balances traditional Jura watchmaking with contemporary silhouettes—spanning the integrated-bracelet PRX, Heritage, and Le Locle dress timepieces.',
      signatureFocus: 'Powermatic 80 automatic movements, sapphire crystals, and everyday versatile cases.',
      movementFocus: 'Automatic (80-hour reserve) & Swiss quartz',
      officialUrl: 'https://www.tissotwatches.com/',
      imageKey: 'brand-tissot',
      availableForEnquiry: true
    },
    {
      id: 'omega',
      name: 'Omega',
      origin: 'Bienne, Switzerland',
      discipline: 'Co-Axial Master Chronometer Precision',
      summary:
        'Celebrated for Co-Axial escapements, antimagnetic silicon balance springs, and enduring icons including the Speedmaster, Seamaster, Constellation, and De Ville.',
      signatureFocus: 'Master Chronometer certification, ceramic dials, and sculpted twisted-lug cases.',
      movementFocus: 'Co-Axial mechanical & hand-wound chronograph calibres',
      officialUrl: 'https://www.omegawatches.com/',
      imageKey: 'brand-omega',
      availableForEnquiry: true
    },
    {
      id: 'longines',
      name: 'Longines',
      origin: 'Saint-Imier, Switzerland',
      discipline: 'Classical Elegance & Heritage Aviation',
      summary:
        'Known for slender dress profiles, moonphase complications, and vintage-inspired Conquest, Master Collection, and DolceVita references.',
      signatureFocus: 'Barleycorn guilloché dials, blued-steel hands, and balanced traditional proportions.',
      movementFocus: 'Automatic mechanical & high-accuracy quartz',
      officialUrl: 'https://www.longines.com/',
      imageKey: 'brand-longines',
      availableForEnquiry: true
    },
    {
      id: 'tudor',
      name: 'Tudor',
      origin: 'Geneva, Switzerland',
      discipline: 'Contemporary Tool & Heritage Timepieces',
      summary:
        'Built around rugged reliability and vintage-rooted design codes in the Black Bay, Pelagos, and Royal collections.',
      signatureFocus: 'Snowflake hands, riveted-style bracelets, and manufacture MT calibres.',
      movementFocus: 'Manufacture automatic mechanical',
      officialUrl: 'https://www.tudorwatch.com/',
      imageKey: 'brand-tudor',
      availableForEnquiry: true
    },
    {
      id: 'grand-seiko',
      name: 'Grand Seiko',
      origin: 'Shizukuishi & Shinshu, Japan',
      discipline: 'Zaratsu Craftsmanship & Nature-Inspired Dials',
      summary:
        'Distinguished by distortion-free Zaratsu mirror polishing, sharp faceted indices, and a trio of movements: Hi-Beat 36000, Spring Drive, and 9F Quartz.',
      signatureFocus: 'Textured seasonal dials, razor-sharp dauphine hands, and serene finishing.',
      movementFocus: 'Spring Drive, Hi-Beat mechanical & thermo-compensated quartz',
      officialUrl: 'https://www.grand-seiko.com/',
      imageKey: 'brand-grandseiko',
      availableForEnquiry: true
    }
  ];

  global.VERONNE_BRANDS = BRANDS_DATA;
})(window);
