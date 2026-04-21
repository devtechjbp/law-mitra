import { MetadataRoute } from 'next'

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lawmitra.org'
  
  const routes = [
    '',
    '/library',
    '/library/constitution',
    '/library/bns',
    '/library/bnss',
    '/library/bsa',
    '/library/corporate',
    '/library/civil',
    '/consultation',
    '/documents',
    '/cases',
    '/rights',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
