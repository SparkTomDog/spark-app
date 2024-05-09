import { ElectronAPI } from '@electron-toolkit/preload'

interface API {
    /**
     * 更改窗口状态,最大化,最小化,关闭
     * @param type "min" | "max" | "close"
     * @returns 
     */
    changeWindowState: (type: "min" | "max" | "close") => void
}

declare global {
    interface Window {
        electron: ElectronAPI
        api: API
    }
}
