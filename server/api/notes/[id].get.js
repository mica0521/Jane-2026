import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少笔记ID'
    })
  }

  const stmt = db.prepare('SELECT * FROM notes WHERE id = ?')
  const note = stmt.get(id)

  if (!note) {
    throw createError({
      statusCode: 404,
      statusMessage: '笔记不存在'
    })
  }

  // 解析 images JSON 字段
  return {
    ...note,
    images: note.images ? JSON.parse(note.images) : []
  }
})