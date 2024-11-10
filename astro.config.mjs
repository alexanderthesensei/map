// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://alexanderthesensei.github.io',
  base: 'map',
  output: 'server',
  adapter: netlify()
});