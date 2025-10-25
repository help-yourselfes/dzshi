export type media = {
    type: "photo" | "video"
    link: string,
    preview:
    {
        type: 'text',
        text: string
    } | {
        type: 'image',
        url: string
    }
}

export type hint = {
    text: string,
    link: string
}

export type task = {
    lesson: string,
    text?: string,
    media?: media[],
    hint?: hint[]
} 