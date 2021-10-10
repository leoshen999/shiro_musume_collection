var kAppSrcCacheNamePrefix = "shiro_musume_collection_app_src_";
var kAppSrcCacheName = kAppSrcCacheNamePrefix + XXX_APP_SRC_TIMESTAMP_XXX;
var kAppSrcFileList = XXX_APP_SRC_FILE_LIST_XXX;

var kDynamicResCacheName = "shiro_musume_collection_dynamic_res";
var kDynamicResDir = XXX_DYNAMIC_RES_DIR_XXX;

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

    // Fetch from network and write to cache.
    var fetchPromise = (async () => {
      var networkResp = await fetch(e.request);
      e.waitUntil(cache.put(e.request, networkResp.clone()));
      return networkResp;
    })();

    // Use cache if presented. Else, use network.
    if (cacheResp) {
      e.waitUntil(fetchPromise);
      return cacheResp;
    }
    return fetchPromise;
  })();

  e.respondWith(promise);
});
