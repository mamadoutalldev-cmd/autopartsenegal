# AUTOPARTSÉNÉGAL — SÉPARATION DU HTML / CSS / JAVASCRIPT

Le projet AutopartSénégal fonctionne actuellement, mais tout le code HTML, CSS et JavaScript est regroupé dans un seul fichier.

Je veux que tu restructures proprement le projet en séparant ces trois parties.

## OBJECTIF

Transformer progressivement :

```text
projet actuel
└── un seul fichier contenant HTML + CSS + JavaScript
```

en :

```text
AutopartSenegal/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── assets/
    ├── images/
    └── icons/
```

## 1. ANALYSER AVANT DE MODIFIER

Commence par lire entièrement le fichier actuel.

Identifie clairement :

- le HTML ;
- les balises `<style>` ;
- les balises `<script>` ;
- le JavaScript inline ;
- les fonctions JavaScript ;
- les événements ;
- les données mockées ;
- les images ;
- les icônes ;
- les polices ;
- les dépendances externes.

Ne modifie rien avant d'avoir compris la structure.

## 2. EXTRAIRE LE CSS

Tout le CSS actuellement présent dans :

```html
<style>
...
</style>
```

doit être déplacé vers :

```text
css/style.css
```

Puis supprimer le `<style>` du HTML.

Dans `index.html`, ajouter :

```html
<link rel="stylesheet" href="css/style.css">
```

### Important

Le déplacement du CSS ne doit pas modifier visuellement l'application.

Conserver :

- couleurs ;
- tailles ;
- espacements ;
- animations ;
- transitions ;
- hover ;
- responsive ;
- media queries.

Si le CSS contient déjà des répétitions évidentes, tu peux les nettoyer légèrement, mais ne fais pas de refonte graphique pendant cette étape.

## 3. EXTRAIRE LE JAVASCRIPT

Tout le JavaScript actuellement présent dans :

```html
<script>
...
</script>
```

doit être déplacé vers :

```text
js/app.js
```

Puis supprimer les scripts inline correspondants.

Dans `index.html`, ajouter :

```html
<script src="js/app.js" defer></script>
```

### Important

Toutes les fonctionnalités JavaScript actuelles doivent continuer à fonctionner.

Conserver notamment :

- événements `click` ;
- formulaires ;
- recherche ;
- navigation ;
- modales ;
- boutons ;
- animations ;
- localStorage ;
- données mockées ;
- interactions utilisateur.

## 4. RESSOURCES

Si le fichier contient des ressources intégrées ou des fichiers existants, organiser si nécessaire :

```text
assets/
├── images/
└── icons/
```

Ne déplace pas une ressource si cela risque de casser son chemin.

Après déplacement, corrige les chemins si nécessaire.

Par exemple :

```text
images/logo.png
```

peut devenir :

```text
assets/images/logo.png
```

## 5. STRUCTURE FINALE

Le résultat minimum doit être :

```text
AutopartSenegal/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── assets/
    ├── images/
    └── icons/
```

Ne crée pas une architecture complexe pour le moment.

Nous voulons simplement séparer proprement :

**HTML / CSS / JavaScript**

## 6. IMPORTANT — NE PAS REFAIRE L'APPLICATION

Cette tâche est une restructuration technique.

Ne profite PAS de cette étape pour :

- refaire l'UI ;
- changer les couleurs ;
- changer les fonctionnalités ;
- modifier la logique ;
- changer la navigation ;
- supprimer des éléments ;
- ajouter des fonctionnalités métier.

Le résultat visuel et fonctionnel doit rester quasiment identique.

La seule différence doit être l'organisation du code.

## 7. IDENTITÉ VISUELLE

Le projet possède un fichier :

```text
IDENTITE-VISUELLE.md
```

Tu peux le consulter pour comprendre les règles de l'identité visuelle, mais pendant cette étape :

**ne change pas le design existant.**

Nous ferons la modernisation UI/UX dans une étape séparée.

## 8. VÉRIFICATION

Après la séparation, vérifie que :

- la page se charge correctement ;
- le CSS est bien appliqué ;
- les images fonctionnent ;
- les icônes fonctionnent ;
- les boutons fonctionnent ;
- les événements JavaScript fonctionnent ;
- les formulaires fonctionnent ;
- le responsive fonctionne ;
- le localStorage fonctionne ;
- aucune erreur JavaScript n'apparaît dans la console.

## 9. NETTOYAGE

Une fois la séparation terminée :

- supprimer les anciens `<style>` ;
- supprimer les anciens `<script>` inline devenus inutiles ;
- supprimer les doublons évidents ;
- corriger les chemins ;
- conserver uniquement le code nécessaire.

Ne laisse pas une copie du CSS ou du JavaScript dans `index.html`.

## 10. RÉSULTAT ATTENDU

Je veux passer d'un fichier monolithique contenant :

**HTML + CSS + JavaScript**

à une structure claire :

```text
index.html
     │
     ├── css/style.css
     │
     └── js/app.js
```

L'application doit fonctionner exactement comme avant.

Une fois cette séparation terminée et vérifiée, arrête-toi.

**Ne commence pas encore l'intégration des rôles Client / Magasin / Garage / Admin.**

Cette étape sert uniquement à obtenir une base propre et séparée.
