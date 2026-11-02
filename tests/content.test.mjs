import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = name => JSON.parse(readFileSync(new URL(`../app/content/${name}.json`, import.meta.url), 'utf8'))

test('all existing portfolio content and media are available without an API', () => {
  const projects = read('projects')
  const notes = read('notes')
  assert.ok(projects.length > 0)
  assert.ok(notes.length > 0)
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length)
  for (const entry of [...projects, ...notes]) {
    for (const image of entry.images) {
      assert.ok(existsSync(new URL(`../public${image.url}`, import.meta.url)), image.url)
    }
  }
})
