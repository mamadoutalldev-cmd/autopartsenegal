# Projet : AutoParts Sénégal

## Plan complet du projet

**Fondateur :** Mouhamed Ndiaye  
**Ville :** Dakar, Sénégal  
**Secteur :** Vente de pièces automobiles + services mécaniques

---

## 1. Résumé du projet

AutoParts Sénégal est une plateforme mobile et web qui permet :

- aux **clients de chercher des pièces automobiles** ;
- aux **magasins partenaires de publier leurs produits** ;
- aux **garages et mécaniciens de recevoir des demandes** ;
- de **payer via Wave, Orange Money ou espèces à la livraison**.

L'objectif est de devenir **la référence des pièces automobiles au Sénégal**.

---

## 2. Problème identifié

Aujourd'hui à Dakar :

- les clients perdent du temps à chercher les pièces ;
- les prix varient selon les magasins ;
- il n'existe pas de plateforme sénégalaise spécialisée et simple d'utilisation ;
- les garages ont du mal à trouver rapidement certaines références.

---

## 3. Solution proposée

# Application AutoParts Sénégal

## Fonctions principales

### Côté client

- Inscription / connexion
- Recherche par :
  - marque (Toyota, Peugeot, Nissan, Hyundai...)
  - modèle
  - année
  - référence de pièce
- Affichage :
  - photo
  - prix
  - disponibilité
  - magasin vendeur
- Ajout au panier
- Commande
- Paiement mobile
- Suivi de livraison

### Côté magasin partenaire

- Création d'une boutique
- Ajout des pièces
- Gestion du stock
- Réception des commandes
- Validation et préparation

### Côté garage / mécanicien

- Demande de pièces
- Recherche rapide
- Historique des commandes
- Possibilité de proposer un montage

### Côté administrateur

- Validation des partenaires
- Gestion des utilisateurs
- Contrôle des annonces
- Statistiques de ventes
- Gestion des commissions

---

## 4. Business model

### Sources de revenus

| Source | Exemple |
|---|---|
| Commission sur vente | 5 % à 10 % |
| Abonnement magasin | 10 000 à 25 000 FCFA/mois |
| Publicité dans l'application | Mise en avant des boutiques |
| Livraison | Marge sur transport |
| Services premium garages | Accès prioritaire |

### Exemple de calcul

- **100 commandes / mois**
- **Panier moyen : 20 000 FCFA**
- **Commission : 7 %**

**100 × 20 000 × 7 % = 140 000 FCFA / mois**

Avec **500 commandes**, le revenu peut dépasser **700 000 FCFA / mois**.

---

## 5. Partenaires à rechercher

Avant de lancer l'application, il faut obtenir **3 à 5 partenaires pilotes**.

### Types de partenaires

- magasins de pièces à Dakar
- casses automobiles
- importateurs de pièces
- garages spécialisés

### Message de partenariat

> Bonjour,
>
> Je développe **AutoParts Sénégal**, une application qui permettra aux clients et garages de trouver rapidement des pièces automobiles au Sénégal.
>
> Je cherche quelques magasins partenaires pour publier gratuitement leurs produits pendant la phase de lancement afin d'augmenter leur visibilité et leurs ventes.
>
> Seriez-vous intéressé par une présentation du projet ?
>
> Merci.

---

## 6. Étapes de réalisation

### Phase 1 – Validation (1 semaine)

- Nom : **AutoParts Sénégal**
- Logo
- Identifier 5 magasins
- Créer une présentation PDF

### Phase 2 – Prototype (2 semaines)

- Maquette des écrans
- Catalogue simple
- Recherche de pièces
- Formulaire de commande WhatsApp

### Phase 3 – MVP (1 mois)

Fonctions minimales :

- connexion ;
- liste des pièces ;
- panier ;
- commande ;
- espace vendeur.

### Phase 4 – Lancement Dakar (1 à 2 mois)

- Test avec vrais clients
- Livraison dans Dakar
- Promotion TikTok / Facebook / WhatsApp

---

## 7. Architecture technique

### Application mobile

- **Flutter** (Android + iPhone)

### Backend

- **Node.js + Express**

### Base de données

- **PostgreSQL**

### Hébergement

- **Render ou Railway**

### Paiements

- **Wave API**
- **Orange Money API**

---

## 8. Structure de la base de données

### Table `utilisateurs`

| Champ |
|---|
| id |
| nom |
| téléphone |
| rôle |
| mot_de_passe |

### Table `produits`

| Champ |
|---|
| id |
| nom |
| marque |
| modèle |
| année |
| prix |
| stock |
| magasin_id |

### Table `commandes`

| Champ |
|---|
| id |
| client_id |
| total |
| statut |
| date |

---

## 9. Écrans de l'application

### Écran d'accueil

- Logo AutoParts Sénégal
- Barre de recherche
- Catégories populaires

### Recherche

- Marque
- Modèle
- Année
- Type de pièce

### Fiche produit

- Photo
- Description
- Prix
- Stock
- Bouton **Commander**

### Tableau vendeur

- Ajouter produit
- Modifier prix
- Voir commandes

---

## 10. Plan marketing

### Réseaux sociaux

### TikTok

- Vidéos : « Où trouver cette pièce ? »
- Comparaison de prix
- Conseils mécaniques

### Facebook

- Groupes automobiles Sénégal
- Publications sponsorisées Dakar

### WhatsApp Business

- Catalogue de pièces
- Réponses automatiques
- Numéro officiel AutoParts Sénégal

---

## 11. Budget estimatif

| Élément | Coût estimatif |
|---|---:|
| Logo | 0 à 10 000 FCFA |
| Nom de domaine | 8 000 FCFA |
| Hébergement | 10 000 FCFA |
| Développement | 0 si tu le fais toi-même |
| Publicité lancement | 25 000 FCFA |
| Transport / prospection | 15 000 FCFA |

### Total minimum

**Environ 50 000 à 70 000 FCFA**

---

## 12. Calendrier de lancement

| Semaine | Objectif |
|---:|---|
| 1 | Logo + partenaires |
| 2 | Maquettes |
| 3 | Prototype |
| 4 | Tests |
| 5 | Ajout des magasins |
| 6 | Lancement officiel Dakar |

---

## 13. Prévisions sur 6 mois

| Mois | Commandes | Chiffre d'affaires plateforme |
|---:|---:|---:|
| 1 | 20 | 28 000 FCFA |
| 2 | 50 | 70 000 FCFA |
| 3 | 100 | 140 000 FCFA |
| 4 | 200 | 280 000 FCFA |
| 5 | 350 | 490 000 FCFA |
| 6 | 500 | 700 000 FCFA |

---

## 14. Vision future

### Après Dakar

Déploiement dans :

- Thiès
- Mbour
- Saint-Louis
- Kaolack
- Touba

### Fonctions futures

- Livraison express
- Diagnostic à domicile
- Réservation de mécanicien
- Vente de véhicules d'occasion
- Gestion de garage complète

---

## 15. Plan d'action immédiat

### Cette semaine

#### Jour 1

- Finaliser le logo
- Créer la page Facebook

#### Jour 2

- Contacter **3 magasins de pièces**

#### Jour 3

- Créer un catalogue de **20 produits**

#### Jour 4

- Installer **Flutter et VS Code**

#### Jour 5

- Développer l'écran d'accueil

### Week-end

- Présenter le projet à des garages de Dakar

---

# Conclusion

**AutoParts Sénégal** peut commencer **avec très peu d'argent** si tu avances étape par étape :

- **Trouver des partenaires magasins** ;
- **Créer un prototype simple** ;
- **Tester avec de vrais garages** ;
- **Ajouter les paiements mobiles** ;
- **Prendre une commission sur chaque vente**.

Avec ton expérience en **mécanique automobile et diagnostic**, tu as un avantage important : tu connais déjà les besoins réels des garages et des clients au Sénégal.

**Objectif réaliste :** obtenir les **10 premiers magasins partenaires dans les 30 prochains jours** puis lancer la version pilote à Dakar.

---

## Note — état actuel du prototype (mise à jour développement)

Le prototype fonctionnel actuel diverge légèrement de ce plan initial sur certains choix techniques, validés en cours de route :

- **Frontend prototype** : HTML/CSS/JS (pas encore Flutter) — un vrai aperçu web/mobile avant l'app native.
- **Backend prévu** : Node.js **et PHP** (au lieu de Node.js + Express seul).
- **Système multi-rôles** ajouté : Client / Magasin / Garage / Admin, avec connexion simulée (comptes de test, session via `localStorage`).
- **Catégories de pièces** : gamme standard (Moteur, Freinage, Suspension, Transmission, Batterie/Électricité, Carrosserie, Pneus, Éclairage, Climatisation, Accessoires).
- **Localisation** : champ ville/zone simple en texte pour ce prototype (pas de géolocalisation GPS).
