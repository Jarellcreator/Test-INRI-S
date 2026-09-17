# INRI'S Formations — Page d'accueil

Page d'accueil statique (HTML / CSS / JS), thème sombre premium, sans aucune
dépendance ni étape de build. Ouvrir `index.html` suffit.

## Démarrer

```bash
npm install
npm run dev      # serveur local sur http://localhost:4321
npm run build    # génère le site statique dans dist/
npm run preview  # prévisualise dist/
```

Le site est bâti avec **Astro**. `npm run build` produit des fichiers HTML
statiques dans `dist/` : aucun serveur applicatif n'est nécessaire, le dossier
se dépose tel quel chez n'importe quel hébergeur (Netlify, Vercel, OVH…).

## Structure

```
src/
  data/formations.js          Source unique des formations
  layouts/Base.astro          <head>, header, footer — écrits UNE fois
  components/
    Header.astro              Header du site
    Footer.astro              Pied de page
    Accueil.astro             Contenu de la page d'accueil
    CarteFormation.astro      Une carte, construite depuis les données
  pages/
    index.astro               /            (thème sombre)
    clair.astro               /clair/      (thème clair)
    formations/[slug].astro   /formations/<slug>/ — une page par formation
public/
  assets/css/style.css        Feuille de style unique (tokens en tête)
  assets/css/theme-clair.css  Déclinaison claire : redéfinit les tokens
  assets/js/main.js           Header collant, menu, accordéon, animations
  assets/img/                 Logo officiel et pictogramme
```

## Ajouter une formation

Ajouter un objet dans `src/data/formations.js`. Cela crée automatiquement :

- sa carte sur la page d'accueil ;
- sa page complète à `/formations/<slug>/` ;
- son entrée dans le menu du pied de page ;
- ses liens croisés depuis les autres pages formation.

Aucun autre fichier à modifier. C'est le principe de toute la structure : le
header, le pied de page et le gabarit des pages formation n'existent qu'en un
seul exemplaire.

## Convention de transition entre pages

**Règle : toute navigation entre pages doit se comporter comme le passage
« page formation → Nos formations ».** Concrètement, trois points :

1. **Le contenu apparaît en fondu**, jamais d'un coup. Les blocs portent la
   classe `.reveal` et sont révélés par l'observateur de `main.js` au fil du
   défilement. Ne jamais forcer `is-in` au chargement : le contenu surgirait
   sans transition et la page détonnerait avec le reste du site.

2. **Les cartes d'une même grille apparaissent en cascade**, 70 ms d'écart,
   plafonnée à 350 ms. La liste des conteneurs concernés est dans `main.js`
   (`cards`, `cat__grille`, `method`, `quotes`, `faq`) — y ajouter toute
   nouvelle grille de cartes.

3. **L'arrivée sur une ancre est instantanée et déjà bien cadrée.** `main.js`
   repositionne après l'événement `load`, sans animation. Ne pas ajouter de
   `scroll-margin-top` sur une ancre : le `scroll-padding-top` global de
   `<html>` réserve déjà la hauteur du header collant, et les deux
   s'additionneraient.

Le seul cas où l'on force l'affichage est un **changement de filtre** : une
carte masquée par `display:none` n'est jamais vue par l'observateur, elle
resterait invisible en réapparaissant. Voir `appliquer(revelerAussitot)` dans
`CataloguePermisB.astro`.

## Ajouter une page

Créer un fichier dans `src/pages/`. Le nom du fichier devient l'adresse
(`src/pages/contact.astro` → `/contact/`). Utiliser le gabarit :

```astro
---
import Base from '../layouts/Base.astro';
---
<Base titre="…" description="…" theme="sombre" racine="/">
  …contenu…
</Base>
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

## Version claire

`clair.html` reprend `index.html` et charge `assets/css/theme-clair.css` en
plus. Ce fichier ne redéfinit que les tokens du bloc `:root` : aucune règle de
mise en page n'est dupliquée, les deux versions partagent `style.css`. Un
sélecteur en pied de page fait passer de l'une à l'autre.

Sur fond clair, la charte retrouve ses rôles d'origine — background `#F9FAFE`,
texte `#1F3149`, texte bis `#9AA6B7` — et le dégradé `#281B59 → #C10058` ses
valeurs exactes (sur fond sombre il devait être éclairci pour rester lisible).

**Il n'y a pas d'accent secondaire distinct : le dégradé et le violet portent
tout.** Le vert `#00E5AC` de la charte n'est pas utilisé. Chaque rôle a son
traitement, ce qui évite le tout-rose qui virait au voyant d'alerte :

| Rôle | Traitement |
| --- | --- |
| Formes pleines : conteneurs d'icônes, étiquette phare | Dégradé plein, pictogramme ou texte en réserve blanche |
| Traits et coches | Violet `#281B59` (clair) / `#A08CE0` (sombre) |
| Étiquettes secondaires | Contour violet, fond transparent |
| Texte d'état (« Validé », « En cours ») | Rose `#C10058` (clair) / `#FF7FB5` (sombre) |
| Emphase dans un titre (« 100 % ») | Texte en dégradé |

Règle à tenir : **le rose ne s'emploie jamais en aplat teinté sur une petite
forme.** C'est cette combinaison — pastille de quelques pixels, fond rose pâle,
liseré rose — qui produisait une sensation de rouge d'échec. En texte, le même
rose passe très bien.

## Logo

Le logo est le **fichier officiel**, extrait en vectoriel du PDF de charte
graphique (`Charte_graphique_INRIS.pdf`, page 1) avec PyMuPDF. Aucun tracé
n'est redessiné.

`logo-inris.svg` est le fichier d'origine, intact — c'est celui que charge la
version claire. `logo-inris-blanc.svg` en reprend l'intégralité avec deux
adaptations pour fond sombre, et rien d'autre :

1. le bloc typographique passe de `#1F3149` à `#F9FAFE` ;
2. un disque `#F9FAFE` est glissé **sous** la pastille. Dans le fichier
   officiel, les deux silhouettes sont des **découpes** et non des aplats
   blancs : sur fond clair le blanc de la page transparaît, sur fond sombre
   c'était le noir qui remontait. Ce disque leur rend leur blanc.

> **À signaler au graphiste** : le fichier officiel comporte un filet clair
> (`#F1F4FE`) qui cerne le pictogramme. Invisible sur fond clair, il se voit
> sur fond sombre. Si une déclinaison pour fonds sombres existe, elle est
> préférable — je n'ai rien retouché.

## Notes techniques

- Polices chargées depuis Google Fonts ; prévoir un hébergement local si le
  site doit fonctionner hors ligne ou sans requête tierce (RGPD).
- Accessibilité : navigation au clavier, `aria-expanded` sur le menu et la FAQ,
  focus visible, respect de `prefers-reduced-motion`.
- Sans JavaScript, la page reste entièrement lisible (les animations
  d'apparition ne sont activées que si la classe `js` est posée sur `<html>`).
- Aucun défilement horizontal de 390 px à 1440 px.
