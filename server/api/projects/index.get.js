import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const size = query.size ? parseInt(query.size) : null

  let projects
  if (size) {
    const stmt = db.prepare('SELECT * FROM projects ORDER BY created_at DESC LIMIT ?')
    projects = stmt.all(size)
  } else {
    const stmt = db.prepare('SELECT * FROM projects ORDER BY created_at DESC')
    projects = stmt.all()
  }

  // 解析 images JSON 字段
  return projects.map(project => ({
    ...project,
    images: project.images ? JSON.parse(project.images) : []
  }))
})