import type { Component } from "vue"

export type choice<T> = T & {
    component: Component
}

export type viewChoice = choice<{to: string}>