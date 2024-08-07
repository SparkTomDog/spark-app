import { createApp } from 'vue'
import App from './App.vue'
import { store } from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@r/assets/index.scss"
import { router } from './router'
import { FontAwesomeIcon } from './plugins/fortawesome'

const app = createApp(App)
app.use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')
