/**
 * VERONNE — Products Catalogue Filtering, Category-Aware Controls & Sorting
 */
(function (global) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('catalogueGrid');
    if (!grid) return;

    var products = global.VERONNE_PRODUCTS || [];
    var tabs = document.querySelectorAll('[data-cat-tab]');
    var subSelect = document.getElementById('filterSubcategory');
    var specSelect = document.getElementById('filterSpec');
    var specLabel = document.getElementById('filterSpecLabel');
    var sortSelect = document.getElementById('filterSort');
    var searchInput = document.getElementById('filterSearch');
    var clearBtn = document.getElementById('clearFiltersBtn');
    var emptyClearBtn = document.getElementById('emptyClearBtn');
    var countEl = document.getElementById('catalogueCount');
    var emptyState = document.getElementById('catalogueEmpty');

    var state = {
      category: 'all',
      subcategory: 'all',
      spec: 'all',
      sort: 'featured',
      query: ''
    };

    function readUrlParams() {
      var params = new URLSearchParams(global.location.search);
      var cat = params.get('category');
      var sub = params.get('subcategory');
      var q = params.get('q');
      if (cat && ['all', 'gold', 'diamonds', 'silver', 'watches'].indexOf(cat) !== -1) {
        state.category = cat;
      }
      if (sub) state.subcategory = sub;
      if (q) {
        state.query = q;
        if (searchInput) searchInput.value = q;
      }
    }

    function populateSubcategories() {
      if (!subSelect) return;
      var subs = [];
      products.forEach(function (p) {
        if (state.category === 'all' || p.category === state.category) {
          if (subs.indexOf(p.subcategory) === -1) subs.push(p.subcategory);
        }
      });
      subs.sort();

      subSelect.innerHTML = '<option value="all">All Subcategories</option>';
      subs.forEach(function (s) {
        var opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        subSelect.appendChild(opt);
      });

      if (subs.indexOf(state.subcategory) === -1) {
        state.subcategory = 'all';
      }
      subSelect.value = state.subcategory;
      if (global.VeronneUI) global.VeronneUI.refreshSelect(subSelect);
    }

    function populateSpecFilter() {
      if (!specSelect || !specLabel) return;

      var options = [];
      if (state.category === 'watches') {
        specLabel.textContent = 'Movement Type';
        options = [
          { value: 'all', label: 'All Movements' },
          { value: 'Automatic', label: 'Automatic' },
          { value: 'Mechanical', label: 'Mechanical Hand-Wound' },
          { value: 'Quartz', label: 'Quartz' }
        ];
      } else if (state.category === 'gold' || state.category === 'diamonds' || state.category === 'silver') {
        specLabel.textContent = 'Finish & Metal Tone';
        options = [
          { value: 'all', label: 'All Finishes' },
          { value: 'Yellow', label: 'Yellow Gold Tone' },
          { value: 'Rose', label: 'Rose Gold Tone' },
          { value: 'White', label: 'White Gold / Platinum Tone' },
          { value: 'Sterling Silver', label: 'Sterling Silver' },
          { value: 'Polished', label: 'High-Polish Finish' }
        ];
      } else {
        specLabel.textContent = 'Material Focus';
        options = [
          { value: 'all', label: 'All Materials' },
          { value: 'Gold', label: 'Gold Pieces' },
          { value: 'Diamond', label: 'Diamond Pieces' },
          { value: 'Silver', label: 'Silver Pieces' },
          { value: 'Steel', label: 'Stainless Steel & Titanium' }
        ];
      }

      specSelect.innerHTML = '';
      options.forEach(function (item) {
        var opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        specSelect.appendChild(opt);
      });

      state.spec = 'all';
      specSelect.value = 'all';
      if (global.VeronneUI) global.VeronneUI.refreshSelect(specSelect);
    }

    function syncTabs() {
      tabs.forEach(function (tab) {
        var isMatch = tab.getAttribute('data-cat-tab') === state.category;
        tab.classList.toggle('is-active', isMatch);
        tab.setAttribute('aria-pressed', String(isMatch));
      });
    }

    function filterAndSort() {
      var q = state.query.trim().toLowerCase();

      var filtered = products.filter(function (p) {
        if (state.category !== 'all' && p.category !== state.category) return false;
        if (state.subcategory !== 'all' && p.subcategory !== state.subcategory) return false;

        if (state.spec !== 'all') {
          var haystack = (
            p.materials +
            ' ' +
            JSON.stringify(p.specs || {}) +
            ' ' +
            p.categoryLabel
          ).toLowerCase();
          if (haystack.indexOf(state.spec.toLowerCase()) === -1) return false;
        }

        if (q) {
          var text = (
            p.name +
            ' ' +
            p.categoryLabel +
            ' ' +
            p.subcategory +
            ' ' +
            p.materials +
            ' ' +
            p.shortDescription +
            ' ' +
            p.description +
            ' ' +
            JSON.stringify(p.specs || {})
          ).toLowerCase();
          if (text.indexOf(q) === -1) return false;
        }

        return true;
      });

      if (state.sort === 'price-asc') {
        filtered.sort(function (a, b) {
          return (a.indicativePrice || 0) - (b.indicativePrice || 0);
        });
      } else if (state.sort === 'price-desc') {
        filtered.sort(function (a, b) {
          return (b.indicativePrice || 0) - (a.indicativePrice || 0);
        });
      } else if (state.sort === 'name-asc') {
        filtered.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      }

      grid.innerHTML = '';
      if (!filtered.length) {
        if (emptyState) emptyState.hidden = false;
      } else {
        if (emptyState) emptyState.hidden = true;
        var frag = document.createDocumentFragment();
        filtered.forEach(function (item) {
          frag.appendChild(global.VeronneCatalogueUI.renderProductCard(item));
        });
        grid.appendChild(frag);
      }

      if (countEl) {
        countEl.textContent =
          'Showing ' + filtered.length + ' of ' + products.length + ' showroom pieces';
      }
    }

    function resetAll() {
      state.category = 'all';
      state.subcategory = 'all';
      state.spec = 'all';
      state.sort = 'featured';
      state.query = '';
      if (searchInput) searchInput.value = '';
      if (sortSelect && global.VeronneUI) global.VeronneUI.setSelectValue(sortSelect, 'featured');
      syncTabs();
      populateSubcategories();
      populateSpecFilter();
      filterAndSort();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        state.category = tab.getAttribute('data-cat-tab');
        state.subcategory = 'all';
        syncTabs();
        populateSubcategories();
        populateSpecFilter();
        filterAndSort();
      });
    });

    if (subSelect) {
      subSelect.addEventListener('change', function () {
        state.subcategory = subSelect.value;
        filterAndSort();
      });
    }

    if (specSelect) {
      specSelect.addEventListener('change', function () {
        state.spec = specSelect.value;
        filterAndSort();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        state.sort = sortSelect.value;
        filterAndSort();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.query = searchInput.value;
        filterAndSort();
      });
    }

    if (clearBtn) clearBtn.addEventListener('click', resetAll);
    if (emptyClearBtn) emptyClearBtn.addEventListener('click', resetAll);

    readUrlParams();
    syncTabs();
    populateSubcategories();
    populateSpecFilter();
    filterAndSort();
  });
})(window);
