# AUTOPARTSÉNÉGAL — REFONTE DE LA BASE + SYSTÈME MULTI-RÔLES

L'application AutopartSénégal existe déjà en HTML, CSS et JavaScript.

Elle possède actuellement principalement un espace Client.

Ta mission est d'améliorer la base existante et d'intégrer une architecture permettant de gérer plusieurs rôles et plusieurs espaces.

## 1. Liberté de modification

Tu as carte blanche sur la structure technique du projet.

Tu peux :

- modifier le HTML ;
- refactoriser le JavaScript ;
- réorganiser les fichiers ;
- créer de nouveaux fichiers ;
- déplacer des composants ;
- supprimer du code inutile ;
- améliorer l'architecture ;
- refactoriser le CSS ;
- modifier la structure des pages ;
- améliorer le responsive ;
- améliorer les interactions ;
- refaire certains composants si nécessaire.

Tu peux repartir d'une base plus propre lorsque l'architecture actuelle ne permet pas une évolution propre.

Cependant, conserve les fonctionnalités importantes déjà présentes.

Ne supprime pas arbitrairement une fonctionnalité fonctionnelle simplement pour simplifier le code.

## 2. Identité visuelle — règle absolue

Le projet possède un fichier Markdown contenant notamment l'identité visuelle d'AutopartSénégal.

**LIS ET ANALYSE CE MARKDOWN AVANT DE MODIFIER L'INTERFACE.**

Le Markdown est la référence pour :

- couleurs ;
- typographies ;
- logo ;
- style graphique ;
- formes ;
- composants ;
- ambiance ;
- règles visuelles ;
- éventuelles règles d'utilisation.

Tu dois respecter cette identité.

Tu peux moderniser l'interface, mais tu ne dois pas créer une identité visuelle différente.

Si une couleur est définie dans le Markdown : utilise cette couleur.

Si une typographie est définie : utilise cette typographie.

Si un style d'icônes est défini : respecte-le.

## 3. UI/UX moderne

Profite de cette refonte pour rendre l'application beaucoup plus moderne.

L'interface doit avoir une qualité proche d'une application mobile/web professionnelle.

Privilégier :

- hiérarchie visuelle claire ;
- espaces généreux ;
- cartes modernes ;
- bordures et rayons cohérents ;
- ombres subtiles ;
- boutons modernes ;
- navigation intuitive ;
- feedback visuel ;
- transitions fluides ;
- responsive mobile-first.

Éviter :

- interface datée ;
- effets excessifs ;
- gradients utilisés partout ;
- couleurs hors palette ;
- composants incohérents ;
- animations inutiles.

## 4. Hover et micro-interactions

Ajoute des interactions modernes lorsque cela améliore l'expérience.

Exemples :

### Boutons

- hover ;
- active ;
- focus ;
- transition douce.

### Cartes

- léger déplacement ;
- changement subtil d'ombre ;
- accent visuel au survol.

### Icônes

- changement subtil d'état ;
- animation légère lorsque pertinent.

### Navigation

- état actif clairement visible ;
- transition fluide.

Les animations doivent rester élégantes et rapides.

Ne pas transformer l'application en interface sur-animée.

Respecter également `prefers-reduced-motion`.

## 5. Icônes UI

Utiliser une bibliothèque moderne d'icônes vectorielles.

Les icônes doivent être :

- modernes ;
- cohérentes ;
- minimalistes ;
- professionnelles ;
- adaptées au contexte ;
- compatibles avec l'identité visuelle.

Toutes les icônes doivent avoir une logique graphique commune.

Éviter de mélanger plusieurs styles.

Éviter les emojis comme icônes principales lorsque des icônes UI adaptées existent.

Les couleurs des icônes doivent provenir de la palette de l'identité visuelle.

Prévoir notamment des icônes pour :

- accueil ;
- recherche ;
- profil ;
- panier ;
- commandes ;
- magasin ;
- garage ;
- administration ;
- pièces ;
- stock ;
- filtres ;
- paramètres ;
- notifications ;
- retour ;
- fermeture ;
- validation ;
- erreur ;
- recherche ;
- localisation ;
- téléphone ;
- actions.

Utilise uniquement les icônes réellement nécessaires à chaque interface.

## 6. Responsive

Repenser le CSS si nécessaire afin d'obtenir une vraie expérience :

**Mobile → Tablette → Desktop**

Priorité au mobile.

Tester notamment :

- 320px ;
- 375px ;
- 390px ;
- 414px ;
- 768px ;
- 1024px ;
- 1280px et plus.

Aucun défilement horizontal inutile.

Les éléments tactiles doivent être suffisamment grands.

## 7. Système multi-rôles

Transformer :

```text
Connexion
↓
Espace Client
```

en :

```text
Connexion
↓
Identification du rôle
↓
Espace correspondant
```

Rôles :

- `client`
- `magasin`
- `garage`
- `admin`

## 8. Comptes de test

Créer des comptes fictifs :

### CLIENT

```text
email : client@test.com
mot de passe : 123456
```

### MAGASIN

```text
email : magasin@test.com
mot de passe : 123456
```

### GARAGE

```text
email : garage@test.com
mot de passe : 123456
```

### ADMIN

```text
email : admin@test.com
mot de passe : 123456
```

Utiliser le système de données existant si possible.

## 9. Espaces

### CLIENT

Conserver l'espace Client existant, mais tu peux améliorer sa structure et son UI si nécessaire.

### MAGASIN

Créer un espace temporaire moderne :

- Dashboard ;
- navigation ;
- message de bienvenue ;
- bouton déconnexion.

### GARAGE

Créer un espace temporaire moderne :

- Dashboard ;
- navigation ;
- message de bienvenue ;
- bouton déconnexion.

### ADMIN

Créer un dashboard temporaire moderne :

- statistiques fictives simples ;
- navigation ;
- message de bienvenue ;
- bouton déconnexion.

**ATTENTION :**

Ces trois nouveaux espaces sont uniquement des placeholders pour tester l'architecture multi-rôles.

Ne développe pas encore leurs fonctionnalités métier.

## 10. Session

Utiliser `localStorage` pour simuler l'authentification.

Conserver :

- utilisateur ;
- rôle ;
- session.

Après actualisation :

→ session conservée.

Après déconnexion :

→ session supprimée.

## 11. Routage / accès

Chaque rôle doit accéder à son propre espace.

```text
client  → client
magasin → magasin
garage  → garage
admin   → admin
```

Si un utilisateur tente d'accéder à un espace qui ne correspond pas à son rôle :

→ empêcher l'accès ;
→ rediriger vers son espace.

Cette sécurité est uniquement une simulation frontend.

## 12. Architecture propre

Tu peux restructurer entièrement l'organisation des fichiers si nécessaire.

Objectif :

- code maintenable ;
- composants réutilisables ;
- CSS organisé ;
- JavaScript modulaire ;
- données séparées de l'interface ;
- authentification centralisée ;
- navigation claire.

Évite le code dupliqué.

Sépare autant que possible :

```text
UI
↓
logique
↓
données mockées
```

Prépare le projet pour qu'un véritable backend puisse être intégré plus tard.

## 13. Design System

Si le Markdown contient suffisamment d'informations, transforme son identité visuelle en variables CSS.

Par exemple :

```css
:root {
  --primary: ...;
  --secondary: ...;
  --accent: ...;
  --background: ...;
  --surface: ...;
  --text: ...;
  --muted: ...;
  --success: ...;
  --warning: ...;
  --error: ...;
  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
}
```

Les valeurs réelles doivent être basées sur le Markdown.

Utiliser ces variables partout plutôt que de disperser les couleurs dans le CSS.

## 14. Splash screen

Si le projet possède déjà un écran de démarrage, améliore-le si nécessaire.

Sinon, prévoir un splash screen cohérent avec l'identité visuelle :

```text
Logo
↓
Animation légère
↓
Chargement
↓
Application
```

L'animation doit être courte, élégante et fluide.

## 15. PWA

Conserver et améliorer les éléments PWA déjà présents s'ils existent.

Si nécessaire, préparer :

- manifest ;
- icônes ;
- service worker ;
- mode standalone ;
- thème ;
- écran de démarrage.

L'application doit pouvoir être installée via Chrome.

## 16. Ce qui n'est pas demandé pour le moment

Ne développe pas encore :

- backend ;
- API réelle ;
- MySQL ;
- authentification réelle ;
- paiement réel ;
- livraison réelle ;
- gestion réelle des commissions ;
- fonctionnalités métier complètes du magasin ;
- fonctionnalités métier complètes du garage ;
- dashboard admin complet.

Cette étape concerne :

**ARCHITECTURE + UI/UX + MULTI-RÔLES + AUTHENTIFICATION SIMULÉE**

## 17. Méthode de travail

Avant de modifier le code :

1. Lire entièrement le Markdown.
2. Inspecter tous les fichiers du projet.
3. Comprendre l'architecture actuelle.
4. Identifier ce qui peut être conservé.
5. Identifier ce qui mérite d'être refactorisé.
6. Identifier les améliorations UI/UX possibles.
7. Proposer brièvement la nouvelle structure.
8. Puis commencer l'implémentation.

Tu as carte blanche pour améliorer la structure si cela permet d'obtenir une base plus propre.

## 18. Test final

Tester :

```text
client@test.com
→ Espace Client
```

```text
magasin@test.com
→ Espace Magasin
```

```text
garage@test.com
→ Espace Garage
```

```text
admin@test.com
→ Espace Admin
```

Puis tester :

- actualisation ;
- conservation de session ;
- déconnexion ;
- accès interdit ;
- responsive ;
- hover ;
- animations ;
- navigation ;
- affichage mobile.

## Objectif final

Je veux obtenir une base AutopartSénégal :

- propre ;
- moderne ;
- responsive ;
- installable comme PWA ;
- cohérente avec l'identité visuelle ;
- avec des icônes UI modernes ;
- avec de belles interactions ;
- avec une architecture multi-rôles ;
- prête à recevoir plus tard le véritable backend.

Tu as la liberté de modifier et restructurer le projet pour atteindre cet objectif.

Mais garde toujours cette règle :

> **LE MARKDOWN DÉFINIT L'IDENTITÉ VISUELLE ET LA VISION DU PROJET.**
