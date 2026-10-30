import { join } from 'path'
import { mkdirSync, existsSync, writeFileSync } from 'fs'
import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: '没有上传文件'
    })
  }

  const file = formData.find(item => item.name === 'file')
  
  if (!file || !file.data) {
    throw createError({
      statusCode: 400,
      statusMessage: '文件数据无效'
    })
  }

  // 确保 uploads 目录存在（放在 public 下以便直接访问）
  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true })
  }

  // 生成唯一文件名
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 8)
  const ext = file.filename ? file.filename.split('.').pop() : 'jpg'
  const filename = `${timestamp}_${randomStr}.${ext}`
  const filepath = join(uploadsDir, filename)

  // 保存文件
  writeFileSync(filepath, file.data)

  // 保存到数据库
  const result = db.prepare(`
    INSERT INTO files (filename, original_name, file_path, file_size, mime_type)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    filename,
    file.filename || null,
    `/uploads/${filename}`,
    file.data.length,
    file.type || 'application/octet-stream'
  )

  return {
    id: result.lastInsertRowid,
    filename,
    original_name: file.filename || null,
    url: `/uploads/${filename}`,
    file_size: file.data.length,
    mime_type: file.type || 'application/octet-stream',
    message: '上传成功'
  }
})
