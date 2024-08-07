import { convertToTree, getDate } from '@c/functions';
import { baseType } from '@t/index';
import { defineStore } from "pinia";

export const useData = defineStore("data", {
    state: () => ({
        treeData: [] as baseType[],
        folder: [] as baseType[]
    }),
    actions: {
        async getTree() {
            const res = await window.electron.ipcRenderer.invoke("find-data")
            if(typeof res === "string" && JSON.parse(res).code === 200) {
                this.treeData = convertToTree(JSON.parse(res).data)
            }
        },
        async getFolder() {
            const res = await window.electron.ipcRenderer.invoke("find-data-folder")
            if(typeof res === "string" && JSON.parse(res).code === 200) {
                this.folder = JSON.parse(res).data
            }
        },
        async createData(data: baseType) {
            if(data.parentId == "") data.parentId = "null"
            if(data.label.trim() === "") return
            const res = await window.electron.ipcRenderer.invoke("create-data", JSON.stringify(data))
            if(typeof res === "string" && JSON.parse(res).code === 200) {
                await this.getTree()
                await this.getFolder()
            }
        },
        async findData(id: string) {
            const res = await window.electron.ipcRenderer.invoke("find-data-one", JSON.stringify({ id }))
            if(typeof res === "string" && JSON.parse(res).code === 200) {
                await this.getTree()
                await this.getFolder()
            }
        },
        async updateData(data: baseType) {
            data.updateAt = getDate()
            const res = await window.electron.ipcRenderer.invoke("update-data", JSON.stringify(data))
            if(typeof res === "string" && JSON.parse(res).code === 200) {
                await this.getTree()
                await this.getFolder()
            }
        },
        async removeData(id: string) {
            const res = await window.electron.ipcRenderer.invoke("remove-data", JSON.stringify({ id }))
            if(typeof res === "string" && JSON.parse(res).code === 200) {
                await this.getTree()
                await this.getFolder()
            }
        },
        async deleteData(id: string) {
            const res = await window.electron.ipcRenderer.invoke("delete-data", JSON.stringify({ id }))
            if(typeof res === "string" && JSON.parse(res).code === 200) {
                await this.getTree()
                await this.getFolder()
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
})