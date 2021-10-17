var kAppSrcTimestamp = "20211017122538953";

var kAppSrcCacheNamePrefix = "shiro_musume_collection_app_src_";
var kAppSrcCacheName = kAppSrcCacheNamePrefix + kAppSrcTimestamp;
var kAppSrcFileList = ["/shiro_musume_collection/","/shiro_musume_collection/imgs/favicon.ico","/shiro_musume_collection/_next/static/chunks/956-d5cc1f7e2d0ebe48bf94.js","/shiro_musume_collection/_next/static/chunks/framework-2191d16384373197bc0a.js","/shiro_musume_collection/_next/static/chunks/main-011e14431c997dd5213e.js","/shiro_musume_collection/_next/static/chunks/pages/_app-d86f3b8ad9d0d1c800a2.js","/shiro_musume_collection/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js","/shiro_musume_collection/_next/static/chunks/pages/index-2d02bddc9205cd2e0159.js","/shiro_musume_collection/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js","/shiro_musume_collection/_next/static/chunks/webpack-711a939a3dcc7712b049.js","/shiro_musume_collection/_next/static/css/3aa565435d92f6ee74d3.css","/shiro_musume_collection/_next/static/xCUS80RRqkdU5YQknEXKA/_buildManifest.js","/shiro_musume_collection/_next/static/xCUS80RRqkdU5YQknEXKA/_ssgManifest.js","/shiro_musume_collection/weapon_images/bell.png","/shiro_musume_collection/weapon_images/book.png","/shiro_musume_collection/weapon_images/bow.png","/shiro_musume_collection/weapon_images/cannon.png","/shiro_musume_collection/weapon_images/crossbow.png","/shiro_musume_collection/weapon_images/dancing.png","/shiro_musume_collection/weapon_images/gaunlets.png","/shiro_musume_collection/weapon_images/gun.png","/shiro_musume_collection/weapon_images/hammer.png","/shiro_musume_collection/weapon_images/mace.png","/shiro_musume_collection/weapon_images/oonusa.png","/shiro_musume_collection/weapon_images/other.png","/shiro_musume_collection/weapon_images/scythe.png","/shiro_musume_collection/weapon_images/shield.png","/shiro_musume_collection/weapon_images/spear.png","/shiro_musume_collection/weapon_images/spell.png","/shiro_musume_collection/weapon_images/staff.png","/shiro_musume_collection/weapon_images/sword.png","/shiro_musume_collection/weapon_images/throwing.png","/shiro_musume_collection/weapon_images/whip.png"];

var kDynamicResCacheName = "shiro_musume_collection_dynamic_res";
var kDynamicResDir = "/shiro_musume_collection/musume_images/";

var kTimestampHeaderName = "X-Shiro-Musume-Collection-Timestamp";

self.addEventListener("install", (e) => {
  // Push this service worker to activate.
  self.skipWaiting();

  // Download src of new version app.
  var promise = (async () => {
    var cache = await caches.open(kAppSrcCacheName);
    await cache.addAll(kAppSrcFileList);
  })();

  e.waitUntil(promise);
});

self.addEventListener("activate", (e) => {
  // Take control for all clients in the scope.
  if (self.clients && clients.claim) clients.claim();

  // Remove out-of-date caches.
  var promise = (async () => {
    var keys = await caches.keys();
    var outOfDateKeys = keys.filter(
      (key) =>
        key.startsWith(kAppSrcCacheNamePrefix) && key !== kAppSrcCacheName
    );

    await Promise.all(outOfDateKeys.map((oodk) => caches.delete(oodk)));
  })();

  e.waitUntil(promise);
});

self.addEventListener("fetch", (e) => {
  var promise = (async () => {
    var url = new URL(e.request.url);
    var cacheName = "";
    if (url.href.startsWith(self.registration.scope)) {
      if (url.pathname.startsWith(kDynamicResDir))
        cacheName = kDynamicResCacheName;
      else if (kAppSrcFileList.includes(url.pathname))
        cacheName = kAppSrcCacheName;
    }

    // For non-cacheable url, fetch directly.
    if (!cacheName) return fetch(e.request);

    // Get from cache.
    var cache = await caches.open(cacheName);
    var cacheResp = await cache.match(e.request);

    if (cacheName === kAppSrcCacheName) {
      // For app src, use cache and skip network if it is in cache.
      if (cacheResp) return cacheResp;

      // Otherwise, fetch then cache.
      var networkResp = await fetch(e.request);
      e.waitUntil(cache.put(e.request, networkResp.clone()));
      return networkResp;
    } else {
      // For dynamic res, use cache and skip network if it is in cache and new
      // enough (by timestamp).
      if (
        cacheResp &&
        cacheResp.headers.has(kTimestampHeaderName) &&
        cacheResp.headers.get(kTimestampHeaderName) === kAppSrcTimestamp
      )
        return cacheResp;

      // Otherwise, perform a stale-while-revalidate strategy.
      var fetchPromise = (async () => {
        var networkResp = await fetch(e.request);
        var newHeaders = new Headers(networkResp.headers);
        newHeaders.append(kTimestampHeaderName, kAppSrcTimestamp);
        const newResp = new Response(networkResp.body, {
          status: networkResp.status,
          statusText: networkResp.statusText,
          headers: newHeaders,
        });
        e.waitUntil(cache.put(e.request, newResp.clone()));
        return newResp;
      })();
      if (cacheResp) {
        e.waitUntil(fetchPromise);
        return cacheResp;
      }
      return fetchPromise;
    }
  })();

  e.respondWith(promise);
});
