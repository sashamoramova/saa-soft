<template>
  <div>
    <!-- Заголовок и кнопка добавления -->
    <div class="d-flex justify-space-between align-center mb-4">
      <h2>Учетные записи</h2>
      <v-btn
        @click="addNewAccount"
        color="primary"
        prepend-icon="mdi-plus"
        variant="elevated"
      >
        Добавить
      </v-btn>
    </div>

    <!-- Подсказка для поля метка -->
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
      icon="mdi-information"
    >
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </v-alert>

    <!-- Заголовки полей -->
    <v-row class="mb-2">
      <v-col cols="12" md="3">
        <strong>Метка</strong>
      </v-col>
      <v-col cols="12" md="2">
        <strong>Тип записи</strong>
      </v-col>
      <v-col cols="12" md="3">
        <strong>Логин</strong>
      </v-col>
      <v-col cols="12" md="3">
        <strong>Пароль</strong>
      </v-col>
      <v-col cols="12" md="1">
        <!-- Пустой столбец для кнопки удаления -->
      </v-col>
    </v-row>

    <!-- Список учетных записей -->
    <div v-if="accountsStore.accounts.length === 0" class="text-center py-8">
      <v-icon size="64" color="grey-lighten-1">mdi-account-plus</v-icon>
      <p class="text-grey-lighten-1 mt-2">Нет учетных записей. Добавьте первую запись.</p>
    </div>

    <div v-else>
      <AccountForm
        v-for="account in accountsStore.accounts"
        :key="account.id"
        :account="account"
        @update-tags="handleUpdateTags"
        @update-field="handleUpdateField"
        @validate="handleValidate"
        @delete="handleDelete"
      />
    </div>

    <!-- Статистика -->
    <v-card class="mt-4" v-if="accountsStore.accounts.length > 0">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <span>Всего записей: {{ accountsStore.accountsCount }}</span>
          <span>Валидных записей: {{ accountsStore.validAccounts.length }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { AccountForm } from '@/entities/account'
import { useAccountsStore } from '@/shared/stores'

const accountsStore = useAccountsStore()

// Обработчики событий
function addNewAccount() {
  accountsStore.addAccount()
}

function handleUpdateTags(accountId: string, tagsString: string) {
  accountsStore.updateAccountTags(accountId, tagsString)
}

function handleUpdateField(accountId: string, field: string, value: any) {
  accountsStore.updateAccount(accountId, { [field]: value })
}

function handleValidate(accountId: string) {
  accountsStore.validateAccountInStore(accountId)
}

function handleDelete(accountId: string) {
  accountsStore.deleteAccount(accountId)
}
</script>