import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { slugifyQuote } from '../../../utils/slug';

export const getStaticPaths: GetStaticPaths = async () => {
  const allQuotes = await getCollection('quotes');
  const categoryMap: Record<string, any[]> = {};

  allQuotes.forEach((q) => {
    const slug = q.data.categorySlug;
    if (!categoryMap[slug]) categoryMap[slug] = [];
    categoryMap[slug].push({
      id: q.data.id,
      content: q.data.content,
      author: q.data.author,
      authorSlug: q.data.authorSlug,
      category: q.data.category,
      categorySlug: q.data.categorySlug,
      mood: q.data.mood,
      slug: slugifyQuote(q.data.content),
      tags: q.data.tags || [],
      sourceWork: q.data.sourceWork,
      explanation: q.data.explanation || q.data.story,
      practicalInsight: q.data.practicalInsight,
      reflectionPrompt: q.data.reflectionPrompt,
    });
  });

  return Object.entries(categoryMap).map(([slug, quotes]) => ({
    params: { slug },
    props: {
      categorySlug: slug,
      categoryName: quotes[0]?.category || slug,
      count: quotes.length,
      quotes,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  return new Response(JSON.stringify(props), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
