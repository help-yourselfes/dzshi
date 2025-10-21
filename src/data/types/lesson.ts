export type lessonInfo = {
    name: string
    'short-name'?: string
    necessary?: boolean
    class: string | string[]
    hint?: {
        link?: string
    } & any
}