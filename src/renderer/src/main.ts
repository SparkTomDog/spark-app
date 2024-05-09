import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@r/router/index'
import { store } from '@r/stores/index'

import "@r/assets/index.scss"

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
