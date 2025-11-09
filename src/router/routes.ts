import AboutView from "@/views/AboutView.vue";
import CallsView from "@/views/CallsView.vue";
import SelectTestView from "@/views/dev/SelectTestView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import TasksView from "@/views/TasksView.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: (to: any) => {
      const date = new Date();
      return {
        path: '/tasks',
        query: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    },
  },
  { path: '/tasks', name: 'tasks', component: TasksView },
  { path: '/calls/:dayId?', name: 'calls', component: CallsView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/dev/select', component: SelectTestView },
  { path: '/notfound', name: 'notFound', component: NotFoundView },
  { path: '/:pathMatch(.*)*', redirect: { path: '/notfound' } }
]
export default routes