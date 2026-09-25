import { defaultCache } from '@serwist/next/worker';
import { Serwist, NetworkFirst, CacheFirst, ExpirationPlugin } from 'serwist';

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ url }) => url.hostname === 'res.cloudinary.com',
      handler: new CacheFirst({
        cacheName: 'jajabor-images',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      }),
    },
    {
      matcher: ({ request, url }) =>
        url.origin === self.location.origin &&
        !url.pathname.startsWith('/api') &&
        (request.mode === 'navigate' || request.headers.get('RSC') === '1'),
      handler: new NetworkFirst({
        cacheName: 'jajabor-pages',
        networkTimeoutSeconds: 3,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 80,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          }),
          {
            cacheKeyWillBeUsed: async ({ request }) => {
              const isRSC = request.headers.get('RSC') === '1';
              return isRSC ? `${request.url}::rsc` : request.url;
            },
          },
        ],
      }),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
