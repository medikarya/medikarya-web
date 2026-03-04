import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.medikarya.in'

    const routes = [
        '',
        '/blog',
        '/contact',
        '/privacy',
        '/terms',
        '/cookies',
        '/tutorials',
        '/case-studies',
        '/contribute',
        '/api-docs',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}
