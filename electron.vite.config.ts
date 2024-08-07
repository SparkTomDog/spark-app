import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@r': resolve('src/renderer/src'),
                '@c': resolve('src/common'),
                '@t': resolve('src/types'),
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@r/assets/__var.scss";`
                }
            }
        },
        plugins: [vue()]
    }
})
