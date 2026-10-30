import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const { name, views, likes, content, images } = body

  // 参数校验
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必填字段'
    })
  }

  // 检查笔记是否存在
  const checkStmt = db.prepare('SELECT id FROM notes WHERE id = ?')
  const existing = checkStmt.get(id)

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: '笔记不存在'
    })
  }

  const stmt = db.prepare(`
    UPDATE notes
    SET name = ?, views = ?, likes = ?, content = ?, images = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)

  stmt.run(
    name,
    views,
    likes,
    content,
    JSON.stringify(images || []),
    id
  )

  return {
    id,
    message: '更新成功'
  }
})