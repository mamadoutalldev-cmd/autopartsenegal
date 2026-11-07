/* ==========================================================
   VEHICLE — le véhicule du client (marque / modèle / année) et la compatibilité des pièces
   - Garde le véhicule choisi, mémorisé dans le navigateur (localStorage).
   - Dit si une pièce convient à ce véhicule (partMatchesVehicle, getFitStatus).
   - Aucun affichage ici : le sélecteur et le bandeau "convient à votre véhicule"
     viennent dans les étapes suivantes (ui.js, index.html).
   Dépend de : data.js (VEHICLES, VEHICLE_YEAR_MIN, VEHICLE_YEAR_MAX, PARTS[].fits)
   ========================================================== */

const VEHICLE_KEY = 'autoparts_senegal_vehicle';

function emptyVehicle(){ return { make:'', model:'', year:'' }; }

/* Ne garde que des valeurs qui existent vraiment dans VEHICLES :
   un modèle n'est accepté que pour sa marque, une année que pour un modèle choisi. */
function sanitizeVehicle(v){
  const out = emptyVehicle();
  if(!v || typeof v !== 'object') return out;
  if(typeof v.make === 'string' && Object.prototype.hasOwnProperty.call(VEHICLES, v.make)) out.make = v.make;
  if(out.make && typeof v.model === 'string' && VEHICLES[out.make].includes(v.model)) out.model = v.model;
  const y = Number(v.year);
  if(out.model && Number.isInteger(y) && y >= VEHICLE_YEAR_MIN && y <= VEHICLE_YEAR_MAX) out.year = y;
  return out;
}

function loadVehicle(){
  try{ return sanitizeVehicle(JSON.parse(localStorage.getItem(VEHICLE_KEY))); }
  catch(e){ return emptyVehicle(); }
}

function saveVehicle(){
  try{ localStorage.setItem(VEHICLE_KEY, JSON.stringify(selectedVehicle)); }
  catch(e){ /* stockage indisponible : le véhicule reste choisi pour cette visite */ }
}

let selectedVehicle = loadVehicle();

/* Copie : le code appelant ne peut pas modifier l'état par accident */
function getVehicle(){ return Object.assign({}, selectedVehicle); }

/* setVehicle({make:'Toyota'}) · setVehicle({model:'Corolla'}) · setVehicle({year:2017})
   Changer la marque efface modèle et année ; changer le modèle efface l'année. */
function setVehicle(changes){
  const next = Object.assign({}, selectedVehicle, changes);
  if('make' in changes && changes.make !== selectedVehicle.make){
    if(!('model' in changes)) next.model = '';
    if(!('year' in changes)) next.year = '';
  } else if('model' in changes && changes.model !== selectedVehicle.model){
    if(!('year' in changes)) next.year = '';
  }
  selectedVehicle = sanitizeVehicle(next);
  saveVehicle();
  return getVehicle();
}

function clearVehicle(){
  selectedVehicle = emptyVehicle();
  saveVehicle();
  return getVehicle();
}

/* ---- Listes pour les menus déroulants ---- */
function getModelsFor(make){
  return Object.prototype.hasOwnProperty.call(VEHICLES, make) ? VEHICLES[make].slice() : [];
}

function getYears(){                                   /* de l'année en cours vers 1995 */
  const years = [];
  for(let y = VEHICLE_YEAR_MAX; y >= VEHICLE_YEAR_MIN; y--) years.push(y);
  return years;
}

function isVehicleComplete(v = selectedVehicle){ return !!(v && v.make && v.model && v.year); }

function getVehicleLabel(v = selectedVehicle){          /* "Toyota Corolla 2017", ou "Toyota" si incomplet */
  return v ? [v.make, v.model, v.year].filter(Boolean).join(' ') : '';
}

/* ---- Compatibilité ----
   part.fits = [{make, model, from, to}, ...]  ou  'universal'  (voir data.js) */

/* Pour FILTRER la recherche. Accepte un véhicule partiel :
   marque seule -> toutes les pièces de cette marque ; + modèle -> ce modèle ; + année -> cette année.
   Sans véhicule choisi, rien n'est écarté. Les pièces universelles passent toujours.
   Une pièce sans compatibilité renseignée est écartée dès qu'un véhicule est choisi. */
function partMatchesVehicle(part, v = selectedVehicle){
  if(!v || !v.make) return true;
  if(part.fits === 'universal') return true;
  if(!Array.isArray(part.fits)) return false;
  return part.fits.some(f =>
    f.make === v.make &&
    (!v.model || f.model === v.model) &&
    (!v.year  || (v.year >= f.from && v.year <= f.to))
  );
}

/* Pour le bandeau de la fiche produit. Un verdict n'a de sens que si le véhicule est complet :
   'unknown'   véhicule incomplet, ou compatibilité de la pièce non renseignée
   'universal' pièce universelle (à vérifier quand même : tailles, bornes...)
   'yes' / 'no' */
function getFitStatus(part, v = selectedVehicle){
  if(!isVehicleComplete(v)) return 'unknown';
  if(part.fits === 'universal') return 'universal';
  if(!Array.isArray(part.fits)) return 'unknown';
  return partMatchesVehicle(part, v) ? 'yes' : 'no';
}
