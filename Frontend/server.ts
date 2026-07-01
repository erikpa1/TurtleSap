// Minimal static file server for the OpenUI5 app, powered by Bun.
// UI5 itself is loaded from the public CDN (see webapp/index.html), so this
// server only needs to serve the files under ./webapp.
//
// Requests under /odata are proxied to the CAP backend (see ../backend/run.sh)
// so the browser talks to a single origin and no CORS setup is needed.

const ROOT = new URL("./webapp/", import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 3000);
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".properties": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/odata/")) {
      const target = new URL(url.pathname + url.search, BACKEND_URL);
      return fetch(target, {
        method: req.method,
        headers: req.headers,
        body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
      });
    }

    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = Bun.file(ROOT + pathname);

    if (await file.exists()) {
      const ext = pathname.slice(pathname.lastIndexOf("."));
      return new Response(file, {
        headers: { "Content-Type": MIME[ext] ?? "application/octet-stream" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`SAP Welcome App running at http://localhost:${server.port}`);
console.log(`Proxying /odata requests to ${BACKEND_URL}`);
