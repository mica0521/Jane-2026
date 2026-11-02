# AGENTS.md

## 项目

Jane 2026 / 周捷作品集，Nuxt 3、Vue 3、Element Plus 静态网站。
用户通过 AI 对话维护内容，不需要管理后台、数据库或运行时 API。

## 命令

- `npm install` 安装依赖
- `npm run dev` 启动本地预览
- `npm test` 检查内容和资源完整性
- `npm run build` / `npm run generate` 生成静态文件至 `.output/public`

## 内容与结构

- `app/pages/` 前台页面
- `app/components/` 共享组件
- `app/content/projects.json` 所有作品，首页取前 3 项，数组顺序决定展示顺序
- `app/content/notes.json` 社媒内容
- `public/uploads/` 图片、GIF；JSON 中使用 `/uploads/...` 路径
- `app/assets/` 构建时引用的资源

项目支持可选 `url`（HTTP/HTTPS 外链）与 `images: [{url, alt}]`。
保持已有项目 ID 稳定，旧详情地址为 `/projectDetail?id=ID`。
新增内容直接修改文件，避免重新引入后台、上传 API 或数据库。
保留既有视觉风格，除非用户要求重新设计。
完成内容修改后运行测试和静态构建，核对页面、媒体和详情深链。
部署输出目录为 `.output/public`；自动发布托管需单独配置。
