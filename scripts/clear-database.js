#!/usr/bin/env node

/**
 * 删除数据库所有表脚本
 * 运行: node scripts/clear-database.js
 * 
 * 此脚本会删除 portfolio.db 中所有表（包括表结构）
 * 注意：此操作不可恢复，请谨慎使用！
 */

import Database from 'better-sqlite3'
import { join } from 'path'
import { existsSync } from 'fs'

const __dirname = process.cwd()
const dbPath = join(__dirname, 'data', 'portfolio.db')

console.log('========================================')
console.log('⚠️  警告：此操作将删除数据库中的所有表！')
console.log('========================================\n')

// 检查数据库文件是否存在
if (!existsSync(dbPath)) {
  console.log('ℹ️  数据库文件不存在:', dbPath)
  console.log('无需清理')
  process.exit(0)
}

try {
  const db = new Database(dbPath)
  
  // 获取所有表名
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all()
  
  if (tables.length === 0) {
    console.log('ℹ️  数据库中没有表')
    db.close()
    process.exit(0)
  }
  
  console.log('📋 发现以下表将被删除:')
  tables.forEach(table => {
    console.log(`   - ${table.name}`)
  })
  
  console.log('\n🗑️  开始删除表...\n')
  
  // 删除每个表
  tables.forEach(table => {
    try {
      db.prepare(`DROP TABLE IF EXISTS ${table.name}`).run()
      console.log(`✅ ${table.name}: 已删除`)
    } catch (error) {
      console.error(`❌ ${table.name}: 删除失败 -`, error.message)
    }
  })
  
  // 清理 sqlite_sequence 表（如果有）
  try {
    db.prepare("DELETE FROM sqlite_sequence").run()
  } catch (error) {
    // sqlite_sequence 表可能不存在，忽略错误
  }
  
  db.close()
  
  console.log('\n========================================')
  console.log('🎉 所有表已删除！')
  console.log('========================================')
  console.log('\n💡 提示：重启开发服务器后会自动重新创建表')
  
} catch (error) {
  console.error('❌ 操作失败:', error.message)
  process.exit(1)
}
