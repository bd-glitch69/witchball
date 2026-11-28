// Witchball offline: this build's files, kept on the device (tools/phone_build.ts)
const CACHE = "witchball-26862f42d1d8";
const FILES = ["./","./assets/CanvasPool-C8TL04p2.js","./assets/RenderTargetSystem-Dvyqi79B.js","./assets/browserAll-CE2vXOMy.js","./assets/canvasUtils-30AujGy8.js","./assets/gate.worker-BNWTRnrq.js","./assets/getTexelRangeRects-j-NjzLRM.js","./assets/getTextureBatchBindGroup-DAd8pHX4.js","./assets/hub-B-cM70FE.js","./assets/hub-CF_SRoOZ.css","./assets/init-D9HNXRXC.js","./assets/main-4kfOk2Pr.css","./assets/main-DsTs2pOp.js","./assets/rolldown-runtime-XKyaHtl9.js","./assets/school_games-Cf7ePzkm.js","./assets/season.worker-Dmfu1My-.js","./assets/swm-sim-1.4.0-COSIaGZH.js","./assets/webworkerAll-B2SYqNC4.js","./hub.html","./icon-180.png","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest","./review.html"];
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
