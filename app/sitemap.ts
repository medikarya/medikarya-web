import { MetadataRoute } from 'next'

const blogSlugs = [
    'ai-revolutionizing-medical-education',
    'feynman-technique-clinical-reasoning',
    'sepsis-case-based-approach',
    'why-medical-students-need-simulation',
    'breaking-down-diagnostic-process',
    'future-ai-assisted-diagnosis',
]

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.medikarya.in'

    const staticRoutes = [
        '',
        '/about',
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

    const blogRoutes = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...blogRoutes]
}

