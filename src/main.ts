import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './app/App.vue'

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  }
})

app.use(pinia)
app.use(vuetify)
app.mount('#app')
