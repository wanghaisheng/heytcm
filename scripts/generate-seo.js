// Script to generate sitemap.xml and robots.txt
const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFileSync } = require('fs');
const path = require('path');
const generateRobotsTxt = require('generate-robotstxt');

const BASE_URL = 'https://your-domain.com'; // TODO: Replace with your domain
const PAGES = [
  '/',
  '/about',
  '/support',
  // Add more routes as needed
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  PAGES.forEach(page => sitemap.write({ url: page, changefreq: 'weekly', priority: 0.7 }));
  sitemap.end();
  const data = await streamToPromise(sitemap);
  writeFileSync(path.join(__dirname, '../public/sitemap.xml'), data.toString());
  console.log('sitemap.xml generated');
}

async function generateRobots() {
  const robotsTxt = await generateRobotsTxt({
    policy: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  });
  writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt);
  console.log('robots.txt generated');
}

(async () => {
  await generateSitemap();
  await generateRobots();
})();
