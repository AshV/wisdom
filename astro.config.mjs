// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ashishvishwakarma.com',
  base: '/wisdom/',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude single quote pages (both text slug and short ID) to eliminate thin content
        if (page.includes('/quote/')) return false;
        // Exclude tag taxonomy archives to avoid micro-content index bloat
        if (page.includes('/tag/')) return false;
        return true;
      },
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
