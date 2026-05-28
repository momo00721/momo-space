import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    titleCn: z.string().optional(),
    category: z.string(),
    client: z.string(),
    year: z.number(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    cover: z.string().optional(),
    images: z.array(z.string()).default([]),
    video: z.string().optional(),
  }),
});

export const collections = { projects };
