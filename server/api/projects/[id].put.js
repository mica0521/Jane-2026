import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const { title, company, time, category, responsibilities, images } = body

  // 参数校验
  if (!title || !company || !time || !category || !responsibilities) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必填字段'
    })
  }

  // 检查项目是否存在
  const checkStmt = db.prepare('SELECT id FROM projects WHERE id = ?')
  const existing = checkStmt.get(id)
  
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: '项目不存在'
    })
  }

  const stmt = db.prepare(`
    UPDATE projects 
    SET title = ?, company = ?, time = ?, category = ?, responsibilities = ?, images = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)

  stmt.run(
    title,
    company,
    time,
    category,
    responsibilities,
    JSON.stringify(images || []),
    id
  )

  return {
    id,
    message: '更新成功'
  }
})
