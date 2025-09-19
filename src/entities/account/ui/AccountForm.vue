<template>
  <v-card class="mb-4" elevation="2">
    <v-card-text>
      <v-row>
        <!-- Поле Метка -->
        <v-col cols="12" md="3">
          <v-text-field
            :model-value="tagsString"
            @update:model-value="updateTags"
            @blur="validateAndSave"
            label="Метка"
            placeholder="Введите метки через ;"
            variant="outlined"
            density="compact"
            :counter="50"
            :error="tagsString.length > 50"
            :error-messages="tagsString.length > 50 ? 'Максимум 50 символов' : ''"
          />
        </v-col>

        <!-- Поле Тип записи -->
        <v-col cols="12" md="2">
          <v-select
            :model-value="account.recordType"
            @update:model-value="updateRecordType"
            :items="recordTypeOptions"
            label="Тип записи"
            variant="outlined"
            density="compact"
            :error="!!account.errors.recordType"
            :error-messages="account.errors.recordType"
          />
        </v-col>

        <!-- Поле Логин -->
        <v-col cols="12" md="3">
          <v-text-field
            :model-value="account.login"
            @update:model-value="updateLogin"
            @blur="validateAndSave"
            label="Логин"
            placeholder="Введите логин"
            variant="outlined"
            density="compact"
            :counter="100"
            :error="!!account.errors.login"
            :error-messages="account.errors.login"
          />
        </v-col>

        <!-- Поле Пароль (показывается только для локальных записей) -->
        <v-col cols="12" md="3" v-if="account.recordType === 'Локальная'">
          <v-text-field
            :model-value="account.password || ''"
            @update:model-value="updatePassword"
            @blur="validateAndSave"
            label="Пароль"
            placeholder="Введите пароль"
            variant="outlined"
            density="compact"
            type="password"
            :counter="100"
            :error="!!account.errors.password"
            :error-messages="account.errors.password"
          />
        </v-col>

        <!-- Кнопка удаления -->
        <v-col cols="12" md="1" class="d-flex align-center">
          <v-btn
            @click="deleteAccount"
            icon="mdi-delete"
            color="error"
            variant="text"
            size="small"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AccountWithValidation, RecordType } from '@/shared/types'
import { tagsToString, parseTagsString } from '@/shared/utils'

interface Props {
  account: AccountWithValidation
}

interface Emits {
  (event: 'update-tags', accountId: string, tagsString: string): void
  (event: 'update-field', accountId: string, field: string, value: any): void
  (event: 'validate', accountId: string): void
  (event: 'delete', accountId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Опции для селекта типа записи
const recordTypeOptions = [
  { title: 'Локальная', value: 'Локальная' as RecordType },
  { title: 'LDAP', value: 'LDAP' as RecordType }
]

// Преобразуем теги в строку для отображения
const tagsString = computed(() => tagsToString(props.account.tags))

// Обработчики событий
function updateTags(value: string) {
  emit('update-tags', props.account.id, value)
}

function updateRecordType(value: RecordType) {
  emit('update-field', props.account.id, 'recordType', value)
  // Если выбран LDAP, очищаем пароль
  if (value === 'LDAP') {
    emit('update-field', props.account.id, 'password', null)
  }
  emit('validate', props.account.id)
}

function updateLogin(value: string) {
  emit('update-field', props.account.id, 'login', value)
}

function updatePassword(value: string) {
  emit('update-field', props.account.id, 'password', value)
}

function validateAndSave() {
  emit('validate', props.account.id)
}

function deleteAccount() {
  emit('delete', props.account.id)
}
</script>