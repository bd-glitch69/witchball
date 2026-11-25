// Witchball offline: this build's files, kept on the device (tools/phone_build.ts)
const CACHE = "witchball-be3471081fc0";
const FILES = ["./","./assets/CanvasPool-Cbwekkjc.js","./assets/RenderTargetSystem-ChTAOV-2.js","./assets/browserAll-cW4OK7dG.js","./assets/canvasUtils-B5uSwcsy.js","./assets/career-haFUHsli.js","./assets/gate.worker-BNWTRnrq.js","./assets/getTexelRangeRects-yRm_-M2y.js","./assets/getTextureBatchBindGroup-2lic-O9b.js","./assets/hub-DHHoWJM9.js","./assets/hub-i0yH0IGC.css","./assets/init-CTnAuOV6.js","./assets/season.worker-DhTe9Rb0.js","./assets/swm-sim-1.4.0-COSIaGZH.js","./assets/viewer-CQXap2Mn.js","./assets/viewer-Dg37IJCu.css","./assets/webworkerAll-CT3Hvwwk.js","./hub.html","./icon-180.png","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest"];
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
