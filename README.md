# Portfolio — Steve (Ngahan Donal Steve)

Déploiement *sans build* sur **GitHub Pages** (React + Tailwind via CDNs).

## Étapes

1. **Créer un dépôt GitHub** (ex. `steve-portfolio`).
2. Téléverse les fichiers suivants à la racine du dépôt :
   - `index.html`
   - `app.jsx`
3. Va dans **Settings → Pages** :
   - *Source* : `Deploy from a branch`
   - *Branch* : `main` et `/ (root)` puis **Save**.
4. Ton site sera publié sous : `https://<ton-user>.github.io/<nom-du-depot>/`.

> ⚠️ Si tu utilises un thème sombre : le `dark mode` suit les préférences système (`darkMode: 'media'`).

## Modifier ensuite

- Contenu principal dans **`app.jsx`** (liens, projets, e‑mail, etc.).
- Pour ajouter une photo, remplace le bloc "Photo pro ici" par une `<img>`.
- Pour un **SEO** plus poussé et des **performances** optimisées, on pourra migrer vers **Vite/Next.js** + déploiement via **GitHub Actions**.

## Astuces

- Si l’URL des assets ne charge pas en sous‑dossiers, tu es tranquille ici (pas d’assets buildés).
- Évite de mettre des secrets, c’est un dépôt public.
