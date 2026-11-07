/* ==========================================================
   ROUTER — navigation entre les écrans de l'app (SPA à écran unique)
   Dépend de : auth.js (guardedGoTo), cart.js (renderCart), ui.js (ensureScreenData, initReveal)
   Utilisé par : tous les onclick="goTo('...')" du HTML
   ========================================================== */

let lastListScreen = 'accueil';

function goTo(name){
  if(!guardedGoTo(name)) return;
  if(['accueil','recherche','vendeur','garage'].includes(name)) lastListScreen = name;
  if(name === 'panier') renderCart();

  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const navMap = {
    accueil:'accueil', recherche:'recherche', produit:lastListScreen,
    vendeur:'vendeur', publier:'vendeur', garage:'garage',
    panier:'panier', paiement:'panier', confirmation:'panier', compte:'compte'
  };
  const navTarget = navMap[name];
  const navEl = document.querySelector(`.nav-item[data-nav="${navTarget}"]`);
  if(navEl) navEl.classList.add('active');

  document.getElementById('main').scrollTop = 0;

  /* Données de l'écran (squelette -> contenu), puis apparition progressive.
     Les deux fonctions viennent de ui.js (chargé après ce fichier : appelées au clic, donc déjà définies). */
  ensureScreenData(name);
  initReveal(document.getElementById('screen-' + name));
}
