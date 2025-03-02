//import './assets/main.css'

import { createApp } from 'vue'
import { Quasar } from 'quasar'
import store from './store/index.js'
import App from './App.vue'
import router from './router'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

app.use(router)

app.mount('#app')
