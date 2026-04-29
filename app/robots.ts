import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/'], // Protect private routes
    },
    sitemap: 'https://dattasable.com/sitemap.xml',
  };
}
