import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // 检查笔记是否存在
  const checkStmt = db.prepare('SELECT id, images FROM notes WHERE id = ?')
  const note = checkStmt.get(id)

  if (!note) {
    throw createError({
      statusCode: 404,
      statusMessage: '笔记不存在'
    })
  }

  // 解析图片列表并删除关联的图片文件
  try {
    const images = JSON.parse(note.images || '[]')

    for (const image of images) {
      // 支持两种格式: 字符串 URL 或对象 { url, id }
      const imageId = typeof image === 'object' && image.id ? image.id : null

      if (imageId) {
        // 调用文件删除接口
        await $fetch(`/api/file/${imageId}`, {
          method: 'DELETE'
        })
      }
    }
  } catch (error) {
    console.error('删除图片文件失败:', error)
    // 继续删除笔记，不因图片删除失败而中断
  }

  // 删除笔记
  const deleteStmt = db.prepare('DELETE FROM notes WHERE id = ?')
  deleteStmt.run(id)

  return {
    message: '删除成功'
  }
})