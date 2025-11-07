import type { AsyncComponentLoader } from 'vue'

export type views = 'calls'

export const mobileViews: Record<views, AsyncComponentLoader> = {
    calls: () => import('./Mobile/CallsView.vue')
}

export const desktopViews: Record<views, AsyncComponentLoader> = {
    calls: () => import('./Desktop/CallsView.vue')
}