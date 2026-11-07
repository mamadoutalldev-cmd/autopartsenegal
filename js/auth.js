/* ==========================================================
   AUTH — session, connexion/déconnexion, routage par rôle,
   garde d'accès. Authentification simulée (localStorage),
   pas de vrai backend pour l'instant.
   Dépend de : data.js (TEST_ACCOUNTS)
   Utilisé par : router.js, ui.js, app.js
   ========================================================== */

const SESSION_KEY = 'autoparts_senegal_session';

/* Comptes créés via "Créer un compte" : gardés dans le navigateur (simulation de base de données).
   ⚠ Mot de passe en clair : acceptable pour un prototype, À REMPLACER par le backend (mot de passe haché côté serveur). */
const USERS_KEY = 'autoparts_senegal_users';
const BUILTIN_EMAILS = Object.keys(TEST_ACCOUNTS);       /* les 4 comptes de test de data.js */
const VALID_ROLES = ['client','magasin','garage','admin'];

function loadStoredAccounts(){
  try{
    const stored = JSON.parse(localStorage.getItem(USERS_KEY));
    if(!stored || typeof stored !== 'object') return;
    Object.keys(stored).forEach(email=>{
      const acc = stored[email];
      if(BUILTIN_EMAILS.includes(email) || !acc) return;
      if(VALID_ROLES.includes(acc.role) && typeof acc.password === 'string' && typeof acc.name === 'string') TEST_ACCOUNTS[email] = acc;
    });
  }catch(e){ /* données illisibles : on les ignore */ }
}

function saveStoredAccounts(){
  const created = {};
  Object.keys(TEST_ACCOUNTS).forEach(email=>{ if(!BUILTIN_EMAILS.includes(email)) created[email] = TEST_ACCOUNTS[email]; });
  try{ localStorage.setItem(USERS_KEY, JSON.stringify(created)); }
  catch(e){ /* stockage indisponible : le compte reste valable pour cette visite */ }
}

loadStoredAccounts();
let selectedRole = 'client';
let authMode = 'login';

function getSession(){
  try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch(e){ return null; }
}
function setSession(s){ localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
function clearSession(){ localStorage.removeItem(SESSION_KEY); }

function selectAuthMode(el, mode){
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('login-error').classList.remove('show');

  const isSignup = mode === 'signup';
  document.getElementById('signup-name-field').style.display = isSignup ? 'block' : 'none';
  document.getElementById('signup-phone-field').style.display = isSignup ? 'block' : 'none';
  document.getElementById('signup-confirm-field').style.display = isSignup ? 'block' : 'none';
  document.getElementById('test-account-hint').style.display = isSignup ? 'none' : 'flex';

  document.getElementById('auth-title').textContent = isSignup ? 'Créer un compte' : 'Connexion';
  document.getElementById('auth-sub').textContent = isSignup
    ? 'Choisissez votre profil pour commencer'
    : 'Choisissez votre profil pour continuer';
  document.getElementById('auth-submit-btn').textContent = isSignup ? 'Créer mon compte' : 'Se connecter';
}

function selectRole(el, role){
  selectedRole = role;
  document.querySelectorAll('.role-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const emailByRole = {client:'client@test.com', magasin:'magasin@test.com', garage:'garage@test.com', admin:'admin@test.com'};
  document.getElementById('test-account-email').textContent = emailByRole[role];
  document.getElementById('login-error').classList.remove('show');
}

function fillTestAccount(){
  const emailByRole = {client:'client@test.com', magasin:'magasin@test.com', garage:'garage@test.com', admin:'admin@test.com'};
  document.getElementById('login-email').value = emailByRole[selectedRole];
  document.getElementById('login-password').value = '123456';
}

function submitAuth(){
  if(authMode === 'signup') doSignup();
  else doLogin();
}

function doLogin(){
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const account = TEST_ACCOUNTS[email];
  const errEl = document.getElementById('login-error');
  if(!account || account.password !== password){
    errEl.textContent = 'Email ou mot de passe incorrect.';
    errEl.classList.add('show');
    return;
  }
  errEl.classList.remove('show');
  setSession({email, role:account.role, name:account.name});
  document.getElementById('login-email').value='';
  document.getElementById('login-password').value='';
  routeToSpace(account.role, account.name, email);
}

function doSignup(){
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const phone = document.getElementById('signup-phone').value.trim();
  const password = document.getElementById('login-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const errEl = document.getElementById('login-error');

  if(!name || !email || !password){
    errEl.textContent = 'Merci de remplir tous les champs obligatoires.';
    errEl.classList.add('show');
    return;
  }
  if(password !== confirm){
    errEl.textContent = 'Les mots de passe ne correspondent pas.';
    errEl.classList.add('show');
    return;
  }
  if(TEST_ACCOUNTS[email]){
    errEl.textContent = 'Un compte existe déjà avec cet email.';
    errEl.classList.add('show');
    return;
  }
  errEl.classList.remove('show');

  /* Compte simulé : ajouté à la session en cours uniquement (pas persisté
     côté "backend", puisqu'il n'y en a pas encore) */
  TEST_ACCOUNTS[email] = {password, role:selectedRole, name, phone};
  saveStoredAccounts();
  setSession({email, role:selectedRole, name});
  showToast('Compte créé ✓');

  document.getElementById('signup-name').value='';
  document.getElementById('signup-phone').value='';
  document.getElementById('signup-confirm').value='';
  document.getElementById('login-email').value='';
  document.getElementById('login-password').value='';

  routeToSpace(selectedRole, name, email);
}

function sendResetLink(){
  const email = document.getElementById('forgot-email').value.trim();
  if(!email){
    showToast('Merci de saisir un email');
    return;
  }
  showToast('Lien de réinitialisation envoyé ✓');
  document.getElementById('forgot-email').value = '';
  setTimeout(()=>goTo('login'), 900);
}

function logout(){
  clearSession();
  cart = [];
  updateCartBadge();
  document.getElementById('bottom-nav').style.display = 'none';
  document.getElementById('header-actions-el').style.display = 'none';
  goTo('login');
}

function routeToSpace(role, name, email){
  const bottomNav = document.getElementById('bottom-nav');
  const headerActions = document.getElementById('header-actions-el');
  if(role === 'client'){
    bottomNav.style.display = 'flex';
    headerActions.style.display = 'flex';
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-email').textContent = email;
    document.getElementById('profile-avatar').textContent = name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    goTo('accueil');
  } else {
    bottomNav.style.display = 'none';
    headerActions.style.display = 'none';
    if(role === 'magasin'){ document.getElementById('magasin-name').textContent = name; goTo('vendeur'); }
    else if(role === 'garage'){ document.getElementById('garage-name').textContent = name; goTo('garage'); }
    else if(role === 'admin'){ document.getElementById('admin-name').textContent = name; goTo('admin'); }
  }
}

/* Écrans réservés à un rôle non-client, et écrans réservés au rôle client */
const ROLE_SCREENS = {vendeur:'magasin', publier:'magasin', garage:'garage', admin:'admin'};
const CLIENT_SCREENS = ['accueil','recherche','produit','panier','paiement','confirmation','compte'];
const NO_SESSION_SCREENS = ['login','motdepasseoublie'];

function guardedGoTo(name){
  const session = getSession();
  if(!session){ return NO_SESSION_SCREENS.includes(name); }
  const requiredRole = ROLE_SCREENS[name];
  if(requiredRole && session.role !== requiredRole){
    showToast("Accès non autorisé pour ce rôle");
    routeToSpace(session.role, session.name, session.email);
    return false;
  }
  if(CLIENT_SCREENS.includes(name) && session.role !== 'client'){
    routeToSpace(session.role, session.name, session.email);
    return false;
  }
  return true;
}
