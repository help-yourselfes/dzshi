import type { AsyncComponentLoader } from 'vue'

export type views = 'calls' | 'tasks'

const m = (v: string) => (() => import(`./Mobile/${v}.vue`))
const d = (v: string) => (() => import(`./Desktop/${v}.vue`))

export const mobileViews: Record<views, AsyncComponentLoader> = {
    calls: () => import('./Mobile/CallsView.vue'),
    tasks: m('TaskView')
}

export const desktopViews: Record<views, AsyncComponentLoader> = {
    calls: () => import('./Desktop/CallsView.vue'),
    tasks: d('TaskView')
}