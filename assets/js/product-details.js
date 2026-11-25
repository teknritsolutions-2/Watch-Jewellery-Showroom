/**
 * VERONNE — Shared Product Card Renderer & Product Detail Dialog
 */
(function (global) {
  'use strict';

  function resolveImg(path) {
    return typeof global.veronneResolvePath === 'function' ? global.veronneResolvePath(path) : path;
  }

  function formatPrice(val) {
    return typeof global.veronneFormatPrice === 'function' ? global.veronneFormatPrice(val) : 'Price on request';
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderProductCard(product, opts) {
    opts = opts || {};
    var imgSrc = resolveImg(product.image);
    var enquireUrl =
      resolveImg('pages/contact.html') +
      '?product=' +
      encodeURIComponent(product.id) +
      '&category=' +
      encodeURIComponent(product.category);

    var article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('data-product-id', product.id);

    article.innerHTML =
      '<div class="product-card__media">' +
        '<img src="' + escapeHtml(imgSrc) + '" alt="' + escapeHtml(product.imageAlt || product.name) + '" loading="lazy" width="800" height="600">' +
      '</div>' +
      '<div class="product-card__body">' +
        '<span class="product-card__meta">' + escapeHtml(product.categoryLabel + ' · ' + product.subcategory) + '</span>' +
        '<h3 class="product-card__title">' + escapeHtml(product.name) + '</h3>' +
        '<p class="product-card__material">' + escapeHtml(product.materials) + '</p>' +
        (opts.hideDescription ? '' : '<p class="product-card__desc">' + escapeHtml(product.shortDescription) + '</p>') +
        '<div class="product-card__footer">' +
          '<span class="product-card__price">' + escapeHtml(formatPrice(product.indicativePrice)) + '</span>' +
          '<div class="product-card__actions">' +
            '<button type="button" class="btn btn--outline btn--sm js-open-product" data-product-id="' + escapeHtml(product.id) + '">Details</button>' +
            '<a class="btn btn--primary btn--sm" href="' + escapeHtml(enquireUrl) + '">Enquire</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    return article;
  }

  /* --------------------------------------------------------------------------
     Product Detail Modal
     -------------------------------------------------------------------------- */
  var modalBackdrop = null;
  var lastTrigger = null;

  function ensureModal() {
    if (modalBackdrop) return modalBackdrop;

    modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.id = 'productDetailModal';
    modalBackdrop.setAttribute('aria-hidden', 'true');
    modalBackdrop.innerHTML =
      '<div class="product-modal" role="dialog" aria-modal="true" aria-labelledby="pmTitle">' +
        '<button type="button" class="product-modal__close" id="pmCloseBtn" aria-label="Close product details">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
            '<path d="M18 6L6 18M6 6l12 12"/>' +
          '</svg>' +
        '</button>' +
        '<div class="product-modal__layout">' +
          '<div class="product-modal__media">' +
            '<img id="pmImg" src="" alt="" width="1000" height="750">' +
          '</div>' +
          '<div class="product-modal__info">' +
            '<span class="eyebrow" id="pmCategory"></span>' +
            '<h2 class="display-md" id="pmTitle"></h2>' +
            '<p class="lead" id="pmPrice" style="margin-top:0.5rem;color:var(--text-primary);font-weight:500;"></p>' +
            '<p id="pmDesc" style="margin-top:1rem;color:var(--text-secondary);"></p>' +
            '<dl class="product-modal__specs" id="pmSpecs"></dl>' +
            '<div class="product-modal__actions">' +
              '<a id="pmEnquireLink" class="btn btn--primary" href="#">Enquire About This Piece</a>' +
              '<button type="button" class="btn btn--outline" id="pmCloseSecondary">Continue Browsing</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modalBackdrop);

    var closeBtn = modalBackdrop.querySelector('#pmCloseBtn');
    var closeSec = modalBackdrop.querySelector('#pmCloseSecondary');

    closeBtn.addEventListener('click', closeModal);
    closeSec.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });

    return modalBackdrop;
  }

  function openProductModal(productId, triggerEl) {
    var list = global.VERONNE_PRODUCTS || [];
    var product = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === productId) {
        product = list[i];
        break;
      }
    }
    if (!product) return;

    lastTrigger = triggerEl || document.activeElement;
    if (global.VeronneUI && typeof global.VeronneUI.closeAllSelects === 'function') {
      global.VeronneUI.closeAllSelects();
    }
    var modal = ensureModal();

    var img = modal.querySelector('#pmImg');
    img.src = resolveImg(product.image);
    img.alt = product.imageAlt || product.name;

    modal.querySelector('#pmCategory').textContent = product.categoryLabel + ' · ' + product.subcategory;
    modal.querySelector('#pmTitle').textContent = product.name;
    modal.querySelector('#pmPrice').textContent = 'Indicative: ' + formatPrice(product.indicativePrice);
    modal.querySelector('#pmDesc').textContent = product.description || product.shortDescription;

    var specsEl = modal.querySelector('#pmSpecs');
    var specsHtml =
      '<div class="spec-row"><dt>Materials</dt><dd>' + escapeHtml(product.materials) + '</dd></div>';
    if (product.specs) {
      Object.keys(product.specs).forEach(function (label) {
        specsHtml +=
          '<div class="spec-row"><dt>' + escapeHtml(label) + '</dt><dd>' + escapeHtml(product.specs[label]) + '</dd></div>';
      });
    }
    specsEl.innerHTML = specsHtml;

    var enquireUrl =
      resolveImg('pages/contact.html') +
      '?product=' +
      encodeURIComponent(product.id) +
      '&category=' +
      encodeURIComponent(product.category);
    modal.querySelector('#pmEnquireLink').setAttribute('href', enquireUrl);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('#pmCloseBtn').focus();
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.js-open-product');
    if (btn) {
      var pid = btn.getAttribute('data-product-id');
      if (pid) openProductModal(pid, btn);
    }
  });

  global.VeronneCatalogueUI = {
    renderProductCard: renderProductCard,
    openProductModal: openProductModal,
    closeModal: closeModal
  };
})(window);
