import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Account, AccountWithValidation, RecordType, Tag } from '@/shared/types'
import { validateAccount, hasValidationErrors, parseTagsString } from '@/shared/utils'

const STORAGE_KEY = 'accounts'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<AccountWithValidation[]>([])

  const validAccounts = computed(() => 
    accounts.value.filter(account => account.isValid)
  )

  const accountsCount = computed(() => accounts.value.length)

  function createEmptyAccount(): AccountWithValidation {
    return {
      id: generateId(),
      tags: [],
      recordType: 'Локальная' as RecordType,
      login: '',
      password: '',
      errors: {},
      isValid: false
    }
  }

  function addAccount(): string {
    const newAccount = createEmptyAccount()
    accounts.value.push(newAccount)
    saveToStorage()
    return newAccount.id
  }

  function updateAccount(id: string, updates: Partial<Account>): void {
    const account = accounts.value.find(acc => acc.id === id)
    if (!account) return
    
    Object.assign(account, updates)
    
    if (updates.recordType === 'LDAP') {
      account.password = null
    }
    
    validateAccountInStore(id)
    saveToStorage()
  }

  function updateAccountTags(id: string, tagsString: string): void {
    const account = accounts.value.find(acc => acc.id === id)
    if (!account) return

    account.tags = parseTagsString(tagsString)
    validateAccountInStore(id)
    saveToStorage()
  }

  function deleteAccount(id: string): void {
    const index = accounts.value.findIndex(acc => acc.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      saveToStorage()
    }
  }

  function validateAccountInStore(id: string): void {
    const account = accounts.value.find(acc => acc.id === id)
    if (!account) return

    const errors = validateAccount(account)
    account.errors = errors
    account.isValid = !hasValidationErrors(errors)
  }

  function saveToStorage(): void {
    try {
      const dataToSave = accounts.value.map(account => ({
        id: account.id,
        tags: account.tags,
        recordType: account.recordType,
        login: account.login,
        password: account.password
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error)
    }
  }

  function loadFromStorage(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data: Account[] = JSON.parse(saved)
        accounts.value = data.map(account => ({
          ...account,
          errors: {},
          isValid: false
        }))
        
        accounts.value.forEach(account => {
          validateAccountInStore(account.id)
        })
      }
    } catch (error) {
      console.error('Ошибка загрузки из localStorage:', error)
      accounts.value = []
    }
  }

  function clearAllAccounts(): void {
    accounts.value = []
    saveToStorage()
  }

  function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  loadFromStorage()

  return {
    accounts,
    validAccounts,
    accountsCount,
    addAccount,
    updateAccount,
    updateAccountTags,
    deleteAccount,
    validateAccountInStore,
    loadFromStorage,
    clearAllAccounts
  }
})