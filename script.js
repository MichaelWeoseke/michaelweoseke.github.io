// Small helpers for the page: builds the video grid, plays clips on tap,
// reveals sections as you scroll, and assembles the email link.
(function () {
  'use strict';

  // Lets the CSS hide sections until they scroll in. Without JavaScript,
  // everything just shows normally.
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Video cards ----------

  function makeCard(item, extraClass) {
    var card = document.createElement('figure');
    card.className = 'clip' + (extraClass ? ' ' + extraClass : '');

    var media = document.createElement('div');
    media.className = 'clip-media';

    if (item.file) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'clip-play';
      btn.setAttribute('aria-label', 'Play ' + item.title);

      if (item.cover) {
        var img = document.createElement('img');
        img.src = 'images/' + item.cover;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        btn.appendChild(img);
      }
      var icon = document.createElement('span');
      icon.className = 'play-icon';
      icon.setAttribute('aria-hidden', 'true');
      btn.appendChild(icon);

      btn.addEventListener('click', function () { playIn(media, item); });
      media.appendChild(btn);
    } else {
      var soon = document.createElement('span');
      soon.className = 'clip-soon';
      soon.textContent = 'Coming soon';
      media.appendChild(soon);
    }

    var cap = document.createElement('figcaption');
    var t = document.createElement('span');
    t.className = 'clip-title';
    t.textContent = item.title;
    cap.appendChild(t);
    if (item.type) {
      var ty = document.createElement('span');
      ty.className = 'clip-type';
      ty.textContent = item.type;
      cap.appendChild(ty);
    }

    card.appendChild(media);
    card.appendChild(cap);
    return card;
  }

  // Swap the cover image for a real video player, only when tapped,
  // so the page doesn't download every video up front.
  function playIn(media, item) {
    var v = document.createElement('video');
    v.src = 'videos/' + item.file;
    if (item.cover) v.poster = 'images/' + item.cover;
    v.controls = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.addEventListener('play', function () {
      document.querySelectorAll('video').forEach(function (other) {
        if (other !== v) other.pause();
      });
    });
    media.replaceChildren(v);
    v.play().catch(function () { /* user can press play themselves */ });
  }

  // ---------- Scroll reveal ----------

  function setUpReveal() {
    var els = document.querySelectorAll('.rv');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- Email (assembled here so spam bots can't read it easily) ----------

  function setUpEmail() {
    document.querySelectorAll('[data-user][data-domain]').forEach(function (a) {
      var addr = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
      a.href = 'mailto:' + addr;
      var label = a.querySelector('.email-text');
      if (label) label.textContent = addr;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var reel = document.getElementById('showreel');
    if (reel) {
      if (window.SHOWREEL && window.SHOWREEL.file) reel.appendChild(makeCard(window.SHOWREEL, 'clip-reel'));
      else reel.remove();
    }

    var grid = document.getElementById('work-grid');
    if (grid && window.VIDEOS) {
      window.VIDEOS.forEach(function (item, i) {
        var card = makeCard(item);
        card.classList.add('rv');
        card.style.transitionDelay = (i % 3) * 0.12 + 's';
        grid.appendChild(card);
      });
    }

    setUpEmail();
    setUpReveal();

    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
