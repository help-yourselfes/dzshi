
import routes from './routes'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
