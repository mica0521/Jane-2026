import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, views, likes, content, images } = body

  // 参数校验
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必填字段'
    })
  }

  const stmt = db.prepare(`
    INSERT INTO notes (name, views, likes, content, images)
    VALUES (?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    name,
    views,
    likes,
    content,
    JSON.stringify(images || [])
  )

  return {
    id: result.lastInsertRowid,
    message: '创建成功'
  }
})