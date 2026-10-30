import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // 检查项目是否存在
  const checkStmt = db.prepare('SELECT id, images FROM projects WHERE id = ?')
  const project = checkStmt.get(id)
  
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: '项目不存在'
    })
  }

  // 解析图片列表并删除关联的图片文件
  try {
    const images = JSON.parse(project.images || '[]')
    
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
    // 继续删除项目，不因图片删除失败而中断
  }

  // 删除项目
  const deleteStmt = db.prepare('DELETE FROM projects WHERE id = ?')
  deleteStmt.run(id)

  return {
    message: '删除成功'
  }
})
