// 比较 locales/zh 与 locales/en 下所有 json 文件的 key 是否有缺失
// 用法：node scripts/compare_locale_keys.js
const fs = require('fs');
const path = require('path');

const zhDir = path.join(__dirname, '../locales/zh');
const enDir = path.join(__dirname, '../locales/en');

function getJsonKeys(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    // 支持数组（如 faqs 等）下的对象 key 检查
    const keys = new Set();
    function extractKeys(obj, prefix = '') {
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => extractKeys(item, prefix + `[${idx}]`));
      } else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(k => {
          keys.add(prefix ? `${prefix}.${k}` : k);
          extractKeys(obj[k], prefix ? `${prefix}.${k}` : k);
        });
      }
    }
    extractKeys(data);
    return keys;
  } catch (e) {
    console.error('Error reading', filePath, e);
    return new Set();
  }
}

function compareKeys(fileZh, fileEn) {
  const keysZh = getJsonKeys(fileZh);
  const keysEn = getJsonKeys(fileEn);
  const missingInEn = [...keysZh].filter(k => !keysEn.has(k));
  const missingInZh = [...keysEn].filter(k => !keysZh.has(k));
  return { missingInEn, missingInZh };
}

function main() {
  const filesZh = fs.readdirSync(zhDir).filter(f => f.endsWith('.json'));
  const filesEn = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));
  const allFiles = Array.from(new Set([...filesZh, ...filesEn]));
  let hasDiff = false;
  allFiles.forEach(file => {
    const fileZh = path.join(zhDir, file);
    const fileEn = path.join(enDir, file);
    if (!fs.existsSync(fileZh) || !fs.existsSync(fileEn)) {
      console.log(`文件缺失: ${fileZh} 或 ${fileEn}`);
      hasDiff = true;
      return;
    }
    const { missingInEn, missingInZh } = compareKeys(fileZh, fileEn);
    if (missingInEn.length || missingInZh.length) {
      hasDiff = true;
      console.log(`\n[${file}]`);
      if (missingInEn.length) {
        console.log('  英文缺失 key:');
        missingInEn.forEach(k => console.log('    ' + k));
      }
      if (missingInZh.length) {
        console.log('  中文缺失 key:');
        missingInZh.forEach(k => console.log('    ' + k));
      }
    }
  });
  if (!hasDiff) {
    console.log('所有 key 均已对齐，无缺失。');
  }
}

if (require.main === module) {
  main();
}
