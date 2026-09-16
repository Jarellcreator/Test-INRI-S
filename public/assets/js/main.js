/* =====================================================================
   INRI'S FORMATIONS — Interactions de la page d'accueil
   Sans dépendance. Tout est dégradable : sans JS la page reste lisible.
   ===================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------ Header : état « collé » au scroll ------------------ */
  var header = document.getElementById('header');

  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 12);
  }

  if (header) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------------------------- Menu mobile -------------------------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Le menu mobile disparaît au-delà du point de rupture : on remet à zéro.
    window.matchMedia('(min-width: 901px)').addEventListener('change', closeNav);
  }

  /* ---------------------------- Accordéon FAQ ---------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.acc__btn'), function (btn) {
    btn.addEventListener('click', function () {
      var acc = btn.closest('.acc');
      var open = acc.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ----------- Révélation au scroll + compteurs + barre de progression ---- */
  var counted = new WeakSet();

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    if (reduced) {
      el.textContent = String(target);
      return;
    }

    var duration = 1300;
    var start = null;

    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // easeOutCubic : démarrage rapide, arrivée douce sur la valeur finale
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function activate(el) {
    el.classList.add('is-in');

    Array.prototype.forEach.call(el.querySelectorAll('[data-count]'), function (n) {
      if (counted.has(n)) return;
      counted.add(n);
      animateCount(n);
    });

    var bar = el.querySelector('.progress__bar');
    if (bar) bar.style.width = bar.getAttribute('data-progress') + '%';
  }

  var revealables = document.querySelectorAll('.reveal, .pathcard');

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, activate);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      activate(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  // Filet de sécurité : si l'observateur n'a pas pu se déclencher (ancre suivie
  // au chargement, onglet en arrière-plan, défilement très rapide), on révèle
  // ce qui reste. Rien ne doit pouvoir rester invisible.
  window.setTimeout(function () {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal:not(.is-in)'), function (el) {
      el.style.transitionDelay = '0ms';
      activate(el);
      io.unobserve(el);
    });
  }, 3000);

  Array.prototype.forEach.call(revealables, function (el, i) {
    // Léger décalage en cascade pour les éléments d'une même grille
    var parent = el.parentElement;
    if (parent && (parent.classList.contains('cards') || parent.classList.contains('method') || parent.classList.contains('quotes') || parent.classList.contains('faq'))) {
      var index = Array.prototype.indexOf.call(parent.children, el);
      el.style.transitionDelay = Math.min(index * 70, 350) + 'ms';
    }
    io.observe(el);
  });

  /* --------------------- Arrivée sur une ancre externe --------------------
     Quand on arrive depuis une autre page avec une ancre (#formations), le
     navigateur positionne la page dès l'analyse du HTML. Les polices et les
     sections qui apparaissent au défilement modifient ensuite la hauteur, et
     l'ancre se retrouve décalée. On repositionne une fois tout chargé. */
  if (window.location.hash) {
    window.addEventListener('load', function () {
      var cible;
      try {
        cible = document.querySelector(window.location.hash);
      } catch (e) {
        return; // fragment qui n'est pas un sélecteur valide
      }
      // Repositionnement instantané : un défilement animé ferait voir la
      // page se recaler toute seule une seconde après l'arrivée.
      if (cible) cible.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  }

  /* ----------------------------- Année footer ---------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
