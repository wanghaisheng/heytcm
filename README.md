# HeyTCM Website

## 多语言 key 校验脚本使用说明

本项目已集成多语言 key 一致性校验脚本，便于开发者快速检查中英文等多语言 JSON 文件结构是否一致。

### 快速使用

在项目根目录下执行：

```bash
npm run compare-locale-keys
```

脚本会自动对比 `locales/zh/` 与 `locales/en/` 下的 JSON 文件，输出缺失或多余的 key，便于及时修复。

### 脚本原理
- 脚本位置：`scripts/compare_locale_keys.cjs`
- 支持自定义扩展
- 推荐在每次多语言内容调整后运行，保持 key 一致性

---
