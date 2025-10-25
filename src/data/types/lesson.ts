export type lessonInfo = {
    name: string
    shortName?: string
    necessary?: boolean
    class: string | string[]
    hint?: {
        link?: string
    } & any
}