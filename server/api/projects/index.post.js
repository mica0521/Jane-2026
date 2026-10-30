import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { title, company, time, category, responsibilities, images } = body

  // 参数校验
  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必填字段'
    })
  }

  const stmt = db.prepare(`
    INSERT INTO projects (title, company, time, category, responsibilities, images)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    title,
    company,
    time,
    category,
    responsibilities,
    JSON.stringify(images || [])
  )

  return {
    id: result.lastInsertRowid,
    message: '创建成功'
  }
})
