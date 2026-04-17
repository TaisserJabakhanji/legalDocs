import { MetadataRoute } from 'next';

const locales = ['ar', 'en'];
const routes = [
  { route: '/', priority: 1.0, changeFrequency: 'weekly' },
  { route: '/templates', priority: 0.9, changeFrequency: 'weekly' },
  { route: '/pricing', priority: 0.85, changeFrequency: 'monthly' },
  { route: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { route: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { route: '/blog', priority: 0.5, changeFrequency: 'weekly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return routes.flatMap(({ route, priority, changeFrequency }) =>
    locales.map((locale) => {
      const langPrefix = locale === 'ar' ? '/ar' : '/en';
      const path = route === '/' ? '' : route;
      const url = `${baseUrl}${langPrefix}${path}`;

      return {
        url,
        lastModified: new Date(),
        changeFrequency: changeFrequency as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
        priority,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar${path}`,
            en: `${baseUrl}/en${path}`,
          },
        },
      };
    })
  );
}