/**
 * VERONNE — Site Configuration
 * Centralizes brand metadata, paths, navigation structure, stocked-brand config,
 * currency formatting, and showroom appointment options.
 */
(function (global) {
  'use strict';

  function getSiteRoot() {
    var meta = document.querySelector('meta[name="site-root"]');
    return meta ? meta.getAttribute('content') : '.';
  }

  var SITE_CONFIG = {
    brandName: 'VERONNE',
    tagline: 'Fine Horology & Contemporary Jewellery Showroom',
    currency: 'INR',
    currencySymbol: '₹',
    locale: 'en-IN',
    // Indicative display only; actual showroom availability is confirmed on enquiry.
    showIndicativePrices: true,
    // Configurable list of brands represented or available to enquire about at the showroom.
    // Brands marked inShowroom: false are featured editorially for horological discovery.
    brandsConfig: {
      showStockedBadge: false,
      enquiryEnabledForAll: true
    },
    storageKeys: {
      theme: 'veronne_theme',
      dir: 'veronne_dir'
    },
    visitPurposes: [
      'Private Viewing',
      'Timepiece Consultation',
      'Jewellery Styling',
      'Bridal & Engagement Selection',
      'Gifting Consultation',
      'Collection Discovery'
    ],
    visitTimeSlots: [
      '10:30 AM – 12:00 PM',
      '12:00 PM – 02:00 PM',
      '02:30 PM – 04:30 PM',
      '04:30 PM – 06:30 PM',
      '06:30 PM – 08:00 PM'
    ],
    showroomNotice:
      'Showroom address, direct telephone lines, and private salon hours are confirmed upon appointment request or official showroom launch.'
  };

  function resolvePath(relativePath) {
    var root = getSiteRoot().replace(/\/+$/, '');
    var clean = relativePath.replace(/^\/+/, '');
    return root + '/' + clean;
  }

  function formatPrice(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'Price on request';
    }
    return new Intl.NumberFormat(SITE_CONFIG.locale, {
      style: 'currency',
      currency: SITE_CONFIG.currency,
      maximumFractionDigits: 0
    }).format(amount);
  }

  global.VERONNE_CONFIG = SITE_CONFIG;
  global.veronneResolvePath = resolvePath;
  global.veronneFormatPrice = formatPrice;
})(window);
