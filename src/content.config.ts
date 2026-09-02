import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const quotes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/quotes' }),
  schema: z.object({
    id: z.string(),
    content: z.string(),
    author: z.string(),
    authorSlug: z.string(),
    category: z.string(),
    categorySlug: z.string(),
    mood: z.enum([
      'reflective',
      'motivational',
      'serene',
      'bold',
      'melancholic',
      'joyful',
      'philosophical',
      'romantic',
    ]),
    tags: z.array(z.string()),
    theme: z.enum(['dark', 'light']).default('dark'),
    duration: z.number().default(8),
  }),
});

export const collections = { quotes };
