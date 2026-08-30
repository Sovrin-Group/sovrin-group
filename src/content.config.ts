import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const whitepapers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/whitepapers' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    pdf: z.string(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { whitepapers };
