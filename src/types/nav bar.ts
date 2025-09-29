import type { JSX } from "vue/jsx-runtime";

export interface ViewSelector {
    selected?: () => JSX.Element,
    values?: () => JSX.Element
}