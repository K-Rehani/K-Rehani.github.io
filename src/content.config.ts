import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const resource = z.object({ label: z.string(), url: z.string().refine((s) => /^https?:\/\//.test(s) || s.startsWith('/'), 'Use an https URL or a /local/path'), kind: z.enum(['pdf', 'code', 'web', 'slides']).default('web') });
const common = { title: z.string(), summary: z.string(), draft: z.boolean().default(false) };
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({ ...common, institution: z.string(), supervisor: z.string().optional(), supervisorUrl: z.string().url().optional(), dates: z.string(), start: z.coerce.date(), category: z.string(), topics: z.array(z.string()).default([]), resources: z.array(resource).default([]) }),
});
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({ ...common, subject: z.string(), order: z.number().default(0), kind: z.enum(['Study guide', 'Personal notes', 'Reading list']).default('Personal notes'), resources: z.array(resource).default([]) }),
});
const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({ ...common, category: z.enum(['Formal coursework', 'Audited coursework', 'Independent study / reading']), status: z.string().optional(), institution: z.string().optional(), order: z.number().default(0) }),
});
export const collections = { research, notes, courses };
