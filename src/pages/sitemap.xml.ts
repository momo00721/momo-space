import { getCollection } from 'astro:content';

export async function GET() {
  const siteUrl = 'https://momo00721.github.io/momo-space';

  const projects = await getCollection('projects');

  const urls = [
    '<url><loc>/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>',
    '<url><loc>/works/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>',
    '<url><loc>/info/</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>',
    ...projects.map(
      (p) =>
        `<url><loc>/works/${p.id}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((u) => `  ${u.replace(/<loc>(.*?)<\/loc>/, `<loc>${siteUrl}$1</loc>`)}`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
