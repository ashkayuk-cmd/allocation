/* Driver Allocation - service worker (build 473). Keeps a copy of the page for offline use and the home-screen app. */
var C="da-shell-1";
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.add(new Request("./",{cache:"reload"})).catch(function(){})}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==self.location.origin)return;
  var page=r.mode==="navigate"||/\/(index\.html)?$/.test(u.pathname);
  if(page){e.respondWith(fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(C).then(function(c){c.put("./",cp)})}return res}).catch(function(){return caches.match("./")}));return}
  e.respondWith(caches.match(r).then(function(hit){return hit||fetch(r)}))});
