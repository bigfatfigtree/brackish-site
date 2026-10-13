// BRACKISH — minimal interactions: mobile nav, search overlay, archive filter, footer year.
(function(){
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // live date in topbar
  document.querySelectorAll('.js-date').forEach(function(el){
    el.textContent = new Date().toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'}).toUpperCase();
  });

  // Mobile nav
  var burger = document.getElementById('hamburger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    burger.addEventListener('click', function(){
      var open = nav.style.display === 'flex';
      if (open) { nav.removeAttribute('style'); return; }
      var tb = document.querySelector('.topbar');
      var hdr = document.querySelector('.site-header');
      var top = (tb ? tb.offsetHeight : 0) + (hdr ? hdr.offsetHeight : 0);
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'fixed';
      nav.style.top = top + 'px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#F5F0E3';
      nav.style.padding = '20px 24px';
      nav.style.borderBottom = '1px solid #DCD3BC';
      nav.style.zIndex = '60';
    });
  }

  // Search overlay
  var overlay = document.getElementById('searchOverlay');
  var openers = document.querySelectorAll('[data-search-open]');
  var closer = document.getElementById('searchClose');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var index = [
    {t:'The 757\u2019s Most Famous Face: Vote in Round 1', u:'/faceoff.html', c:'Faceoff'},
    {t:'Matchbox Twenty\u2019s 30th Anniversary Tour Hits Virginia Beach July 3 \u2014 With the Wallflowers', u:'/music/matchbox-twenty-2027.html', c:'Music'},
    {t:'Friday Night Lights: Six of the State\u2019s Top Ten Are From the 757', u:'/sports/hs-football-week8.html', c:'Sports'},
    {t:'The HRBT Eastbound Closes Friday Night. Plan Like It.', u:'/news/hrbt-closure.html', c:'Traffic'},
    {t:'Brackish On Stage: The Loudest Weekend of the Fall', u:'/music/on-stage-oct16.html', c:'Music'},
    {t:'Town Point Wine Fest: 200 Wines, Two Days, Zero Excuses', u:'/food/wine-fest.html', c:'Food + Drink'},
    {t:'Haynes Furniture Is Gone After 128 Years. The Take.', u:'/news/haynes-closing.html', c:'Opinion'},
    {t:'Norfolk State Just Won Back-to-Back for the First Time Since 2021', u:'/sports/nsu-win.html', c:'Sports'},
    {t:'AFI Brings 25 Years of Beautiful Darkness to the NorVa Tonight', u:'/music/afi-norva.html', c:'Music'},
    {t:'Movements on Halloween: The Only Correct Plan for Oct 31', u:'/music/halloween-movements.html', c:'Music'},
    {t:'Earl Sweatshirt, Oct 27: The Lyricist\u2019s Lyricist Hits the NorVa', u:'/music/earl-sweatshirt.html', c:'Music'},
    {t:'"The Heart Sellers": The Warmest Thing on a Local Stage', u:'/culture/heart-sellers.html', c:'Culture'},
    {t:'"Champagne & Sin": Norfolk\u2019s Burlesque Night Is Not Kidding Around', u:'/entertainment/burlesque.html', c:'Nightlife'},
    {t:'The Weekend Radar: Oct 16\u201318', u:'/events/weekend-radar.html', c:'Events'},
    {t:'Early Voting Is Open. The Lines Are Not.', u:'/news/voting.html', c:'News'},
    {t:'The Take: The 757 Doesn\u2019t Need Another Smash Burger. It Needs Later Hours.', u:'/news/night-shift.html', c:'Opinion'},
    {t:'The Best Free Seat in Norfolk: The Harrison Opera House Lawn', u:'/outdoors/harrison-lawn.html', c:'Outdoors'},
    {t:'Marketplace Gold: The $200 Chesapeake Time Machine', u:'/fun/marketplace-gold.html', c:'Fun'},
    {t:'The Brackish Spotlight: Five Questions with the Founder', u:'/spotlight.html', c:'People'},
    {t:'The Best Waterfront Spots (That Locals Actually Go To)', u:'/guides/waterfront.html', c:'Food + Drink'},
    {t:'A More Colorful Coast: The 757\u2019s Mural Movement', u:'/stories/murals.html', c:'Culture'},
    {t:'Brackish On Stage: The NorVa\u2019s October Run — Oct 16 Issue', u:'/issues/2026-10-16.html', c:'Music'},
    {t:'The Tuesday Briefing: Launch Edition — Oct 13 Issue', u:'/issues/2026-10-13.html', c:'Flagship'},
    {t:'Get the Spotlight — Nominate Yourself', u:'/submit.html', c:'Spotlight'},
    {t:'Advertise with Brackish', u:'/advertise.html', c:'Business'}
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

  // Archive category + region filter (?cat= / ?region= / buttons)
  var items = document.querySelectorAll('#archiveGrid [data-cat]');
  var btns = document.querySelectorAll('#filterBar button');
  var rbtns = document.querySelectorAll('#regionBar button');
  var count = document.getElementById('resultCount');
  var curCat = 'all', curRegion = 'all';
  function setFilter(cat, region){
    curCat = cat; curRegion = region;
    var shown = 0;
    items.forEach(function(it){
      var hideCat = cat !== 'all' && it.getAttribute('data-cat').split(' ').indexOf(cat) === -1;
      var rgs = (it.getAttribute('data-region') || '').split(' ');
      var hideReg = region !== 'all' && rgs.indexOf(region) === -1;
      var hide = hideCat || hideReg;
      it.classList.toggle('hidden', hide);
      if (!hide) shown++;
    });
    btns.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-filter') === cat); });
    rbtns.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-region') === region); });
    if (count) count.textContent = shown + (shown === 1 ? ' story' : ' stories');
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ setFilter(b.getAttribute('data-filter'), curRegion); }); });
  rbtns.forEach(function(b){ b.addEventListener('click', function(){ setFilter(curCat, b.getAttribute('data-region')); }); });
  if (items.length) {
    var params = new URLSearchParams(window.location.search);
    setFilter(params.get('cat') || 'all', params.get('region') || 'all');
  }
})();

/* Newsletter form: AJAX submit, no page navigation */
(function(){
  var form = document.querySelector('.news-form');
  if (!form) return;
  // status line for inline feedback
  var status = document.createElement('p');
  status.className = 'news-status';
  status.style.cssText = 'font-size:14px;margin-top:10px;min-height:20px;color:#B9B2A1';
  form.appendChild(status);
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var email = form.querySelector('input[name="email"]');
    if (!email || !email.value) return;
    if (btn) { btn.disabled = true; btn.textContent = 'JOINING…'; }
    status.textContent = '';
    var data = new URLSearchParams(new FormData(form)).toString();
    fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:data})
      .then(function(r){ if(!r.ok) throw new Error('net'); window.location.href = '/thanks.html'; })
      .catch(function(){
        if (btn) { btn.disabled = false; btn.innerHTML = 'SUBSCRIBE &rarr;'; }
        status.textContent = "Hmm — signups are taking a quick break. Please try again in a bit.";
      });
  });
})();
