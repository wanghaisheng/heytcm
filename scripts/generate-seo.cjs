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

function generateAllPages(routes, langs, defaultLang = 'zh') {
  // 生成所有页面链接，并根据默认语言去重
  const pageSet = new Set();
  routes.forEach(route => {
    // 首页特殊处理
    if (route === '/') {
      pageSet.add('/');
      langs.forEach(lang => {
        if (lang !== defaultLang) {
          pageSet.add(`/${lang}`);
        }
      });
    } else {
      // 默认语言用 /xxx 形式，非默认语言用 /lang/xxx
      pageSet.add(route);
      langs.forEach(lang => {
        if (lang !== defaultLang) {
          pageSet.add(`/${lang}${route}`);
        }
      });
    }
  });
  // 去重：如果 / 和 /zh 都有且 defaultLang=zh，则去掉 /zh
  if (langs.includes(defaultLang)) {
    if (pageSet.has(`/${defaultLang}`) && pageSet.has('/')) {
      pageSet.delete(`/${defaultLang}`);
    }
  }
  return Array.from(pageSet);
}

// 自动检测 Vite build 输出目录（支持 ts/js 配置），无则默认 dist
function getViteOutDir() {
  let outDir = 'dist';
  try {
    const tsConfigPath = path.join(__dirname, '../vite.config.ts');
    const jsConfigPath = path.join(__dirname, '../vite.config.js');
    let config = null;
    if (require('fs').existsSync(jsConfigPath)) {
      config = require(jsConfigPath);
    } else if (require('fs').existsSync(tsConfigPath)) {
      // 用 ts-node/register 支持 ts 配置
      require('ts-node').register({ transpileOnly: true });
      config = require(tsConfigPath);
    }
    if (config && config.build && config.build.outDir) {
      outDir = config.build.outDir;
    } else if (config && config.default && config.default.build && config.default.build.outDir) {
      outDir = config.default.build.outDir;
    }
  } catch (e) {
    // ignore, fallback to dist
  }
  return outDir;
}
const OUT_DIR = getViteOutDir();

async function generateSitemap() {
  const routes = parseRoutes();
  const pages = generateAllPages(routes, LANGS);
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  pages.forEach(page => sitemap.write({ url: page, changefreq: 'weekly', priority: 0.7 }));
  sitemap.end();
  const data = await streamToPromise(sitemap);
  writeFileSync(path.join(__dirname, `../${OUT_DIR}/sitemap.xml`), data.toString());
  console.log(`sitemap.xml generated in ${OUT_DIR}`);
}

async function generateRobots() {
  // 参考 robots.example 生成 robots.txt
  const robotsExample = readFileSync(ROBOTS_EXAMPLE_PATH, 'utf-8');
  writeFileSync(path.join(__dirname, `../${OUT_DIR}/robots.txt`), robotsExample);
  console.log(`robots.txt generated in ${OUT_DIR} (from robots.example)`);
}

(async () => {
  await generateSitemap();
  await generateRobots();
})();
