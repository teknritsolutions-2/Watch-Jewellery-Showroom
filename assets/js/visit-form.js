/**
 * VERONNE — Showroom Visit & Enquiry Form (Validation, Preselection, Review, Copy & Download)
 */
(function (global) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('visitEnquiryForm');
    if (!form) return;

    var products = global.VERONNE_PRODUCTS || [];
    var brands = global.VERONNE_BRANDS || [];

    var nameInput = document.getElementById('visitName');
    var emailInput = document.getElementById('visitEmail');
    var phoneInput = document.getElementById('visitPhone');
    var categorySelect = document.getElementById('visitCategory');
    var productSelect = document.getElementById('visitProduct');
    var brandSelect = document.getElementById('visitBrand');
    var purposeSelect = document.getElementById('visitPurpose');
    var dateInput = document.getElementById('visitDate');
    var timeInput = document.getElementById('visitTime');
    var notesInput = document.getElementById('visitNotes');

    var summaryCard = document.getElementById('requestSummaryCard');
    var summaryGrid = document.getElementById('requestSummaryGrid');
    var editBtn = document.getElementById('editRequestBtn');
    var copyBtn = document.getElementById('copyRequestBtn');
    var downloadBtn = document.getElementById('downloadRequestBtn');
    var copyFeedback = document.getElementById('copyFeedback');

    function getTodayISO() {
      var d = new Date();
      var y = d.getFullYear();
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return y + '-' + m + '-' + day;
    }

    if (dateInput) {
      dateInput.setAttribute('min', getTodayISO());
    }

    function populateBrands() {
      if (!brandSelect) return;
      brandSelect.innerHTML = '<option value="No brand preference">No brand preference / Jewellery selection</option>';
      brands.forEach(function (b) {
        var opt = document.createElement('option');
        opt.value = b.name;
        opt.textContent = b.name + ' (' + b.origin + ')';
        brandSelect.appendChild(opt);
      });
      if (global.VeronneUI) global.VeronneUI.refreshSelect(brandSelect);
    }

    function populateProducts(catFilter) {
      if (!productSelect) return;
      var currentVal = productSelect.value;
      productSelect.innerHTML = '<option value="General Collection Viewing">General Collection Viewing</option>';
      products.forEach(function (p) {
        if (!catFilter || catFilter === 'all' || p.category === catFilter) {
          var opt = document.createElement('option');
          opt.value = p.id;
          opt.textContent = p.name + ' (' + p.categoryLabel + ')';
          productSelect.appendChild(opt);
        }
      });
      if (currentVal && productSelect.querySelector('option[value="' + currentVal + '"]')) {
        productSelect.value = currentVal;
      }
      if (global.VeronneUI) global.VeronneUI.refreshSelect(productSelect);
    }

    function applyUrlPreselection() {
      var params = new URLSearchParams(global.location.search);
      var pid = params.get('product');
      var cat = params.get('category');
      var brandId = params.get('brand');
      var occasion = params.get('occasion');

      if (pid) {
        var match = products.find(function (p) { return p.id === pid; });
        if (match) {
          cat = match.category;
        }
      }

      if (cat && categorySelect && categorySelect.querySelector('option[value="' + cat + '"]')) {
        if (global.VeronneUI) {
          global.VeronneUI.setSelectValue(categorySelect, cat);
        } else {
          categorySelect.value = cat;
        }
        populateProducts(cat);
      }

      if (pid && productSelect && productSelect.querySelector('option[value="' + pid + '"]')) {
        if (global.VeronneUI) {
          global.VeronneUI.setSelectValue(productSelect, pid);
        } else {
          productSelect.value = pid;
        }
      }

      if (brandId) {
        var bMatch = brands.find(function (b) { return b.id === brandId || b.name.toLowerCase() === brandId.toLowerCase(); });
        if (bMatch && brandSelect) {
          if (global.VeronneUI) {
            global.VeronneUI.setSelectValue(categorySelect, 'watches');
            populateProducts('watches');
            global.VeronneUI.setSelectValue(brandSelect, bMatch.name);
          }
        }
      }

      if (occasion && notesInput && !notesInput.value) {
        notesInput.value = 'Enquiring regarding an occasion selection: ' + occasion + '.';
      }
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', function () {
        populateProducts(categorySelect.value);
      });
    }

    function setFieldError(inputEl, message) {
      var field = inputEl ? inputEl.closest('.form-field') : null;
      if (!field) return;
      var errEl = field.querySelector('.form-error');
      if (message) {
        field.classList.add('has-error');
        if (errEl) errEl.textContent = message;
      } else {
        field.classList.remove('has-error');
        if (errEl) errEl.textContent = '';
      }
    }

    function validateForm() {
      var valid = true;

      var nameVal = nameInput.value.trim();
      if (nameVal.length < 2) {
        setFieldError(nameInput, 'Please enter your full name.');
        valid = false;
      } else {
        setFieldError(nameInput, '');
      }

      var emailVal = emailInput.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal);
      if (!emailOk) {
        setFieldError(emailInput, 'Please enter a valid email address.');
        valid = false;
      } else {
        setFieldError(emailInput, '');
      }

      var phoneVal = phoneInput.value.trim();
      var digits = phoneVal.replace(/\D/g, '');
      var phoneOk = /^[+\d\s().-]{7,20}$/.test(phoneVal) && digits.length >= 7 && digits.length <= 15;
      if (!phoneOk) {
        setFieldError(phoneInput, 'Please enter a valid telephone number (7–15 digits).');
        valid = false;
      } else {
        setFieldError(phoneInput, '');
      }

      var dateVal = dateInput.value;
      var today = getTodayISO();
      if (!dateVal) {
        setFieldError(dateInput, 'Please choose a preferred visit date.');
        valid = false;
      } else if (dateVal < today) {
        setFieldError(dateInput, 'Past dates cannot be selected. Please choose today or a future date.');
        valid = false;
      } else {
        setFieldError(dateInput, '');
      }

      if (!timeInput.value) {
        setFieldError(timeInput, 'Please select a preferred arrival time.');
        valid = false;
      } else {
        setFieldError(timeInput, '');
      }

      if (!categorySelect.value) {
        setFieldError(categorySelect, 'Please choose a product category.');
        valid = false;
      } else {
        setFieldError(categorySelect, '');
      }

      if (!purposeSelect.value) {
        setFieldError(purposeSelect, 'Please select the purpose of your visit.');
        valid = false;
      } else {
        setFieldError(purposeSelect, '');
      }

      return valid;
    }

    function collectData() {
      var selectedProdOpt = productSelect.options[productSelect.selectedIndex];
      var selectedCatOpt = categorySelect.options[categorySelect.selectedIndex];
      return {
        fullName: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        category: selectedCatOpt ? selectedCatOpt.textContent : categorySelect.value,
        productInterest: selectedProdOpt ? selectedProdOpt.textContent : productSelect.value,
        preferredBrand: brandSelect.value,
        purpose: purposeSelect.value,
        preferredDate: dateInput.value,
        preferredTime: timeInput.value,
        notes: notesInput.value.trim() || 'None provided'
      };
    }

    function formatPlainText(data) {
      return [
        'VERONNE — PREPARED SHOWROOM ENQUIRY',
        '=====================================',
        'Note: Prepared client-side for review; not yet transmitted.',
        '',
        'Full Name:         ' + data.fullName,
        'Email:             ' + data.email,
        'Phone:             ' + data.phone,
        'Category:          ' + data.category,
        'Product Interest:  ' + data.productInterest,
        'Preferred Brand:   ' + data.preferredBrand,
        'Purpose of Visit:  ' + data.purpose,
        'Preferred Date:    ' + data.preferredDate,
        'Preferred Time:    ' + data.preferredTime,
        'Additional Notes:  ' + data.notes
      ].join('\n');
    }

    var latestData = null;

    function renderSummary(data) {
      latestData = data;
      var fields = [
        ['Full Name', data.fullName],
        ['Email', data.email],
        ['Phone', data.phone],
        ['Category', data.category],
        ['Product Interest', data.productInterest],
        ['Preferred Brand', data.preferredBrand],
        ['Purpose of Visit', data.purpose],
        ['Preferred Date & Time', data.preferredDate + ' at ' + data.preferredTime],
        ['Additional Notes', data.notes]
      ];

      summaryGrid.innerHTML = '';
      fields.forEach(function (pair) {
        var div = document.createElement('div');
        div.className = 'request-summary-item';
        var strong = document.createElement('strong');
        strong.textContent = pair[0];
        var span = document.createElement('span');
        span.textContent = pair[1];
        div.appendChild(strong);
        div.appendChild(span);
        summaryGrid.appendChild(div);
      });

      summaryCard.hidden = false;
      summaryCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) {
        var firstErr = form.querySelector('.has-error input, .has-error button, .has-error textarea');
        if (firstErr) firstErr.focus();
        return;
      }
      renderSummary(collectData());
    });

    if (editBtn) {
      editBtn.addEventListener('click', function () {
        summaryCard.hidden = true;
        nameInput.focus();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (!latestData) return;
        var text = formatPlainText(latestData);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            if (copyFeedback) copyFeedback.textContent = 'Request details copied to clipboard.';
          });
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          if (copyFeedback) copyFeedback.textContent = 'Request details copied to clipboard.';
        }
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', function () {
        if (!latestData) return;
        var blob = new Blob([formatPlainText(latestData)], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'veronne-showroom-enquiry.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    populateBrands();
    populateProducts('all');
    applyUrlPreselection();
  });
})(window);
