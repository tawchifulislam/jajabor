export default function robots() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jajabor.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/add', '/places/*/edit', '/my-places', '/trips', '/my-trips'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
