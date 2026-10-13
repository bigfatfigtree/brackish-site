// BRACKISH — minimal interactions: mobile nav, search overlay, archive filter, footer year.
(function(){
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  var burger = document.getElementById('hamburger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    burger.addEventListener('click', function(){
      var open = nav.style.display === 'flex';
      nav.style.display = open ? '' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '76px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#F5F0E3';
      nav.style.padding = '20px 24px';
      nav.style.borderBottom = '1px solid #DCD3BC';
      if (open) nav.removeAttribute('style');
    });
  }

  // Search overlay
  var overlay = document.getElementById('searchOverlay');
  var openers = document.querySelectorAll('[data-search-open]');
  var closer = document.getElementById('searchClose');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var index = [
    {t:'The 757 in 4 Minutes — Oct 13 Issue', u:'issues/2026-10-13.html', c:'Flagship'},
    {t:'Brackish On Stage — Oct 16 Issue', u:'issues/2026-10-16.html', c:'Music'},
    {t:'The Best Waterfront Spots (That Locals Actually Go To)', u:'guides/waterfront.html', c:'Food + Drink'},
    {t:'The Next Wave — Hampton Roads Change-Makers', u:'spotlight.html', c:'People'},
    {t:'A More Colorful Coast — The Mural Movement', u:'stories/murals.html', c:'Culture'},
    {t:'Get the Spotlight — Nominate Yourself', u:'submit.html', c:'Spotlight'},
    {t:'Advertise with Brackish', u:'advertise.html', c:'Business'}
  ];
  function doSearch(q){
    q = q.trim().toLowerCase();
    if (!q || !results) { if (results) results.innerHTML=''; return; }
    var hits = index.filter(function(i){ return i.t.toLowerCase().indexOf(q) > -1; });
    results.innerHTML = hits.length
      ? hits.map(function(i){ return '<a href="'+i.u+'">'+i.t+' <span style="opacity:.55;font-size:13px">· '+i.c+'</span></a>'; }).join('')
      : '<p style="color:#B9B2A1;padding:12px 0">Nothing found. Try "music", "food", or "spotlight".</p>';
  }
  openers.forEach(function(b){
    b.addEventListener('click', function(){
      if (!overlay) return;
      overlay.classList.add('open');
      setTimeout(function(){ if (input) input.focus(); }, 50);
    });
  });
  if (closer) closer.addEventListener('click', function(){ overlay.classList.remove('open'); });
  if (overlay) overlay.addEventListener('click', function(e){ if (e.target === overlay) overlay.classList.remove('open'); });
  if (input) input.addEventListener('input', function(){ doSearch(input.value); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && overlay) overlay.classList.remove('open'); });

  // Archive category filter (?cat= / buttons)
  var items = document.querySelectorAll('.archive-item[data-cat]');
  var btns = document.querySelectorAll('.filter-btn');
  function setFilter(cat){
    items.forEach(function(it){
      it.classList.toggle('hidden', cat !== 'all' && it.getAttribute('data-cat') !== cat);
    });
    btns.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-filter') === cat); });
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ setFilter(b.getAttribute('data-filter')); }); });
  if (items.length) {
    var params = new URLSearchParams(window.location.search);
    setFilter(params.get('cat') || 'all');
  }
})();
