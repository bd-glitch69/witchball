// Witchball offline: this build's files, kept on the device (tools/phone_build.ts)
const CACHE = "witchball-3d2b0383d8cc";
const FILES = ["./","./assets/CanvasPool-Cbwekkjc.js","./assets/RenderTargetSystem-ChTAOV-2.js","./assets/browserAll-BIjzvndE.js","./assets/canvasUtils-B5uSwcsy.js","./assets/career-KvBNRwJ8.js","./assets/gate.worker-BNWTRnrq.js","./assets/getTexelRangeRects-yRm_-M2y.js","./assets/getTextureBatchBindGroup-2lic-O9b.js","./assets/hub-BAcbj0us.css","./assets/hub-CWzLCFMw.js","./assets/init-DFCskRDu.js","./assets/season.worker-CTAjqAoz.js","./assets/swm-sim-1.4.0-COSIaGZH.js","./assets/viewer-BUtFsiaQ.js","./assets/viewer-Dg37IJCu.css","./assets/webworkerAll-CR7fmokV.js","./hub.html","./icon-180.png","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))));
// a new build takes over once every page of the old one is closed; then the old files go
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("witchball-") && k !== CACHE).map((k) => caches.delete(k))))));
// cache first (a watched game's address carries its game in the query: the page is the same file; the scripts are
// asked for with an Origin header the cached requests lacked, so a server's Vary must not split them)
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true, ignoreVary: true }).then((hit) => hit || fetch(e.request)));
});
