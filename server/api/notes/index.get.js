import db from '../../db/database.js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const size = query.size ? parseInt(query.size) : null

  let notes
  if (size) {
    const stmt = db.prepare('SELECT * FROM notes ORDER BY created_at DESC LIMIT ?')
    notes = stmt.all(size)
  } else {
    const stmt = db.prepare('SELECT * FROM notes ORDER BY created_at DESC')
    notes = stmt.all()
  }

  // 解析 images JSON 字段
  return notes.map(note => ({
    ...note,
    images: note.images ? JSON.parse(note.images) : []
  }))
})