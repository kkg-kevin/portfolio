import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { profile } from './profile'
import { getNextProject, projects } from './projects'

describe('portfolio content', () => {
  it('gives every project a unique, URL-safe slug', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('only lists project links that are absolute https URLs', () => {
    for (const project of projects) {
      for (const link of project.links) expect(link.href).toMatch(/^https:\/\//)
    }
  })

  it('cycles through projects for the next-project link', () => {
    const last = projects[projects.length - 1]
    expect(getNextProject(last.slug)).toBe(projects[0])
  })

  it('ships every screenshot that a project points to', () => {
    for (const project of projects) {
      if (!project.screens) continue
      for (const shot of [project.screens.cover, ...project.screens.gallery]) {
        for (const src of [shot.src, shot.srcDark]) {
          if (src) expect(existsSync(resolve(process.cwd(), 'public', src.slice(1))), src).toBe(true)
        }
      }
    }
  })

  it('ships the profile photo', () => {
    expect(existsSync(resolve(process.cwd(), 'public', profile.photo.src.slice(1)))).toBe(true)
  })

  it('ships the CV file that the download links point to', () => {
    expect(existsSync(resolve(process.cwd(), 'public', profile.cv.href.slice(1)))).toBe(true)
  })
})
