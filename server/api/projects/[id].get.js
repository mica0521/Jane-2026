import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少项目ID'
    })
  }

  const stmt = db.prepare('SELECT * FROM projects WHERE id = ?')
  const project = stmt.get(id)

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: '项目不存在'
    })
  }

  // 解析 images JSON 字段
  return {
    ...project,
    images: project.images ? JSON.parse(project.images) : []
  }
})