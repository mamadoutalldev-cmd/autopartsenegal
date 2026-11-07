/* ==========================================================
   DATA — données mockées
   Séparé de la logique et de l'affichage. Ce fichier est celui
   qui sera remplacé par de vrais appels API le jour où le
   backend sera branché.
   ========================================================== */

const TEST_ACCOUNTS = {
  'client@test.com':  {password:'123456', role:'client',  name:'Mamadou Fall'},
  'magasin@test.com': {password:'123456', role:'magasin', name:'Garage Cheikh Autos'},
  'garage@test.com':  {password:'123456', role:'garage',  name:'Garage Modou'},
  'admin@test.com':   {password:'123456', role:'admin',   name:'Admin AutoParts'}
};

const CATEGORIES = [
  {n:'Moteur', ic:'M4 16.5V13l1.6-4.5A2 2 0 0 1 7.5 7h9a2 2 0 0 1 1.9 1.5L20 13v3.5'},
  {n:'Freinage', ic:'M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8'},
  {n:'Suspension', ic:'M8 3v18M16 3v18M4 8l4-2M20 8l-4-2M4 16l4 2M20 16l-4 2'},
  {n:'Transmission', ic:'M6 6h12v12H6z'},
  {n:'Batterie', ic:'M7 7h10v13H7zM9 4h6v3H9z'},
  {n:'Carrosserie', ic:'M4 16.5V13l1.6-4.5A2 2 0 0 1 7.5 7h9a2 2 0 0 1 1.9 1.5L20 13v3.5'},
  {n:'Pneus', ic:'M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2z'},
  {n:'Éclairage', ic:'M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11.2V16h6v-1.8A6 6 0 0 0 12 3z'},
  {n:'Climatisation', ic:'M12 2v20M4 6l16 12M20 6L4 18'},
  {n:'Accessoires', ic:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'}
];

/* ----------------------------------------------------------
   VÉHICULES — liste de départ (marque → modèles)
   À valider et compléter avec vos magasins partenaires.
   Les années ne sont pas liées à un modèle : le sélecteur propose
   toutes les années entre VEHICLE_YEAR_MIN et l'année en cours,
   pour ne pas inventer de dates de production.
   ---------------------------------------------------------- */
const VEHICLES = {
  Toyota:   ['Corolla','Yaris','Hilux','RAV4','Land Cruiser'],
  Peugeot:  ['206','207','208','307','308','3008'],
  Nissan:   ['Sentra','Almera','Qashqai','Navara'],
  Hyundai:  ['i10','Accent','Elantra','Tucson'],
  Mercedes: ['Classe C','Classe E','Sprinter'],
  Kia:      ['Picanto','Rio','Sportage']
};

const VEHICLE_YEAR_MIN = 1995;
const VEHICLE_YEAR_MAX = new Date().getFullYear();

/* Les marques affichées sur l'accueil viennent de la liste des véhicules
   (même contenu et même ordre qu'avant : une seule source de vérité). */
const BRANDS = Object.keys(VEHICLES);

/* ----------------------------------------------------------
   PIÈCES
   - compat : texte affiché (inchangé)
   - fits   : compatibilité structurée, utilisée pour le filtrage
              [{make, model, from, to}] ou 'universal'
   ---------------------------------------------------------- */
const PARTS = [
  {name:'Plaquettes de frein avant', compat:'Toyota Corolla 2015-2020', fits:[{make:'Toyota', model:'Corolla', from:2015, to:2020}], price:25000, avail:true, loc:'Dakar — Sacré-Cœur', vendeur:'Garage Cheikh Autos', ref:'TC-BR-2019', etat:'Neuf'},
  {name:'Alternateur 90A', compat:'Peugeot 208 2013-2018', fits:[{make:'Peugeot', model:'208', from:2013, to:2018}], price:65000, avail:true, loc:'Dakar — Grand Yoff', vendeur:'AutoPièces Almadies', ref:'PG-AL-1318', etat:'Occasion'},
  {name:'Amortisseur arrière', compat:'Nissan Sentra 2016-2021', fits:[{make:'Nissan', model:'Sentra', from:2016, to:2021}], price:38000, avail:false, loc:'Pikine', vendeur:'Garage Modou', ref:'NS-AM-1621', etat:'Neuf'},
  {name:'Filtre à huile', compat:'Hyundai i10 2014-2019', fits:[{make:'Hyundai', model:'i10', from:2014, to:2019}], price:6000, avail:true, loc:'Guédiawaye', vendeur:'Stock Auto Sénégal', ref:'HY-FH-1419', etat:'Neuf'},
  {name:'Phare avant droit', compat:'Toyota Yaris 2012-2017', fits:[{make:'Toyota', model:'Yaris', from:2012, to:2017}], price:45000, avail:true, loc:'Dakar — Liberté 6', vendeur:'Pièces Express', ref:'TY-PH-1217', etat:'Occasion'},
  {name:'Batterie 60Ah', compat:'Universel', fits:'universal', price:55000, avail:true, loc:'Dakar — Colobane', vendeur:'Batteries Dakar', ref:'BT-60-U', etat:'Neuf'},
  {name:'Kit embrayage', compat:'Nissan Almera 2015-2019', fits:[{make:'Nissan', model:'Almera', from:2015, to:2019}], price:85000, avail:false, loc:'Rufisque', vendeur:'Garage Cheikh Autos', ref:'NA-EM-1519', etat:'Neuf'},
  {name:'Radiateur moteur', compat:'Hyundai Accent 2011-2017', fits:[{make:'Hyundai', model:'Accent', from:2011, to:2017}], price:47000, avail:true, loc:'Dakar — Ouakam', vendeur:'AutoPièces Almadies', ref:'HA-RA-1117', etat:'Neuf'},
];
