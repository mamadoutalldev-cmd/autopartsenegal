/* ==========================================================
   UI — fonctions de rendu / affichage (aucune donnée, aucune
   règle de session ici — uniquement comment les choses s'affichent)
   Dépend de : data.js (PARTS), router.js (goTo), cart.js (currentProduct)
   Utilisé par : app.js (initialisation), router.js (ensureScreenData, initReveal), les onclick du HTML
   ========================================================== */

function fmtPrice(p){ return p.toLocaleString('fr-FR').replace(/,/g,' ') + ' FCFA'; }

function showToast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

function cardHTML(p, idx){
  return `<div class="card" onclick="openProduct(${idx})">
    <div class="thumb">
      <span class="avail ${p.avail?'ok':'no'}">${p.avail?'Disponible':'Rupture'}</span>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M4 16.5V13l1.6-4.5A2 2 0 0 1 7.5 7h9a2 2 0 0 1 1.9 1.5L20 13v3.5" stroke="#B7C1D1" stroke-width="1.4"/></svg>
    </div>
    <div class="body">
      <div class="name">${p.name}</div>
      <div class="compat">${p.compat}</div>
      <div class="price">${fmtPrice(p.price)}</div>
      <div class="loc"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" stroke="currentColor" stroke-width="2"/></svg>${p.loc}</div>
    </div>
  </div>`;
}

function rowHTML(p, idx){
  return `<div class="row-card" onclick="openProduct(${idx})">
    <div class="thumb"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 16.5V13l1.6-4.5A2 2 0 0 1 7.5 7h9a2 2 0 0 1 1.9 1.5L20 13v3.5" stroke="#B7C1D1" stroke-width="1.4"/></svg></div>
    <div class="info">
      <div class="name">${p.name}</div>
      <div class="compat">${p.compat}</div>
      <div class="bottom">
        <span class="price">${fmtPrice(p.price)}</span>
        <span class="avail ${p.avail?'ok':'no'}">${p.avail?'Disponible':'Rupture'}</span>
      </div>
    </div>
  </div>`;
}

function renderSearch(list){
  const wrap = document.getElementById('search-list');
  const empty = document.getElementById('empty-state');
  document.getElementById('result-count').textContent = list.length + (list.length>1?' résultats':' résultat');
  if(list.length===0){ wrap.innerHTML=''; wrap.style.display='none'; empty.style.display='block'; return; }
  wrap.style.display='flex'; empty.style.display='none';
  wrap.innerHTML = list.map((p)=>rowHTML(p, PARTS.indexOf(p))).join('');
}

function filterResults(){
  const q = document.getElementById('search-input').value.toLowerCase();
  const filtered = PARTS.filter(p => (p.name+' '+p.compat).toLowerCase().includes(q));
  renderSearch(filtered);
}

function openProduct(idx){
  const p = PARTS[idx];
  currentProduct = p;
  document.getElementById('p-name').textContent = p.name;
  document.getElementById('p-ref').textContent = 'Réf. ' + p.ref;
  document.getElementById('p-price').textContent = fmtPrice(p.price);
  document.getElementById('p-compat').textContent = p.compat;
  document.getElementById('p-etat').textContent = p.etat;
  document.getElementById('p-loc').textContent = p.loc;
  document.getElementById('p-vendeur').textContent = p.vendeur;
  const av = document.getElementById('p-avail');
  av.textContent = p.avail ? 'Disponible' : 'Rupture';
  av.className = 'avail ' + (p.avail?'ok':'no');
  document.getElementById('p-tags').innerHTML = p.compat.split(',').map(t=>`<span>${t.trim()}</span>`).join('');
  goTo('produit');
}

function vendorTab(el, tab){
  document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('vendor-produits').style.display = tab==='produits' ? 'block' : 'none';
  document.getElementById('vendor-commandes').style.display = tab==='commandes' ? 'block' : 'none';
}

function publishListing(){
  showToast('Pièce publiée avec succès ✓');
  setTimeout(()=>goTo('vendeur'), 700);
}

/* ==========================================================
   APPARITION AU SCROLL (scroll reveal)
   - Les éléments listés dans REVEAL_SELECTOR reçoivent la classe .reveal (opacité 0)
     puis .is-visible quand ils entrent dans la zone visible.
   - Le conteneur qui défile est #main (pas .phone : .phone est seulement le cadre,
     en overflow:hidden, il ne défile jamais) : c'est donc #main qui sert de "root".
   - Appelée par router.js à chaque changement d'écran, et par loadList() après
     l'injection de nouvelles cartes. Peut être rappelée autant de fois que nécessaire.
   ========================================================== */
const REVEAL_SELECTOR = '.card, .row-card, .cart-item, .order-item, .stat-card, .admin-stat, .profile-card, .welcome-banner, .section-title';
let revealObserver = null;

function getRevealObserver(){
  if(revealObserver) return revealObserver;
  if(typeof IntersectionObserver === 'undefined') return null;   /* vieux navigateur : pas d'animation */
  revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);                    /* une seule fois par passage */
    });
  }, {
    root: document.getElementById('main'),
    rootMargin: '0px 0px -6% 0px',                               /* déclenche un peu avant le bord bas */
    threshold: 0.08
  });
  return revealObserver;
}

function initReveal(scope){
  const root = scope || document.getElementById('main');
  const io = getRevealObserver();
  root.querySelectorAll(REVEAL_SELECTOR).forEach((el, i)=>{
    el.classList.add('reveal');
    el.classList.remove('is-visible');                           /* permet de rejouer l'animation */
    el.style.setProperty('--reveal-delay', Math.min(i, 7) * 45 + 'ms');   /* cascade légère, plafonnée */
    if(io) io.observe(el);
    else el.classList.add('is-visible');
  });
}

/* ==========================================================
   SQUELETTES DE CHARGEMENT
   renderProductSkeleton(count, variant) renvoie le HTML de `count` squelettes :
     variant 'card' (défaut) = grille, comme .card ;  'row' = liste, comme .row-card.
   ========================================================== */
function renderProductSkeleton(count = 4, variant = 'card'){
  const one = variant === 'row'
    ? `<div class="skeleton-card skeleton-card--row" aria-hidden="true">
         <div class="skeleton-image"></div>
         <div class="skeleton-body">
           <div class="skeleton-text skeleton-text--title"></div>
           <div class="skeleton-text skeleton-text--sub"></div>
           <div class="skeleton-text skeleton-text--price"></div>
         </div>
       </div>`
    : `<div class="skeleton-card" aria-hidden="true">
         <div class="skeleton-image"></div>
         <div class="skeleton-body">
           <div class="skeleton-text skeleton-text--title"></div>
           <div class="skeleton-text skeleton-text--sub"></div>
           <div class="skeleton-text skeleton-text--price"></div>
           <div class="skeleton-text skeleton-text--loc"></div>
         </div>
       </div>`;
  return one.repeat(Math.max(0, count));
}

/* ==========================================================
   CHARGEMENT DES LISTES : squelette -> contenu réel
   - Le squelette s'affiche à la PREMIÈRE entrée sur l'écran, puis le contenu le remplace.
   - Les données sont pour l'instant locales (PARTS). SKELETON_DEMO_DELAY_MS ajoute une
     attente artificielle pour que le squelette soit visible dans le prototype.
     ⚠ À METTRE À 0 dès que les données viennent d'une vraie API : le squelette ne
     restera alors affiché que le temps réel de la requête.
   - Pour brancher l'API : remplacer `load` par une fonction qui renvoie une Promise.
   ========================================================== */
const SKELETON_DEMO_DELAY_MS = 450;
const loadedLists = new Set();

const LIST_LOADERS = {
  accueil:{
    key:'home', container:'home-grid',
    skeleton:()=>renderProductSkeleton(4),
    load:()=>PARTS.slice(0,4),
    render:(el, items)=>{ el.innerHTML = items.map(p=>cardHTML(p, PARTS.indexOf(p))).join(''); }
  },
  recherche:{
    key:'search', container:'search-list',
    skeleton:()=>renderProductSkeleton(4, 'row'),
    load:()=>PARTS,
    render:()=>{ filterResults(); }          /* applique aussi la recherche déjà saisie */
  },
  vendeur:{
    key:'vendor', container:'vendor-grid',
    skeleton:()=>renderProductSkeleton(3),
    load:()=>PARTS.slice(0,3),
    render:(el, items)=>{ el.innerHTML = items.map(p=>cardHTML(p, PARTS.indexOf(p))).join(''); }
  }
};

function loadList(cfg){
  if(loadedLists.has(cfg.key)) return;
  loadedLists.add(cfg.key);
  const el = document.getElementById(cfg.container);
  el.setAttribute('aria-busy', 'true');
  el.innerHTML = cfg.skeleton();
  const pause = new Promise(r => setTimeout(r, SKELETON_DEMO_DELAY_MS));
  Promise.all([Promise.resolve().then(cfg.load), pause])
    .then(([data])=>{
      cfg.render(el, data);
      el.removeAttribute('aria-busy');
      initReveal(el);
    })
    .catch(()=>{
      loadedLists.delete(cfg.key);
      el.removeAttribute('aria-busy');
      el.innerHTML = `<div class="empty-state"><p>Impossible de charger les pièces.</p>
        <button class="btn btn-secondary" onclick="retryList('${cfg.key}')">Réessayer</button></div>`;
    });
}

function retryList(key){
  const cfg = Object.values(LIST_LOADERS).find(c => c.key === key);
  if(cfg){ loadedLists.delete(key); loadList(cfg); }
}

/* Appelée par router.js à chaque changement d'écran. */
function ensureScreenData(name){
  if(LIST_LOADERS[name]) loadList(LIST_LOADERS[name]);
}

/* ==========================================================
   PASTILLE EN VERRE QUI GLISSE (onglets Connexion/Inscription, onglets de rôle, barre du bas)
   - Un seul élément .glider est créé par groupe ; il se place derrière l'élément ".active".
   - On ne touche pas à auth.js / router.js : un MutationObserver regarde les changements
     de classe, donc elle suit n'importe quel code qui déplace ".active".
   - Un ResizeObserver la replace (sans animation) si le groupe change de taille, ou s'il passe
     de caché à visible (la barre du bas est cachée avant la connexion).
   - Appelée une fois par app.js (initGliders).
   ========================================================== */
const GLIDERS = [
  { selector:'.auth-tabs',  item:'.auth-tab',  insetX:0, insetY:0 },
  { selector:'#role-tabs',  item:'.role-tab',  insetX:0, insetY:0 },
  { selector:'#bottom-nav', item:'.nav-item',  insetX:8, insetY:5, variant:'nav' }
];

function setupGlider(cfg){
  const box = document.querySelector(cfg.selector);
  if(!box || Array.from(box.children).some(c => c.classList.contains('glider'))) return;

  const glider = document.createElement('div');
  glider.className = 'glider' + (cfg.variant ? ' glider--' + cfg.variant : '');
  glider.setAttribute('aria-hidden', 'true');
  box.insertBefore(glider, box.firstChild);
  box.classList.add('has-glider');

  let placedOnce = false;
  let wasHidden = true;

  function place(forceInstant){
    const b = box.getBoundingClientRect();
    if(!(b.width > 0 && b.height > 0)){ wasHidden = true; return; }     /* groupe caché : on attend */
    const active = box.querySelector(cfg.item + '.active');
    if(!active){ glider.classList.remove('is-on'); return; }

    const instant = forceInstant || wasHidden || !placedOnce;
    if(instant) glider.classList.add('no-anim');

    const a = active.getBoundingClientRect();
    const x = a.left - b.left - box.clientLeft + cfg.insetX;
    const y = a.top  - b.top  - box.clientTop  + cfg.insetY;
    glider.style.width  = (a.width  - 2 * cfg.insetX) + 'px';
    glider.style.height = (a.height - 2 * cfg.insetY) + 'px';
    glider.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    glider.classList.add('is-on');

    if(instant){
      void glider.offsetWidth;                  /* force le calcul de style : le saut ne s'anime pas */
      glider.classList.remove('no-anim');
    }
    placedOnce = true;
    wasHidden = false;
  }

  /* Les changements de classe de la pastille elle-même ne doivent pas relancer place() (boucle infinie) */
  new MutationObserver((records)=>{
    if(records.every(r => r.target === glider)) return;
    place(false);
  }).observe(box, { attributes:true, attributeFilter:['class'], subtree:true });

  if(typeof ResizeObserver !== 'undefined') new ResizeObserver(()=>place(true)).observe(box);
  else window.addEventListener('resize', ()=>place(true));

  place(true);
}

function initGliders(){ GLIDERS.forEach(setupGlider); }
