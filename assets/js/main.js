/**
 * VERONNE — Core UI Interactions, Navigation, Theme/RTL Persistence & Accessible Dropdowns
 */
(function (global) {
  'use strict';

  var root = document.documentElement;
  var cfg = global.VERONNE_CONFIG || {
    storageKeys: { theme: 'veronne_theme', dir: 'veronne_dir' }
  };

  /* --------------------------------------------------------------------------
     Theme (Light / Dark) & Direction (LTR / RTL)
     -------------------------------------------------------------------------- */
  function getStored(key, fallback) {
    try {
      return global.localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, val) {
    try {
      global.localStorage.setItem(key, val);
    } catch (e) {
      /* ignore storage restrictions */
    }
  }

  function applyTheme(theme) {
    var next = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    setStored(cfg.storageKeys.theme, next);
    document.querySelectorAll('.js-theme-toggle').forEach(function (btn) {
      var isDark = next === 'dark';
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      var label = btn.querySelector('.js-theme-label');
      if (label) {
        label.textContent = isDark ? 'Light' : 'Dark';
      }
      var sun = btn.querySelector('.icon-sun');
      var moon = btn.querySelector('.icon-moon');
      if (sun && moon) {
        sun.style.display = isDark ? 'block' : 'none';
        moon.style.display = isDark ? 'none' : 'block';
      }
    });
  }

  function applyDir(dir) {
    var next = dir === 'rtl' ? 'rtl' : 'ltr';
    root.setAttribute('dir', next);
    setStored(cfg.storageKeys.dir, next);
    document.querySelectorAll('.js-dir-toggle').forEach(function (btn) {
      var isRtl = next === 'rtl';
      btn.setAttribute('aria-pressed', String(isRtl));
      btn.setAttribute('aria-label', isRtl ? 'Switch text direction to LTR' : 'Switch text direction to RTL');
      var label = btn.querySelector('.js-dir-label');
      if (label) {
        label.textContent = isRtl ? 'LTR' : 'RTL';
      } else {
        btn.textContent = isRtl ? 'LTR' : 'RTL';
      }
    });
  }

  function initThemeAndDir() {
    applyTheme(getStored(cfg.storageKeys.theme, root.getAttribute('data-theme') || 'light'));
    applyDir(getStored(cfg.storageKeys.dir, root.getAttribute('dir') || 'ltr'));

    document.addEventListener('click', function (e) {
      var themeBtn = e.target.closest('.js-theme-toggle');
      if (themeBtn) {
        var currTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        applyTheme(currTheme === 'dark' ? 'light' : 'dark');
        return;
      }

      var dirBtn = e.target.closest('.js-dir-toggle');
      if (dirBtn) {
        var currDir = root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        applyDir(currDir === 'rtl' ? 'ltr' : 'rtl');
      }
    });
  }

  /* --------------------------------------------------------------------------
     Desktop Home Dropdown
     -------------------------------------------------------------------------- */
  function initDesktopDropdowns() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(function (dd) {
      var trigger = dd.querySelector('.nav-dropdown__trigger');
      var menu = dd.querySelector('.nav-dropdown__menu');
      if (!trigger || !menu) return;

      var closeTimer = null;

      function open() {
        clearTimeout(closeTimer);
        dd.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function close() {
        dd.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (dd.classList.contains('is-open')) {
          close();
        } else {
          open();
        }
      });

      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          open();
          var first = menu.querySelector('a');
          if (first) first.focus();
        } else if (e.key === 'Escape') {
          close();
          trigger.focus();
        }
      });

      menu.addEventListener('keydown', function (e) {
        var items = Array.prototype.slice.call(menu.querySelectorAll('a'));
        var idx = items.indexOf(document.activeElement);
        if (e.key === 'Escape') {
          close();
          trigger.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          items[(idx + 1) % items.length].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length].focus();
        }
      });

      if (global.matchMedia && global.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        dd.addEventListener('mouseenter', open);
        dd.addEventListener('mouseleave', function () {
          closeTimer = setTimeout(close, 160);
        });
      }

      document.addEventListener('click', function (e) {
        if (!dd.contains(e.target)) close();
      });
    });
  }

  /* --------------------------------------------------------------------------
     Mobile & Tablet Physical-Left Side Drawer
     -------------------------------------------------------------------------- */
  function initMobileDrawer() {
    var openBtn = document.getElementById('mobileMenuOpen');
    var drawer = document.getElementById('mobileDrawer');
    var backdrop = document.getElementById('drawerBackdrop');
    var closeBtn = document.getElementById('mobileMenuClose');
    if (!openBtn || !drawer || !backdrop || !closeBtn) return;

    var lastFocused = null;

    function getFocusable() {
      return Array.prototype.slice.call(
        drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
    }

    function openDrawer() {
      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
      setTimeout(function () {
        closeBtn.focus();
      }, 40);
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    openBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (e.key === 'Tab') {
        var focusable = getFocusable();
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });
  }

  /* --------------------------------------------------------------------------
     Custom Accessible Viewport-Aware Dropdown (.v-select)
     Prevents native mobile/tablet detached popup issues.
     -------------------------------------------------------------------------- */
  var activeDropdownInstance = null;
  var uidCounter = 0;

  function VeronneSelect(nativeSelect) {
    this.select = nativeSelect;
    this.id = 'vselect-' + (++uidCounter);
    this.isOpen = false;
    this.focusedIndex = -1;
    this.options = [];
    this.build();
  }

  VeronneSelect.prototype.build = function () {
    var self = this;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'v-select';

    this.select.parentNode.insertBefore(this.wrapper, this.select);
    this.wrapper.appendChild(this.select);
    this.select.classList.add('v-select__native');
    this.select.setAttribute('tabindex', '-1');
    this.select.setAttribute('aria-hidden', 'true');

    this.trigger = document.createElement('button');
    this.trigger.type = 'button';
    this.trigger.className = 'v-select__trigger';
    this.trigger.id = this.id + '-trigger';
    this.trigger.setAttribute('role', 'combobox');
    this.trigger.setAttribute('aria-haspopup', 'listbox');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-controls', this.id + '-listbox');

    var labelId = this.select.getAttribute('aria-labelledby');
    if (labelId) {
      this.trigger.setAttribute('aria-labelledby', labelId + ' ' + this.trigger.id);
    } else if (this.select.id) {
      var assocLabel = document.querySelector('label[for="' + this.select.id + '"]');
      if (assocLabel) {
        if (!assocLabel.id) assocLabel.id = this.id + '-label';
        this.trigger.setAttribute('aria-labelledby', assocLabel.id + ' ' + this.trigger.id);
      }
    }

    this.valueSpan = document.createElement('span');
    this.valueSpan.className = 'v-select__value';
    this.trigger.appendChild(this.valueSpan);

    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.setAttribute('viewBox', '0 0 24 24');
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('stroke', 'currentColor');
    arrow.setAttribute('stroke-width', '1.8');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.classList.add('v-select__arrow');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M6 9l6 6 6-6');
    arrow.appendChild(path);
    this.trigger.appendChild(arrow);

    this.panel = document.createElement('div');
    this.panel.className = 'v-select-panel';
    this.panel.id = this.id + '-listbox';
    this.panel.setAttribute('role', 'listbox');
    this.panel.setAttribute('tabindex', '-1');
    document.body.appendChild(this.panel);

    this.wrapper.appendChild(this.trigger);
    this.syncOptions();

    this.trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (self.isOpen) {
        self.close(true);
      } else {
        self.open();
      }
    });

    this.trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!self.isOpen) {
          self.open();
        } else if (e.key === 'ArrowDown') {
          self.moveFocus(1);
        } else if (e.key === 'ArrowUp') {
          self.moveFocus(-1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          if (self.focusedIndex >= 0) self.selectIndex(self.focusedIndex);
        }
      } else if (e.key === 'Escape' && self.isOpen) {
        e.preventDefault();
        self.close(true);
      }
    });

    this.panel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        self.moveFocus(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        self.moveFocus(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        self.setFocus(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        self.setFocus(self.options.length - 1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (self.focusedIndex >= 0) self.selectIndex(self.focusedIndex);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        self.close(true);
      } else if (e.key === 'Tab') {
        self.close(false);
      }
    });

    this.select.addEventListener('change', function () {
      self.updateDisplay();
    });
  };

  VeronneSelect.prototype.syncOptions = function () {
    var self = this;
    if (this.isOpen) {
      this.close(false);
    }
    this.panel.innerHTML = '';
    this.options = [];

    Array.prototype.forEach.call(this.select.options, function (opt, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'v-select-option';
      btn.id = self.id + '-opt-' + index;
      btn.setAttribute('role', 'option');
      btn.setAttribute('data-value', opt.value);
      btn.setAttribute('aria-selected', opt.selected ? 'true' : 'false');
      if (opt.disabled) btn.disabled = true;

      var text = document.createElement('span');
      text.textContent = opt.textContent;
      btn.appendChild(text);

      var check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      check.setAttribute('viewBox', '0 0 24 24');
      check.setAttribute('fill', 'none');
      check.setAttribute('stroke', 'currentColor');
      check.setAttribute('stroke-width', '2');
      check.setAttribute('aria-hidden', 'true');
      check.classList.add('v-select-option__check');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M5 12l5 5L20 7');
      check.appendChild(path);
      btn.appendChild(check);

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        self.selectIndex(index);
      });

      self.panel.appendChild(btn);
      self.options.push(btn);
    });

    this.updateDisplay();
  };

  VeronneSelect.prototype.updateDisplay = function () {
    var idx = this.select.selectedIndex;
    var selectedOpt = idx >= 0 ? this.select.options[idx] : null;
    if (selectedOpt) {
      this.valueSpan.textContent = selectedOpt.textContent;
      this.valueSpan.classList.toggle('is-placeholder', selectedOpt.value === '');
    } else {
      this.valueSpan.textContent = 'Select';
      this.valueSpan.classList.add('is-placeholder');
    }

    this.options.forEach(function (btn, i) {
      btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
  };

  VeronneSelect.prototype.positionPanel = function (fromScroll) {
    if (!this.isOpen) return;
    var rect = this.trigger.getBoundingClientRect();
    var header = document.querySelector('.site-header');
    var headerBottom = header ? header.getBoundingClientRect().bottom : 0;

    if (fromScroll && (rect.bottom < headerBottom + 4 || rect.top > global.innerHeight - 4)) {
      this.close(false);
      return;
    }

    var margin = 8;
    var gap = 4;
    var spaceBelow = Math.max(0, global.innerHeight - rect.bottom - margin - gap);
    var topLimit = Math.max(margin, headerBottom + margin);
    var spaceAbove = Math.max(0, rect.top - topLimit - gap);
    var width = Math.min(Math.max(rect.width, 210), global.innerWidth - margin * 2);

    this.panel.style.width = width + 'px';
    this.panel.style.maxHeight = '320px';

    var naturalHeight = Math.min(this.panel.scrollHeight || 260, 320);
    var openAbove = spaceBelow < Math.min(naturalHeight, 180) && spaceAbove > spaceBelow;
    var available = openAbove ? spaceAbove : spaceBelow;
    var maxAllowed = Math.min(320, available);
    var finalHeight = Math.min(naturalHeight, maxAllowed);

    this.panel.style.maxHeight = maxAllowed + 'px';

    if (openAbove) {
      this.panel.style.top = Math.max(topLimit, rect.top - gap - finalHeight) + 'px';
    } else {
      var topPos = Math.min(rect.bottom + gap, Math.max(margin, global.innerHeight - margin - finalHeight));
      this.panel.style.top = topPos + 'px';
    }

    var isRtl = root.getAttribute('dir') === 'rtl';
    var left = isRtl ? rect.right - width : rect.left;
    left = Math.max(margin, Math.min(left, global.innerWidth - width - margin));
    this.panel.style.left = left + 'px';
  };

  VeronneSelect.prototype.open = function () {
    if (activeDropdownInstance && activeDropdownInstance !== this) {
      activeDropdownInstance.close(false);
    }
    this.isOpen = true;
    activeDropdownInstance = this;
    this.trigger.setAttribute('aria-expanded', 'true');
    this.panel.classList.add('is-open');
    this.positionPanel();

    var selIdx = Math.max(0, this.select.selectedIndex);
    this.setFocus(selIdx);
    this.panel.focus({ preventScroll: true });
  };

  VeronneSelect.prototype.close = function (restoreFocus) {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (activeDropdownInstance === this) {
      activeDropdownInstance = null;
    }
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.removeAttribute('aria-activedescendant');
    this.panel.classList.remove('is-open');
    if (restoreFocus) {
      this.trigger.focus({ preventScroll: true });
    }
  };

  VeronneSelect.prototype.setFocus = function (index) {
    if (!this.options.length) return;
    var next = Math.max(0, Math.min(index, this.options.length - 1));
    this.focusedIndex = next;
    var activeBtn = null;
    this.options.forEach(function (btn, i) {
      var isFoc = i === next;
      btn.classList.toggle('is-focused', isFoc);
      if (isFoc) activeBtn = btn;
    });
    if (activeBtn) {
      this.trigger.setAttribute('aria-activedescendant', activeBtn.id);
      var optTop = activeBtn.offsetTop;
      var optBottom = optTop + activeBtn.offsetHeight;
      if (optTop < this.panel.scrollTop) {
        this.panel.scrollTop = optTop;
      } else if (optBottom > this.panel.scrollTop + this.panel.clientHeight) {
        this.panel.scrollTop = optBottom - this.panel.clientHeight;
      }
    }
  };

  VeronneSelect.prototype.moveFocus = function (delta) {
    this.setFocus(this.focusedIndex + delta);
  };

  VeronneSelect.prototype.selectIndex = function (index) {
    if (index < 0 || index >= this.select.options.length) return;
    if (this.select.options[index].disabled) return;
    this.select.selectedIndex = index;
    this.updateDisplay();
    this.select.dispatchEvent(new Event('change', { bubbles: true }));
    this.close(true);
  };

  var selectInstances = new WeakMap();

  function closeAllSelects() {
    if (activeDropdownInstance) {
      activeDropdownInstance.close(false);
    }
  }

  function initCustomSelects() {
    document.querySelectorAll('select[data-v-select]').forEach(function (sel) {
      if (!selectInstances.has(sel)) {
        selectInstances.set(sel, new VeronneSelect(sel));
      }
    });

    function handleOutside(e) {
      if (!activeDropdownInstance) return;
      if (
        !activeDropdownInstance.wrapper.contains(e.target) &&
        !activeDropdownInstance.panel.contains(e.target)
      ) {
        activeDropdownInstance.close(false);
      }
    }

    document.addEventListener('pointerdown', handleOutside);
    document.addEventListener('click', handleOutside);

    global.addEventListener(
      'scroll',
      function () {
        if (activeDropdownInstance) {
          activeDropdownInstance.positionPanel(true);
        }
      },
      true
    );

    global.addEventListener('resize', function () {
      if (activeDropdownInstance) {
        activeDropdownInstance.positionPanel(false);
      }
    });
  }

  function refreshSelect(selectEl) {
    var inst = selectInstances.get(selectEl);
    if (inst) {
      inst.syncOptions();
    }
  }

  function setSelectValue(selectEl, value) {
    selectEl.value = value;
    var inst = selectInstances.get(selectEl);
    if (inst) {
      inst.updateDisplay();
    }
  }

  /* --------------------------------------------------------------------------
     Back-to-Top, Accordions, Scroll Reveal & Hero Slider
     -------------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    function toggle() {
      btn.classList.toggle('is-visible', global.scrollY > 420);
    }

    global.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', function () {
      var reduced = global.matchMedia('(prefers-reduced-motion: reduce)').matches;
      global.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  function initAccordions() {
    document.querySelectorAll('.faq-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        var panelId = trigger.getAttribute('aria-controls');
        var panel = panelId ? document.getElementById(panelId) : null;
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }

  function initReveals() {
    var nodes = document.querySelectorAll('[data-reveal]');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in global) || global.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    root.classList.add('js-anim');

    function revealVisibleOrAbove() {
      var vh = global.innerHeight || 900;
      nodes.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < vh + 120) {
          el.classList.add('is-revealed');
        }
      });
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '100px 0px' }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });

    revealVisibleOrAbove();
    global.addEventListener('scroll', revealVisibleOrAbove, { passive: true });
  }

  function initHeroSlider() {
    var hero = document.querySelector('[data-hero-slider]');
    if (!hero) return;
    var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero-showroom__slide'));
    var dots = Array.prototype.slice.call(hero.querySelectorAll('.hero-dot'));
    if (slides.length <= 1) return;

    var current = 0;
    var timer = null;
    var reduced = global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(idx) {
      current = (idx + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
        d.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    }

    function start() {
      if (reduced) return;
      clearInterval(timer);
      timer = setInterval(function () {
        show(current + 1);
      }, 6000);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        show(i);
        start();
      });
    });

    start();
  }

  function initWatchCarousel() {
    var wrap = document.querySelector('[data-watch-carousel]');
    if (!wrap) return;
    var track = wrap.querySelector('.timepiece-track');
    var prevBtn = wrap.querySelector('[data-carousel-prev]');
    var nextBtn = wrap.querySelector('[data-carousel-next]');
    if (!track || !prevBtn || !nextBtn) return;

    function updateArrows() {
      var hasOverflow = track.scrollWidth > track.clientWidth + 8;
      prevBtn.classList.toggle('is-hidden', !hasOverflow);
      nextBtn.classList.toggle('is-hidden', !hasOverflow);
      if (!hasOverflow) return;

      var isRtl = root.getAttribute('dir') === 'rtl';
      var scrollLeft = Math.abs(track.scrollLeft);
      var maxScroll = track.scrollWidth - track.clientWidth;

      if (!isRtl) {
        prevBtn.disabled = scrollLeft <= 4;
        nextBtn.disabled = scrollLeft >= maxScroll - 4;
      } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
      }
    }

    function scrollByCard(dirSign) {
      var slide = track.querySelector('.timepiece-slide');
      var step = slide ? slide.getBoundingClientRect().width + 24 : 360;
      var isRtl = root.getAttribute('dir') === 'rtl';
      var delta = isRtl ? -dirSign * step : dirSign * step;
      track.scrollBy({ left: delta, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', function () {
      scrollByCard(-1);
    });
    nextBtn.addEventListener('click', function () {
      scrollByCard(1);
    });
    track.addEventListener('scroll', updateArrows, { passive: true });
    global.addEventListener('resize', updateArrows);
    setTimeout(updateArrows, 120);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initThemeAndDir();
    initDesktopDropdowns();
    initMobileDrawer();
    initCustomSelects();
    initBackToTop();
    initAccordions();
    initReveals();
    initHeroSlider();
    initWatchCarousel();
  });

  global.VeronneUI = {
    refreshSelect: refreshSelect,
    setSelectValue: setSelectValue,
    closeAllSelects: closeAllSelects,
    applyTheme: applyTheme,
    applyDir: applyDir
  };
})(window);
