const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;

// Simple HTML fetcher (no Puppeteer needed for static Webflow sites)
function fetchHTML(targetUrl) {
  return new Promise((resolve, reject) => {
    const mod = targetUrl.startsWith('https') ? https : http;
    const req = mod.get(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WebflowScraper/1.0)' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchHTML(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  const parsed = url.parse(req.url, true);

  if (parsed.pathname === '/crawl') {
    const targetUrl = parsed.query.url;
    if (!targetUrl) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Missing url param' }));
      return;
    }
    try {
      console.log('Crawling:', targetUrl);
      const html = await fetchHTML(targetUrl);
      res.writeHead(200);
      res.end(JSON.stringify({ html, url: targetUrl, length: html.length }));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`\n✓ Webflow Scraper server running on http://localhost:${PORT}`);
  console.log(`  Open index.html in your browser to use the tool.\n`);
});
