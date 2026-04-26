# France-Pascale-portfolio

## Mettre à jour les images (guide débutant)

Super nouvelle : dans ce projet, changer les photos est **très simple**.

### 1) Où sont les images
- Dossier des images : `images/`
- Le site utilise les images déclarées dans : `portfolio-app.jsx`

### 2) Ajouter une nouvelle photo
1. Copiez votre photo dans le dossier `images/`.
2. Donnez-lui un nom simple, sans espace ni accent (ex: `miroir-bleu-01.jpg`).

### 3) Remplacer une photo existante
Vous avez 2 options :

#### Option A (la plus simple) — garder le même nom de fichier
- Remplacez le fichier dans `images/` en conservant **exactement** le même nom.
- Exemple : vous remplacez `images/hero-1.jpg` par une nouvelle photo qui s'appelle aussi `hero-1.jpg`.
- Résultat : le site affiche automatiquement la nouvelle image, sans modifier le code.

#### Option B — utiliser un nouveau nom de fichier
- Ajoutez la nouvelle image dans `images/`.
- Puis modifiez son chemin dans `portfolio-app.jsx`.

Exemple de ligne à changer dans `portfolio-app.jsx` :
```js
img: "images/hero-1.jpg"
```
peut devenir :
```js
img: "images/miroir-bleu-01.jpg"
```

### 4) Repérer les doublons
Pour voir où une image est utilisée dans le code :
```bash
rg -n "images/nom-de-l-image.jpg" portfolio-app.jsx
```

Exemple :
```bash
rg -n "images/paravent-soleil.jpg" portfolio-app.jsx
```

Si plusieurs lignes sortent, c'est que la même image est affichée à plusieurs endroits.

### 5) Tester en local
Si vous voulez vérifier avant de pousser :
- ouvrez `index.html` dans le navigateur,
- ou servez le dossier avec un petit serveur local.

### 6) Commit + push (déploiement automatique)
Quand tout est bon :
```bash
git add images portfolio-app.jsx README.md
git commit -m "Mise à jour des images du portfolio"
git push
```

Si votre GitHub est relié à Vercel, le déploiement se lance automatiquement après le `git push`.

---

## Ce que je peux faire pour vous maintenant
Je peux m'en occuper pour vous de A à Z :
1. vous me donnez la liste des remplacements (ancienne image → nouvelle image),
2. je modifie le code,
3. je vérifie qu'il n'y a plus de doublons indésirables,
4. je fais le commit proprement.

Format pratique à m'envoyer :
- `hero-1.jpg -> nouvelle-photo-salon.jpg`
- `miroir-eventail.jpg -> miroir-eventail-v2.jpg`
- `supprimer le doublon paravent-soleil dans la section X`
