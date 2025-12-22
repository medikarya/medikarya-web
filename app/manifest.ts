import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'MediKarya',
        short_name: 'MediKarya',
        description: 'AI-Powered Medical Education Platform',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563EB',
        icons: [
            {
                src: 'https://www.medikarya.in/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: 'https://www.medikarya.in/icon.png', // Fallback if image exists
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'https://www.medikarya.in/apple-icon.png', // Fallback if image exists
                sizes: '180x180',
                type: 'image/png'
            }
        ],
    }
}
