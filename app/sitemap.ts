import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://chabaqa.io'
  return [
    { url: `${base}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/ar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ]
}
