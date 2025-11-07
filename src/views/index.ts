import type { AsyncComponentLoader } from 'vue'

const m = (v: string) => (() => import(`./Mobile/${v}.vue`))
const d = (v: string) => (() => import(`./Desktop/${v}.vue`))

export type views = 'calls' | 'tasks' | 'about'

export const mobileViews: Record<views, AsyncComponentLoader> = {
    calls: () => import('./Mobile/CallsView.vue'),
    tasks: m('TaskView'),
    about: m('AboutView')
}

export const desktopViews: Record<views, AsyncComponentLoader> = {
    calls: () => import('./Desktop/CallsView.vue'),
    tasks: d('TaskView'),
    about: d('AboutView')
}