/**
 * VERONNE — Gifting Discovery Filtering (Occasion, Category & Indicative Budget)
 */
(function (global) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('giftingGrid');
    if (!grid) return;

    var products = global.VERONNE_PRODUCTS || [];
    var occasionSelect = document.getElementById('giftOccasion');
    var categorySelect = document.getElementById('giftCategory');
    var budgetSelect = document.getElementById('giftBudget');
    var clearBtn = document.getElementById('giftClearBtn');
    var countEl = document.getElementById('giftingCount');
    var emptyEl = document.getElementById('giftingEmpty');
    var occasionPills = document.querySelectorAll('[data-occasion-pick]');

    var state = {
      occasion: 'all',
      category: 'all',
      budget: 'all'
    };

    function matchesBudget(price, range) {
      if (range === 'all') return true;
      if (typeof price !== 'number') return false;
      if (range === 'under-75k') return price < 75000;
      if (range === '75k-200k') return price >= 75000 && price <= 200000;
      if (range === '200k-500k') return price > 200000 && price <= 500000;
      if (range === 'above-500k') return price > 500000;
      return true;
    }

    function render() {
      var list = products.filter(function (p) {
        if (state.occasion !== 'all') {
          if (!p.occasions || p.occasions.indexOf(state.occasion) === -1) return false;
        }
        if (state.category !== 'all' && p.category !== state.category) return false;
        if (!matchesBudget(p.indicativePrice, state.budget)) return false;
        return true;
      });

      grid.innerHTML = '';
      if (!list.length) {
        if (emptyEl) emptyEl.hidden = false;
      } else {
        if (emptyEl) emptyEl.hidden = true;
        var frag = document.createDocumentFragment();
        list.forEach(function (item) {
          frag.appendChild(global.VeronneCatalogueUI.renderProductCard(item));
        });
        grid.appendChild(frag);
      }

      if (countEl) {
        countEl.textContent = 'Showing ' + list.length + ' gift suggestions';
      }

      occasionPills.forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-occasion-pick') === state.occasion);
      });
    }

    if (occasionSelect) {
      occasionSelect.addEventListener('change', function () {
        state.occasion = occasionSelect.value;
        render();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', function () {
        state.category = categorySelect.value;
        render();
      });
    }

    if (budgetSelect) {
      budgetSelect.addEventListener('change', function () {
        state.budget = budgetSelect.value;
        render();
      });
    }

    occasionPills.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.occasion = btn.getAttribute('data-occasion-pick');
        if (occasionSelect && global.VeronneUI) {
          global.VeronneUI.setSelectValue(occasionSelect, state.occasion);
        }
        render();
      });
    });

    function resetGifts() {
      state.occasion = 'all';
      state.category = 'all';
      state.budget = 'all';
      if (global.VeronneUI) {
        if (occasionSelect) global.VeronneUI.setSelectValue(occasionSelect, 'all');
        if (categorySelect) global.VeronneUI.setSelectValue(categorySelect, 'all');
        if (budgetSelect) global.VeronneUI.setSelectValue(budgetSelect, 'all');
      }
      render();
    }

    if (clearBtn) clearBtn.addEventListener('click', resetGifts);
    var emptyReset = document.getElementById('giftEmptyReset');
    if (emptyReset) emptyReset.addEventListener('click', resetGifts);

    render();
  });
})(window);
