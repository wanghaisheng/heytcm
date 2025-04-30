// Script to generate sitemap.xml and robots.txt
// 自动解析 App.tsx 路由，生成 sitemap.xml 和 robots.txt，支持多语言和 AI 爬虫优化
const { SitemapStream, streamToPromise } = require('sitemap');
const { writeFileSync, readFileSync } = require('fs');
const path = require('path');
const generateRobotsTxt = require('generate-robotstxt');

const BASE_URL = 'https://heytcm.com';
const APP_PATH = path.join(__dirname, '../src/App.tsx');
const ROBOTS_EXAMPLE_PATH = path.join(__dirname, '../robots.example');
const LANGS = ['en', 'zh']; // 可扩展

// 解析 App.tsx 路由
function parseRoutes() {
  const content = readFileSync(APP_PATH, 'utf-8');
  const routeRegex = /<Route path="([^"]+)"/g;
  let match;
  const routes = new Set();
  while ((match = routeRegex.exec(content)) !== null) {
    let route = match[1];
    // 只保留主路由，不带:lang参数的
    if (!route.startsWith(':lang')) {
      routes.add(route.startsWith('/') ? route : '/' + route);
    }
  }
  return Array.from(routes);
}

function generateAllPages(routes, langs) {
  const pages = new Set();
  const defaultLang = 'zh';
  routes.forEach(route => {
    // 只为主路由添加默认语言路径（/），不重复添加 /zh
    if (route === '/') {
      pages.add('/');
      langs.slice(1).forEach(lang => {
        pages.add(`/${lang}`);
      });
    } else {
      pages.add(route);
      langs.forEach(lang => {
        pages.add(`/${lang}${route}`);
      });
    }
  });
  return Array.from(pages);
}

async function generateSitemap() {
  const routes = parseRoutes();
  const pages = generateAllPages(routes, LANGS);
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  pages.forEach(page => sitemap.write({ url: page, changefreq: 'weekly', priority: 0.7 }));
  sitemap.end();
  const data = await streamToPromise(sitemap);
  writeFileSync(path.join(__dirname, '../public/sitemap.xml'), data.toString());
  console.log('sitemap.xml generated');
}

async function generateRobots() {
  // 参考 robots.example 生成 robots.txt
  const robotsExample = readFileSync(ROBOTS_EXAMPLE_PATH, 'utf-8');
  writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsExample);
  console.log('robots.txt generated (from robots.example)');
}

(async () => {
  await generateSitemap();
  await generateRobots();
})();
