# INRI'S Formations — Page d'accueil

Page d'accueil statique (HTML / CSS / JS), thème sombre premium, sans aucune
dépendance ni étape de build. Ouvrir `index.html` suffit.

## Structure

```
index.html              Page complète
assets/css/style.css    Feuille de style unique (tokens en tête de fichier)
assets/js/main.js       Header collant, menu mobile, accordéon FAQ, animations
assets/img/logo-inris.svg        Logo officiel, extrait du PDF de charte
assets/img/logo-inris-blanc.svg  Idem, bloc typographique en blanc
assets/img/picto-inris.svg       Pictogramme seul (favicon)
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

**L'accent secondaire est le vert `#00E5AC`**, seule couleur classée
« SECONDAIRES » dans la charte. Sur fond clair il se dédouble par lisibilité :
`#00E5AC` sur les formes pleines et les traits épais, `#00815C` (même teinte
assombrie) dès qu'il porte du texte — `#00E5AC` n'atteint que 1,7:1 sur blanc.

Deux endroits échappent volontairement à cet accent :

- **les coches des cartes formation** prennent le violet `--check-formation` —
  le vert y est écarté, et le rose sur une petite forme se lit comme une
  alerte. L'étiquette « Reconversion » reste verte ;
- **l'étiquette « Le plus demandé »** est une pastille en dégradé plein avec
  texte blanc, plutôt qu'un aplat rose cerné de rose qui virait au rouge.

## Logo

Le logo est le **fichier officiel**, extrait en vectoriel du PDF de charte
graphique (`Charte_graphique_INRIS.pdf`, page 1) avec PyMuPDF. Aucun tracé
n'est redessiné.

Une seule adaptation, et elle est isolée dans un fichier séparé : le bloc
typographique est en `#1F3149`, illisible sur fond sombre. `logo-inris-blanc.svg`
le passe en `#F9FAFE` ; tout le reste du fichier est identique. La version
claire charge `logo-inris.svg`, aux couleurs d'origine.

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
