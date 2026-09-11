# INRI'S Formations — Page d'accueil

Page d'accueil statique (HTML / CSS / JS), thème sombre premium, sans aucune
dépendance ni étape de build. Ouvrir `index.html` suffit.

## Structure

```
index.html              Page complète
assets/css/style.css    Feuille de style unique (tokens en tête de fichier)
assets/js/main.js       Header collant, menu mobile, accordéon FAQ, animations
assets/img/logo-inris.svg        Logo complet, couleurs officielles (typo #1F3149)
assets/img/logo-inris-blanc.svg  Logo complet, typo blanche (fonds sombres)
assets/img/favicon.svg           Favicon (pictogramme seul)
```

## Charte graphique appliquée

| Rôle | Valeur |
| --- | --- |
| Dégradé principal | `#281B59` → `#C10058` |
| Rose (Rose Bamba CH2 0524) | `#C10058` |
| Vert secondaire | `#00E5AC` |
| Texte bleu | `#1F3149` |
| Texte bis gris | `#9AA6B7` |
| Background gris | `#F9FAFE` |
| Titres | Montserrat ExtraBold |
| Corps de texte | Quicksand Regular |

La page étant en thème sombre, le bleu `#1F3149` et le gris `#F9FAFE` de la
charte sont utilisés en inversion : `#F9FAFE` devient la couleur de texte,
et les fonds sont dérivés du violet `#281B59` assombri.

Tous les tokens sont regroupés dans le bloc `:root` en tête de
`assets/css/style.css` — changer la charte ne demande de toucher qu'à ce bloc.

## Sections

1. Header collant + menu mobile
2. Hero (accroche, double CTA, carte de parcours)
3. Bandeau défilant de réassurance
4. Chiffres clés (compteurs animés au scroll)
5. Formations (6 cartes)
6. La méthode en 4 étapes
7. Financement CPF + encart simulation
8. Témoignages
9. FAQ (accordéon)
10. CTA final + footer

## À compléter avant mise en ligne

- [ ] **Logo** : le pictogramme est une **reconstruction vectorielle** du logo
      officiel, retracée à partir du visuel fourni (aucun fichier source n'était
      disponible). Il est fidèle à l'œil mais n'est pas le fichier d'origine :
      si le vectoriel officiel existe, remplacer le `<symbol id="inrisMark">`
      dans `index.html` et les fichiers `assets/img/logo-inris*.svg`.
- [ ] **Témoignages** (section `#avis`) : contenus marqués `TODO` dans le HTML,
      à remplacer par de vrais avis clients.
- [ ] **Téléphone et e-mail** : `01 00 00 00 00` et
      `contact@inris-formations.com` sont des valeurs de remplacement.
- [ ] **Liens légaux** du footer (mentions légales, confidentialité, CGV).
- [ ] **Liens réseaux sociaux** du footer (`href="#"`).
- [ ] Brancher les CTA sur le vrai formulaire de contact / devis.

## Logo

Le logo est intégré en deux parties :

- **le pictogramme** (pastille dégradée, quatre pétales, deux silhouettes) est
  un SVG défini une seule fois dans `index.html` via `<symbol id="inrisMark">`,
  puis réutilisé dans le header et le footer avec `<use>` ;
- **le bloc typographique** (« INRI'S » / « FORMATIONS ») reste du texte réel
  en Montserrat ExtraBold — la police de la charte — ce qui le garde net à
  toutes les tailles et sélectionnable.

La charte prévoit le bloc typographique en bleu `#1F3149`, illisible sur fond
sombre : il passe donc en `#F9FAFE`, la couleur « background » de la charte.
Le fichier `assets/img/logo-inris.svg` conserve la version officielle en
`#1F3149` pour les supports sur fond clair.

> Note : les fichiers `logo-inris*.svg` composent le texte avec `<text>` en
> Montserrat. Utilisés dans une balise `<img>`, ils retomberont sur une police
> système, la police externe n'étant pas chargée dans ce contexte. Pour un
> usage hors du site (impression, e-mailing), demander une version aux
> contours vectorisés.

## Notes techniques

- Polices chargées depuis Google Fonts ; prévoir un hébergement local si le
  site doit fonctionner hors ligne ou sans requête tierce (RGPD).
- Accessibilité : navigation au clavier, `aria-expanded` sur le menu et la FAQ,
  focus visible, respect de `prefers-reduced-motion`.
- Sans JavaScript, la page reste entièrement lisible (les animations
  d'apparition ne sont activées que si la classe `js` est posée sur `<html>`).
- Aucun défilement horizontal de 390 px à 1440 px.
