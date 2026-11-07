/* ==========================================================
   THEME — mode clair / sombre
   - Chargé dans <head> SANS "defer" : le thème est posé sur <html data-theme="…">
     avant le premier affichage, donc pas d'éclair de la mauvaise couleur au chargement.
   - Le choix de l'utilisateur est mémorisé (localStorage). Sans choix, on suit le
     réglage du téléphone / ordinateur (THEME_DEFAULT = 'system').
   - Les couleurs de chaque thème sont dans css/variables.css.
   Utilisé par : le bouton #theme-toggle du header (onclick="toggleTheme()")
   ========================================================== */

const THEME_KEY = 'autoparts_senegal_theme';
/* 'system' = suivre l'appareil · 'light' ou 'dark' = forcer ce thème tant que l'utilisateur n'a pas choisi */
const THEME_DEFAULT = 'system';

function getStoredTheme(){
  try{
    const v = localStorage.getItem(THEME_KEY);
    return (v === 'dark' || v === 'light') ? v : null;
  }catch(e){ return null; }
}

function getSystemTheme(){
  return (typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}

function getTheme(){
  return document.documentElement.getAttribute('data-theme') || 'light';
}

/* Met à jour le libellé accessible du bouton (lu par les lecteurs d'écran) */
function syncThemeButton(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  const label = getTheme() === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre';
  btn.setAttribute('aria-label', label);
  btn.setAttribute('title', label);
}

function applyTheme(theme, persist){
  document.documentElement.setAttribute('data-theme', theme);
  if(persist){
    try{ localStorage.setItem(THEME_KEY, theme); }catch(e){ /* stockage indisponible : le thème reste appliqué pour cette visite */ }
  }
  syncThemeButton();
}

function toggleTheme(){
  const root = document.documentElement;
  root.classList.add('theme-fade');                         /* fondu doux, retiré juste après */
  applyTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
  clearTimeout(toggleTheme._timer);
  toggleTheme._timer = setTimeout(()=>root.classList.remove('theme-fade'), 350);
}

/* ---- Initialisation ---- */
(function initTheme(){
  const initial = getStoredTheme() || (THEME_DEFAULT === 'system' ? getSystemTheme() : THEME_DEFAULT);
  applyTheme(initial, false);
  document.addEventListener('DOMContentLoaded', syncThemeButton);

  /* Si l'utilisateur n'a jamais choisi, on suit les changements du réglage de l'appareil */
  if(typeof matchMedia === 'function'){
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e)=>{ if(!getStoredTheme() && THEME_DEFAULT === 'system') applyTheme(e.matches ? 'dark' : 'light', false); };
    if(mq.addEventListener) mq.addEventListener('change', onChange);
    else if(mq.addListener) mq.addListener(onChange);
  }
})();
