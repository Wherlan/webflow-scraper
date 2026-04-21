const https = require('https');
const http = require('http');

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const targetUrl = req.query.url;
  if (!targetUrl) { res.status(400).json({ error: 'Missing url param' }); return; }

  try {
    const html = await fetchHTML(targetUrl);
    res.status(200).json({ html, url: targetUrl, length: html.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
