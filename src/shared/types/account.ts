export enum RecordType {
  LDAP = 'LDAP',
  LOCAL = 'Локальная'
}

export interface Tag {
  text: string
}

export interface Account {
  id: string
  tags: Tag[]
  recordType: RecordType
  login: string
  password: string | null
}

export interface ValidationErrors {
  login?: string
  password?: string
  recordType?: string
}

export interface AccountWithValidation extends Account {
  errors: ValidationErrors
  isValid: boolean
}