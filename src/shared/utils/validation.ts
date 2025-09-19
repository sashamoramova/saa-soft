import type { Account, ValidationErrors, RecordType } from '../types'

export function validateAccount(account: Partial<Account>): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!account.login || account.login.trim() === '') {
    errors.login = 'Логин обязателен для заполнения'
  } else if (account.login.length > 100) {
    errors.login = 'Логин не может превышать 100 символов'
  }

  if (account.recordType === 'Локальная') {
    if (!account.password || account.password.trim() === '') {
      errors.password = 'Пароль обязателен для локальных записей'
    } else if (account.password.length > 100) {
      errors.password = 'Пароль не может превышать 100 символов'
    }
  }

  if (!account.recordType) {
    errors.recordType = 'Тип записи обязателен для заполнения'
  }

  return errors
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}