import { baseType } from '@t/index';
import { defineStore } from "pinia";

export const useApp = defineStore("app", {
    state: () => ({
        asideShow: true,
        asideWidth: 300,
        data: {
            id: "",
            label: "",
            type: "",
            parentId: "null"
        } as baseType,
        dataDialogShow: false
    }),
    actions: {
        toggleAsideShow(type: boolean) {
            this.asideShow = type
        },
        changeAsideWidth(width: number) {
            this.asideWidth = width
        },
        toggleDataDialogShow(type: boolean) {
            this.dataDialogShow = type
        },
        editData(type: "folder" | "file", data: baseType) {
            this.dataDialogShow = true
            this.data = {
                ...data,
                type
            }
        },
        addData(type: "folder" | "file") {
            this.dataInit()
            this.dataDialogShow = true
            this.data.type = type
        },
        dataInit() {
            this.data = {
                id: "",
                label: "",
                type: "",
                parentId: "null"
            }
        }
    },
    persist: true
})