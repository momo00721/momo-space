import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getAllProjects(): Promise<Project[]> {
  return getCollection('projects', ({ data }) => {
    if (import.meta.env.PROD) return true;
    return true;
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects
    .filter((p) => p.data.featured)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getCollection('projects');
  if (category === 'all') return projects.sort((a, b) => a.data.order - b.data.order);
  return projects
    .filter((p) => p.data.category === category)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getCategories(): Promise<string[]> {
  const projects = await getCollection('projects');
  const cats = new Set(projects.map((p) => p.data.category));
  return ['all', ...Array.from(cats)];
}

export async function getAdjacentProjects(slug: string): Promise<{
  prev: Project | null;
  next: Project | null;
}> {
  const projects = await getCollection('projects');
  const sorted = projects.sort((a, b) => a.data.order - b.data.order);
  const idx = sorted.findIndex((p) => p.id === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
