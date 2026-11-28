// Witchball offline: this build's files, kept on the device (tools/phone_build.ts)
const CACHE = "witchball-39a031528a5f";
const FILES = ["./","./assets/CanvasPool-C8TL04p2.js","./assets/RenderTargetSystem-Dvyqi79B.js","./assets/browserAll-B2a95-oL.js","./assets/canvasUtils-30AujGy8.js","./assets/gate.worker-U-3j87WR.js","./assets/getTexelRangeRects-j-NjzLRM.js","./assets/getTextureBatchBindGroup-DAd8pHX4.js","./assets/hub-B3GqFr_u.js","./assets/hub-CsLobWKK.css","./assets/init-CIYSc9vT.js","./assets/main-BfYGrlrT.js","./assets/main-BqW8c2e1.css","./assets/rolldown-runtime-XKyaHtl9.js","./assets/school_games-C_8aav_Y.js","./assets/season.worker-BEtMep8p.js","./assets/swm-sim-1.4.0-COSIaGZH.js","./assets/swm-sim-1.5.0-yVJTRcYn.js","./assets/webworkerAll-DbeJnq3L.js","./hub.html","./icon-180.png","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest","./review.html"];
// every file is asked of the server afresh ("reload" goes past the browser's own cache: Pages lets a page be reused for
// ten minutes, and a page of the build before, kept here, would ask for scripts this build no longer has). All or
// nothing: one file that fails fails the install, and the build before stays in charge with its own files
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: "reload" }))))));
// a new build takes over once every page of the old one is closed; then the old files go
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("witchball-") && k !== CACHE).map((k) => caches.delete(k))))));
// cache first (a watched game's address carries its game in the query: the page is the same file; the scripts are
// asked for with an Origin header the cached requests lacked, so a server's Vary must not split them)
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true, ignoreVary: true }).then((hit) => hit || fetch(e.request)));
});
