// k-mathews.com — small progressive enhancements. Everything works without this file.
(function () {
  'use strict';

  // Theme toggle. The initial theme is set inline in <head> to avoid a flash.
  function currentTheme() {
    var set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function labelToggles() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      b.setAttribute('title', 'Switch to ' + next + ' theme');
    });
  }
  document.querySelectorAll('.theme-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      labelToggles();
    });
  });
  labelToggles();

  var prose = document.querySelector('.prose');

  // Code blocks: header with language or filename, and a copy button.
  // A filename comes from a kramdown attribute after the fence: {: data-file="syscall_lat.bpf.c"}
  var LANGS = { c: 'C', cpp: 'C++', python: 'Python', py: 'Python', go: 'Go', rust: 'Rust', shell: 'shell', sh: 'shell', bash: 'shell', console: 'shell', text: 'output', plaintext: 'text', yaml: 'YAML', json: 'JSON', r: 'R', java: 'Java' };
  if (prose) {
    prose.querySelectorAll('div.highlighter-rouge').forEach(function (block) {
      var code = block.querySelector('pre code') || block.querySelector('pre');
      if (!code) return;
      var m = block.className.match(/language-([\w+-]+)/);
      var lang = m ? (LANGS[m[1]] || m[1]) : 'code';
      var file = block.getAttribute('data-file');

      var head = document.createElement('div');
      head.className = 'code-head';
      var cap = document.createElement('span');
      if (file) {
        var f = document.createElement('span');
        f.className = 'file';
        f.textContent = file;
        var l = document.createElement('span');
        l.className = 'lang';
        l.textContent = lang;
        cap.appendChild(f);
        cap.appendChild(l);
      } else {
        cap.textContent = lang;
      }
      head.appendChild(cap);

      if (navigator.clipboard) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-btn';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"></path></svg><span>Copy</span>';
        btn.addEventListener('click', function () {
          navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(function () {
            btn.classList.add('copied');
            btn.querySelector('span').textContent = 'Copied';
            btn.setAttribute('aria-label', 'Copied to clipboard');
            setTimeout(function () {
              btn.classList.remove('copied');
              btn.querySelector('span').textContent = 'Copy';
              btn.setAttribute('aria-label', 'Copy code to clipboard');
            }, 1600);
          });
        });
        head.appendChild(btn);
      }
      block.insertBefore(head, block.firstChild);

      var pre = block.querySelector('pre');
      if (pre) {
        pre.setAttribute('tabindex', '0');
        pre.setAttribute('aria-label', (file || lang) + ' code');
      }
    });

    // Tables scroll inside their own box on narrow screens.
    prose.querySelectorAll('table').forEach(function (t) {
      if (t.parentElement.classList.contains('table-wrap')) return;
      var w = document.createElement('div');
      w.className = 'table-wrap';
      w.setAttribute('tabindex', '0');
      w.setAttribute('role', 'region');
      w.setAttribute('aria-label', 'Table, scrolls horizontally');
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });

    // Heading anchors.
    prose.querySelectorAll('h2[id], h3[id]').forEach(function (h) {
      var a = document.createElement('a');
      a.className = 'heading-anchor';
      a.href = '#' + h.id;
      a.textContent = '#';
      a.setAttribute('aria-label', 'Link to section: ' + h.textContent);
      h.appendChild(a);
    });
  }

  // Contents: mark the section being read.
  var tocLinks = document.querySelectorAll('.toc-rail a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
    var visible = {};
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var ids = Object.keys(byId);
      var current = null;
      for (var i = 0; i < ids.length; i++) { if (visible[ids[i]]) { current = ids[i]; break; } }
      if (!current) return;
      tocLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
      byId[current].setAttribute('aria-current', 'true');
    }, { rootMargin: '0px 0px -70% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  // Writing index: filter by tag. Without JS every article is listed.
  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    var items = document.querySelectorAll('[data-tags]');
    var years = document.querySelectorAll('[data-year]');
    var empty = document.querySelector('.empty');
    var apply = function (tag, push) {
      var shown = 0;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === tag ? 'true' : 'false'); });
      items.forEach(function (it) {
        var on = tag === 'all' || (' ' + it.getAttribute('data-tags') + ' ').indexOf(' ' + tag + ' ') >= 0;
        it.hidden = !on;
        if (on) shown++;
      });
      years.forEach(function (y) { y.hidden = !y.querySelector('[data-tags]:not([hidden])'); });
      if (empty) empty.hidden = shown > 0;
      if (push) {
        var url = new URL(window.location.href);
        if (tag === 'all') url.searchParams.delete('tag'); else url.searchParams.set('tag', tag);
        history.replaceState(null, '', url);
      }
    };
    filters.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-filter'), true); }); });
    document.querySelectorAll('[data-pick]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        apply(a.getAttribute('data-pick'), true);
        window.scrollTo({ top: 0 });
      });
    });
    var start = new URL(window.location.href).searchParams.get('tag');
    var known = Array.prototype.some.call(filters, function (b) { return b.getAttribute('data-filter') === start; });
    apply(known ? start : 'all', false);
  }
})();
