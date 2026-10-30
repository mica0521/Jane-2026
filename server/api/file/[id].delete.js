import { join } from 'path'
import { existsSync, unlinkSync } from 'fs'
import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少文件ID'
    })
  }

  // 查询文件信息
  const file = db.prepare('SELECT * FROM files WHERE id = ?').get(id)

  if (!file) {
    throw createError({
      statusCode: 404,
      statusMessage: '文件不存在'
    })
  }

  // 删除物理文件
  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  const filepath = join(uploadsDir, file.filename)
  
  if (existsSync(filepath)) {
    unlinkSync(filepath)
  }

  // 删除数据库记录
  db.prepare('DELETE FROM files WHERE id = ?').run(id)

  return {
    message: '删除成功',
    id: Number(id)
  }
})
