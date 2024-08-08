import { baseType } from "@t/index";
import { defineStore } from "pinia";

export const useTab = defineStore("tab", {
    state: () => ({
        tabs: [] as baseType[],
        currentTab: ""
    }),
    actions: {
        setTabs(tab: baseType) {
            const res = this.tabs.filter(item => item.id === tab.id)
            if(res.length === 0) {
                this.tabs.push(tab)
                this.currentTab = tab.id
            } else {
                this.currentTab = tab.id
            }
        },
        removeTab(id: string) {
            this.tabs = this.tabs.filter(item => item.id !== id)
        }
    },
    persist: {
        storage: sessionStorage
    }
})