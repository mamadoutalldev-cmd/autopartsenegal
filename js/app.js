/* ==========================================================
   APP — point d'entrée : initialisation au chargement de la page.
   Ne contient ni données, ni logique métier, ni rendu détaillé —
   juste le câblage de démarrage.
   Dépend de : data.js, ui.js, auth.js, router.js, cart.js
   (voir index.html pour l'ordre de chargement des scripts)
   ========================================================== */

function initCategories(){
  const catWrap = document.getElementById('cat-scroll');
  CATEGORIES.forEach((c,i)=>{
    const el = document.createElement('div');
    el.className = 'cat-chip' + (i===0?' active':'');
    el.innerHTML = `<div class="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="${c.ic}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span>${c.n}</span>`;
    el.onclick = ()=>{ document.querySelectorAll('.cat-chip').forEach(x=>x.classList.remove('active')); el.classList.add('active'); goTo('recherche'); };
    catWrap.appendChild(el);
  });
}

function initBrands(){
  const brandWrap = document.getElementById('brand-pills');
  BRANDS.forEach((b,i)=>{
    const el = document.createElement('div');
    el.className = 'pill' + (i===0?' active':'');
    el.textContent = b;
    el.onclick = ()=>{ document.querySelectorAll('#brand-pills .pill').forEach(x=>x.classList.remove('active')); el.classList.add('active'); };
    brandWrap.appendChild(el);
  });
}

/* Les listes (accueil, recherche, magasin) ne sont plus remplies ici :
   elles sont chargées à la première entrée sur chaque écran, avec un squelette
   pendant le chargement — voir ensureScreenData() / LIST_LOADERS dans ui.js. */

function initSearch(){
  document.getElementById('search-input').addEventListener('input', filterResults);
}

/* ---- SPLASH ---- */
/* Séquence : on attend que le logo soit décodé (sinon la carte apparaîtrait vide
   sur un réseau lent), on lance les animations d'entrée (classe .run), puis la barre
   progresse de 0 à 100 % pendant SPLASH_DURATION_MS, et l'écran se cache.
   La progression est volontairement "d'affichage" : elle sert à ce que le visiteur
   voie le splash. Pour l'accélérer ou la ralentir, ne changer que les constantes ci-dessous. */
const SPLASH_START_DELAY_MS = 300;  /* laisse apparaître le logo et la barre avant de démarrer */
const SPLASH_DURATION_MS = 3200;    /* durée de la progression de 0 % à 100 % */
const SPLASH_HOLD_MS = 250;         /* pause à 100 % avant de disparaître */
const SPLASH_REDUCED_MS = 500;      /* durée si l'utilisateur a demandé moins d'animations */
const SPLASH_MAX_WAIT_MS = 3000;    /* on n'attend jamais plus longtemps le logo */

function splashEase(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }  /* accélère puis ralentit */

function runSplash(onDone){
  const splash = document.getElementById('splash');
  const logo = splash.querySelector('.splash-logo-img');
  const fill = splash.querySelector('.splash-bar-fill');
  const pct = document.getElementById('splash-percent');   /* optionnel */
  const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduced ? SPLASH_REDUCED_MS : SPLASH_DURATION_MS;
  const delay = reduced ? 0 : SPLASH_START_DELAY_MS;
  let started = false;
  let finished = false;

  const setProgress = (p) => {
    if(fill) fill.style.transform = 'scaleX(' + p + ')';
    if(pct) pct.textContent = Math.round(p * 100) + '%';
  };

  const finish = () => {
    if(finished) return;
    finished = true;
    setTimeout(()=>{ splash.classList.add('hide'); onDone(); }, SPLASH_HOLD_MS);
  };

  const start = () => {
    if(started) return;
    started = true;
    splash.classList.add('run');
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - t0 - delay) / duration));
      setProgress(splashEase(t));
      if(t < 1) requestAnimationFrame(tick);
      else finish();
    };
    requestAnimationFrame(tick);
  };

  const logoReady = (logo && logo.decode) ? logo.decode().catch(()=>{}) : Promise.resolve();
  Promise.race([logoReady, new Promise(r=>setTimeout(r, SPLASH_MAX_WAIT_MS))]).then(start);
}
/* ---- /SPLASH ---- */

function initApp(){
  initCategories();
  initBrands();
  initSearch();
  initGliders();
  initNetworkStatus();

  document.getElementById('bottom-nav').style.display = 'none';
  document.getElementById('header-actions-el').style.display = 'none';

  runSplash(()=>{
    const session = getSession();
    if(session && TEST_ACCOUNTS[session.email]){
      routeToSpace(session.role, session.name, session.email);
    } else {
      goTo('login');
    }
  });
}

/* DOMContentLoaded (et non "load") : on n'attend plus la fin du chargement des
   polices Google pour démarrer, ce qui allongeait le splash sur réseau lent. */
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initApp);
else initApp();
