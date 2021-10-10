var kAppSrcTimestamp = XXX_APP_SRC_TIMESTAMP_XXX;

var kAppSrcCacheNamePrefix = "shiro_musume_collection_app_src_";
var kAppSrcCacheName = kAppSrcCacheNamePrefix + kAppSrcTimestamp;
var kAppSrcFileList = XXX_APP_SRC_FILE_LIST_XXX;

var kDynamicResCacheName = "shiro_musume_collection_dynamic_res";
var kDynamicResDir = XXX_DYNAMIC_RES_DIR_XXX;

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
