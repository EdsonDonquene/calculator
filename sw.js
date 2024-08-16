const staticCacheName = "site-static-v0";
const dynamicCache = "dynamicCache-v0";
const assets = [
  "/",
  "sw.js",
  "rcs/css/style.css",
  "rcs/js/jquery.js",
  "app.js",
  "vendors/materialize/css/materialize.min.css",
  "vendors/materialize/css/materialize.css",
  "manifest.json",
  "vendors/materialize/js/materialize.min.js",
  "vendors/materialize/js/materialize.js",
  "https://fonts.googleapis.com/css2?family=Jersey+10&display=swap",
  
];

/* const limitCache = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCache(name, size));
      }
    });
  });
}; */

const limitCache = async (name, size) => {
  const cache = await caches.open(name);
  const keys = await cache.keys();

  if (keys.length > size) {
    await cache.delete(keys[0]);
    await limitCache(name, size);
  }
};

// install service worker
self.addEventListener("install", (evt) => {
  console.log('Installed');

  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching");

      // Use try-catch to handle potential errors with cache.addAll
      return cache.addAll(assets)
        .then(() => console.log("Caching successful"))
        .catch((error) => {
          console.error("Caching failed:", error);
          // Optionally, you may want to throw the error to reject the install event
          // throw error;
        });
    })
  );
});

// activate service worker - listening for activate event
self.addEventListener("activate", (evt) => {
  console.log('Active');
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cachesRes) => {
        return (
          cachesRes ||
          fetch(evt.request).then(async (fetchRes) => {
            // Ensure the response is valid before caching
            if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== "basic") {
              return fetchRes;
            }

            const cache = await caches.open(dynamicCache);
            cache.put(evt.request.url, fetchRes.clone());
            limitCache(dynamicCache, 3);
            return fetchRes;
          })
        );
      })
      .catch((error) => {
        console.error('Fetch error:', error);

        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("index.html");
        }
      })
  );
});

//fetch event handler
/* self.addEventListener("fetch", (evt) => {
  console.log("fetch", evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cachesRes) => {
        return (
          cachesRes ||
          fetch(evt.request).then(async (fetchRes) => {
            const cache = await caches.open(dynamicCache);
            cache.put(evt.request.url, fetchRes.clone());
            limitCache(dynamicCache, 30);
            return fetchRes;
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".php") > -1) {
          return caches.match("fallback.php");
        }
      })
  );
});
 */