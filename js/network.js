/* ==========================================================
   NETWORK — alerte "connexion perdue" / "connexion rétablie"
   - Écoute les événements du navigateur "offline" / "online" : pas besoin d'actualiser la page.
   - Hors ligne : pastille rouge, affichée TANT QUE la connexion est perdue.
   - Retour de la connexion : pastille verte pendant NET_ONLINE_HIDE_MS, puis elle disparaît.
   - Si la coupure dure moins de NET_MIN_OFFLINE_MS, pas de message "rétabli" (évite le clignotement).
   - Si l'app s'ouvre déjà hors ligne, l'alerte attend la fin de l'écran de démarrage.
   ⚠ Limite du navigateur : il sait si l'appareil a un réseau, pas si internet répond vraiment
     (wifi branché sans internet = "en ligne"). Un vrai test se fera quand le backend existera.
   Utilisé par : app.js (initNetworkStatus) · HTML : <div id="net-status"> dans index.html
   ========================================================== */

const NET_TEXT_OFFLINE = 'Vous avez perdu la connexion';
const NET_TEXT_ONLINE = 'Connexion rétablie';
const NET_ONLINE_HIDE_MS = 3000;     /* durée d'affichage de "Connexion rétablie" */
const NET_MIN_OFFLINE_MS = 1000;     /* coupure plus courte : pas de message "rétabli" */

let netEl = null;
let netHideTimer = null;
let netOfflineSince = 0;
let netIsOffline = false;

function showNetStatus(kind){                                   /* kind : 'offline' | 'online' */
  netEl.classList.remove('net-status--offline', 'net-status--online');
  netEl.classList.add('net-status--' + kind);
  document.getElementById('net-status-text').textContent = kind === 'offline' ? NET_TEXT_OFFLINE : NET_TEXT_ONLINE;
  netEl.classList.add('is-visible');
}

function hideNetStatus(){ netEl.classList.remove('is-visible'); }

function handleOffline(){
  if(netIsOffline) return;                                      /* déjà signalé */
  netIsOffline = true;
  netOfflineSince = Date.now();
  clearTimeout(netHideTimer);
  showNetStatus('offline');
}

function handleOnline(){
  if(!netIsOffline) return;
  netIsOffline = false;
  clearTimeout(netHideTimer);
  if(Date.now() - netOfflineSince < NET_MIN_OFFLINE_MS){ hideNetStatus(); return; }
  showNetStatus('online');
  netHideTimer = setTimeout(hideNetStatus, NET_ONLINE_HIDE_MS);
}

/* Attend que l'écran de démarrage soit parti avant d'afficher l'alerte d'ouverture */
function whenSplashGone(cb){
  const splash = document.getElementById('splash');
  if(!splash || splash.classList.contains('hide')){ cb(); return; }
  const mo = new MutationObserver(()=>{
    if(splash.classList.contains('hide')){ mo.disconnect(); cb(); }
  });
  mo.observe(splash, { attributes:true, attributeFilter:['class'] });
}

function initNetworkStatus(){
  netEl = document.getElementById('net-status');
  if(!netEl) return;
  window.addEventListener('offline', handleOffline);
  window.addEventListener('online', handleOnline);
  if(navigator.onLine === false) whenSplashGone(handleOffline);
}
