document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var dropdownParents = document.querySelectorAll('.has-dropdown');
  dropdownParents.forEach(function (dropdownParent) {
    var dropdownLink = dropdownParent.querySelector('a.nav-link');
    dropdownLink.addEventListener('click', function (e) {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        dropdownParent.classList.toggle('is-open');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-active');
      dropdownParents.forEach(function (dropdownParent) {
        dropdownParent.classList.remove('is-open');
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.stat .num, .hero-stat-card .num');
  if (!counters.length) return;

  counters.forEach(function (el) {
    var match = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (!match) return;
    el.dataset.target = match[1];
    el.dataset.suffix = match[2];
    el.textContent = '0' + match[2];
  });

  function animateCountUp(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix;
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { observer.observe(el); });
  } else {
    counters.forEach(animateCountUp);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var columnCards = document.querySelectorAll('.column-card');
  if (!filterBtns.length || !columnCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var cat = btn.dataset.filter;
      columnCards.forEach(function (card) {
        var match = cat === 'all' || card.dataset.category === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var telButtons = document.querySelectorAll('.tel-reveal');
  telButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (btn.dataset.revealed !== 'true') {
        e.preventDefault();
        var phone = btn.dataset.phone;
        btn.textContent = '📞 ' + phone;
        btn.href = 'tel:' + phone.replace(/-/g, '');
        btn.dataset.revealed = 'true';
      }
    });
  });
});
