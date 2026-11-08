export default function sitemap() {
  return [
    {
      url: 'https://reuben-roy.explosion.fun',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://reuben-roy.explosion.fun/career',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
