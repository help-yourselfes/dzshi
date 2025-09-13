import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { list as primitives } from './components/primitives/list'

const app = createApp(App)

app.use(router)

Object.entries(primitives).forEach((v) => {
  app.component(v[0])
})

app.mount('#app')
