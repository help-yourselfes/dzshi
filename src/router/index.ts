import AboutView from '@/views/AboutView.vue'
import CallsView from '@/views/CallsView.vue'
import TasksView from '@/views/TasksView.vue'
import TimetableView from '@/views/TimetableView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: TasksView },
  { path: '/calls', component: CallsView },
  {path: '/timetable', component: TimetableView},
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
