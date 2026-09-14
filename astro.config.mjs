import { defineConfig } from 'astro/config';

export default defineConfig({
  // Le site est entièrement statique : `npm run build` produit des fichiers
  // HTML à déposer chez n'importe quel hébergeur.
  output: 'static',
  // À renseigner avec le domaine définitif : sert à générer le sitemap et
  // les URL absolues des balises Open Graph.
  site: 'https://www.inris-formations.com',
  build: { format: 'directory' },
});
