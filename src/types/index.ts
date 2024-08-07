import { JSONContent } from "@tiptap/vue-3"

export interface baseType {
    id: string
    label: string
    type: string
    content?: JSONContent
    children?: baseType[]
    createAt?: string
    updateAt?: string
    deleteAt?: string
    [x: string]: any
}