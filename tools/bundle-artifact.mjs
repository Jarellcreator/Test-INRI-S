// Aplatit `dist/` en un lot de fichiers publiables tel quel (prévisualisation
// d'artefact). L'artefact sert des chemins relatifs sans réécriture d'URL :
// on transforme donc les routes en répertoires (« /formations/x/ ») en pages
// « f-x.html », et on inline les CSS `_astro/` (le préfixe est réservé côté
// artefact). À relancer après chaque `npm run build`.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DIST = resolve(process.argv[2] ?? 'dist');
const OUT = resolve(process.argv[3] ?? 'bundle');

const PAGES = [
  ['index.html', 'accueil.html'],
  ['clair/index.html', 'clair.html'],
  ...['permis-b-accelere', 'permis-moto', 'groupe-lourd', 'permis-bateau',
      'recuperation-de-points', 'boite-automatique']
    .map((s) => [`formations/${s}/index.html`, `f-${s}.html`]),
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(`${DIST}/assets`, `${OUT}/assets`, { recursive: true });

for (const [src, dest] of PAGES) {
  let html = readFileSync(`${DIST}/${src}`, 'utf8');

  // CSS scopée d'Astro → inline (pas de dossier `_astro` dans l'artefact).
  html = html.replace(/<link rel="stylesheet" href="\/(_astro\/[^"]+)">/g, (_, f) => {
    const css = readFileSync(`${DIST}/${f}`, 'utf8');
    return `<style>${css}</style>`;
  });

  html = html.replace(/(href|src)="\/assets\//g, '$1="assets/');
  html = html.replace(/href="\/formations\/([a-z0-9-]+)\/([#?][^"]*)?"/g,
    (_, slug, suffixe) => `href="f-${slug}.html${suffixe ?? ''}"`);
  html = html.replace(/href="\/clair\/(#[^"]*)?"/g, (_, ancre) => `href="clair.html${ancre ?? ''}"`);
  // Accueil : « / » et « /#ancre ». Depuis l'accueil lui-même on garde l'ancre nue.
  const versAccueil = dest === 'accueil.html' ? '' : 'accueil.html';
  html = html.replace(/href="\/(#[^"]*)?"/g, (_, ancre) => `href="${versAccueil}${ancre ?? 'accueil.html'}"`);
  // Pages pas encore écrites : on neutralise plutôt que de casser la navigation.
  html = html.replace(/href="\/inscription(\?[^"]*)?"/g, 'href="#contact"');
  html = html.replace(
    /href="\/(contact|mentions-legales|confidentialite|cgv|accessibilite)\/?"/g, 'href="#contact"');
  // Idem pour la cible que le script de filtres réinjecte au clic.
  html = html.replace(/data-href-base="\/inscription[^"]*"/g, 'data-href-base="#contact"');

  mkdirSync(dirname(`${OUT}/${dest}`), { recursive: true });
  writeFileSync(`${OUT}/${dest}`, html);
}

const reste = [...new Set(
  PAGES.flatMap(([, d]) => [...readFileSync(`${OUT}/${d}`, 'utf8')
    .matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1])))];
if (reste.length) console.log('⚠ chemins absolus restants :', reste.join(', '));
for (const [, d] of PAGES) if (!existsSync(`${OUT}/${d}`)) console.log('⚠ manquant :', d);
console.log(`${PAGES.length} pages → ${OUT}`);
