import type { Account, ValidationErrors, RecordType } from '../types'

/**
 * Валидирует учетную запись
 * @param account - учетная запись для валидации
 * @returns объект с ошибками валидации
 */
export function validateAccount(account: Partial<Account>): ValidationErrors {
  const errors: ValidationErrors = {}

  // Валидация логина (обязательное поле, максимум 100 символов)
  if (!account.login || account.login.trim() === '') {
    errors.login = 'Логин обязателен для заполнения'
  } else if (account.login.length > 100) {
    errors.login = 'Логин не может превышать 100 символов'
  }

  // Валидация пароля (обязательное только для локальных записей)
  if (account.recordType === 'Локальная') {
    if (!account.password || account.password.trim() === '') {
      errors.password = 'Пароль обязателен для локальных записей'
    } else if (account.password.length > 100) {
      errors.password = 'Пароль не может превышать 100 символов'
    }
  }

  // Валидация типа записи
  if (!account.recordType) {
    errors.recordType = 'Тип записи обязателен для заполнения'
  }

  return errors
}

/**
 * Проверяет, есть ли ошибки валидации
 * @param errors - объект с ошибками
 * @returns true если есть ошибки
 */
export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}