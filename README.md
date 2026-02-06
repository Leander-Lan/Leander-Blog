# Leander’s Blog

一个带有终端美学的个人博客站点，记录设计、开发与生活。  
风格偏向赛博 / 终端 UI，强调动效、排版与阅读体验。

## 特性

- 终端风格 UI：导航、组件与动效统一为工业科幻风格
- 文章检索：站内搜索弹层，支持标题与正文关键词
- Markdown 渲染：GFM + 代码高亮 + 自定义 Scode 提示块
- 动态背景与页面过渡：增强整体沉浸感
- 友链 / 关于 / 隐私等独立页面

## 技术栈

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Prisma
- React Markdown + Rehype Highlight

## 本地开发

```bash
npm install
npm run dev
```

打开 http://localhost:3000 查看站点。

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 目录结构

```
src/
  app/            路由与页面
  components/     页面与 UI 组件
  lib/            数据请求与工具
public/           静态资源
```

## 数据接口

当前文章数据来自：

```
https://blog.tianiel.top/api
```

如需替换为你自己的接口，可在 `src/lib/data.ts` 中修改 API_BASE_URL。
