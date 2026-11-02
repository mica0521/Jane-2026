# 静态作品集改造计划

目标：按用户已批准方案，保留前台外观与现有内容，移除管理后台和运行时数据库，通过 AI 修改本地文件维护作品集。

- [x] 导出 projects 与 notes 为 app/content 下的 JSON，保持原有排序和图片地址。
- [x] 测试现有内容数量、详情查找及全部图片资源完整性。
- [x] 首页、项目列表、详情和笔记轮播直接导入内容；保留 /projectDetail?id= 兼容链接，未知 ID 展示空状态。
- [x] 添加可选项目网址展示，使用安全外链属性；GIF 保持 img 原生播放。
- [x] 移除 app/pages/admin、server 接口、SQLite 依赖和数据库清理脚本；原数据由 Git 历史保留。
- [x] 配置静态构建，预渲染全部公开页面；npm run build 输出 .output/public。
- [x] 更新维护文档，运行内容测试、完整静态构建，并在静态 HTTP 服务核对详情深链和后台 404。

发布范围：本次先完成本地改造和预览；不修改托管服务设置。

验证：4 个项目和 4 条笔记与原数据库逐字段一致；npm test 与 npm run build 通过；浏览器直接访问 /projectDetail/?id=4 正常显示文字与图片；静态 /admin 和 /api/projects 返回 404。预览 http://127.0.0.1:4173/home/。
