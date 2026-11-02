# Jane 2026 · 周捷作品集

基于 Nuxt 3 / Vue 3 的静态作品集。无管理后台、数据库或运行时 API，内容通过与 AI 对话修改源文件来维护。

## 本地预览

```bash
npm install
npm run dev
```

打开 http://localhost:3000/home。

## 内容维护

- `app/content/projects.json`：作品列表与详情，数组顺序即展示顺序；首页取前三项。
- `app/content/notes.json`：联系页的社媒展示内容。
- `public/uploads/`：图片与 GIF。内容中以 `/uploads/文件名.gif` 引用，GIF 使用原生图片播放。
- 项目字段：`id`（唯一且保持稳定）、`title`、`company`、`time`、`category`、`responsibilities`、`images`、可选 `url`。
- `images` 示例：`[{ "url": "/uploads/example.gif", "alt": "交互动效" }]`。
- `url` 填写完整 HTTP/HTTPS 项目网址，详情页会显示“访问项目网站”。留空则隐藏。
- 首页、关于我、联系信息分别在 `app/pages/home/`、`app/pages/about/`、`app/pages/contact/` 中维护。

之后可以直接告诉 AI：“新增一个项目，标题……，使用这些图片和 GIF，体验网址……”。AI 更新内容和页面，先预览，再按你的要求提交及发布。

## 构建与部署

```bash
npm test
npm run build
```

构建输出为 `.output/public`，可部署到支持静态文件的托管服务。开发时才需要 Nuxt 进程；线上只需托管生成后的静态文件。`npm run generate` 同样生成静态网站。

部署时完整上传 `.output/public`，保留页面子目录及 `404.html`。旧详情链接 `/projectDetail?id=项目ID` 继续支持；详情内容在浏览器中根据 ID 从本地数据读取。刷新、复制链接均无需后台接口。

GitHub 仓库保存源码，推送代码本身不等于上线。自动发布需要在选定托管平台上另行配置一次。

原 SQLite 数据已迁移到 JSON，历史数据库可在迁移前的 Git 提交中恢复。
