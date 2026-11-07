# AutoParts Sénégal — Prototype

Marketplace de pièces automobiles pour Dakar, Sénégal. Prototype front-end (HTML / CSS / JavaScript pur), sans backend.

## Arborescence

```
index.html
README.md
docs/    PROJET.md · IDENTITE-VISUELLE.md
assets/  images/ (logo-splash.png) · icons/ (logo-emblem.png)
css/
  variables.css    tokens : couleurs, ombres, mouvement, verre, thème sombre
  base.css         reset, cadre de l'app, header, splash (structure), nav du bas
  components.css   boutons, cartes, champs, pastille de verre, squelettes, apparition au scroll, alerte de connexion
  screens.css      styles propres à un écran (splash, connexion, panier, paiement, admin…)
  responsive.css   tablette (768px), desktop (1024px : barre latérale), grand écran (1280px)
js/
  theme.js         mode clair / sombre (chargé dans <head>, sans defer)
  data.js          données de démonstration : comptes de test, catégories, véhicules, pièces
  vehicle.js       véhicule du client + compatibilité pièce/véhicule (pas encore branché à l'écran)
  cart.js          panier
  auth.js          session, connexion, inscription, garde d'accès par rôle
  router.js        navigation entre écrans
  ui.js            rendu, squelettes, apparition au scroll, pastille de verre qui glisse
  network.js       alerte « connexion perdue / rétablie »
  app.js           démarrage et écran de démarrage
```

Ordre de chargement des scripts : `theme.js` (dans le `<head>`), puis `data → vehicle → cart → auth → router → ui → network → app` (avec `defer`).

## Lancer

Servir le dossier (le double-clic sur `index.html` peut bloquer le chargement des fichiers) :

```bash
python3 -m http.server 8080
```

puis ouvrir `http://localhost:8080`.

## Comptes de test (mot de passe `123456`)

`client@test.com` · `magasin@test.com` · `garage@test.com` · `admin@test.com`

Les comptes créés via « Créer un compte » sont gardés dans le navigateur (simulation).

## Fonctionnalités

- Splash (barre de progression + pourcentage), mode clair/sombre mémorisé
- 4 espaces par rôle avec garde d'accès : client, magasin, garage, admin
- Client : recherche, fiche produit, panier, paiement, confirmation, compte
- Squelettes de chargement, apparition au scroll, pastille de verre qui glisse (onglets et barre du bas)
- Alerte de connexion perdue / rétablie
- Responsive : mobile, tablette, desktop (barre latérale)

## Limites connues (prototype)

- Authentification simulée : mots de passe en clair côté navigateur, garde d'accès contournable. À remplacer par un vrai backend (mots de passe hachés, rôles vérifiés côté serveur).
- Le choix « Admin » est ouvert à l'inscription : à interdire en production.
- Données de démonstration uniquement ; le panier se vide au rechargement.
- Les filtres Marque / Modèle / Année / Prix / Zone de la page Recherche ne sont pas encore actifs (sélecteur de véhicule : étape 2 sur 6).
- L'alerte réseau détecte l'état du réseau de l'appareil, pas la disponibilité réelle d'internet.
- Le blanc sur le bouton orange a un contraste de 2,4:1 (sous le minimum de 4,5:1) : point de la charte à revoir.
- Couleurs du mode sombre : proposition dérivée de la charte, à valider (voir `docs/IDENTITE-VISUELLE.md`).
