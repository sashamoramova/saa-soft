import type { Tag } from '../types'

export function parseTagsString(tagsString: string): Tag[] {
  if (!tagsString.trim()) {
    return []
  }
  
  return tagsString
    .split(';')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => ({ text: tag }))
}

export function tagsToString(tags: Tag[]): string {
  return tags.map(tag => tag.text).join('; ')
}

export function validateTagsString(tagsString: string): boolean {
  return tagsString.length <= 50
}