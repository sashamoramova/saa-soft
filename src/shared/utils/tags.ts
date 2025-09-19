import type { Tag } from '../types'

/**
 * Преобразует строку меток в массив объектов Tag
 * @param tagsString - строка с метками, разделенными ";"
 * @returns массив объектов Tag
 */
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

/**
 * Преобразует массив объектов Tag в строку
 * @param tags - массив объектов Tag
 * @returns строка с метками, разделенными ";"
 */
export function tagsToString(tags: Tag[]): string {
  return tags.map(tag => tag.text).join('; ')
}

/**
 * Валидирует строку меток (максимум 50 символов)
 * @param tagsString - строка с метками
 * @returns true если валидна
 */
export function validateTagsString(tagsString: string): boolean {
  return tagsString.length <= 50
}