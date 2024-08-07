import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "container",
            component: () => import("@r/pages/container/index.vue"),
            children: [
                {
                    path: "",
                    name: "editor",
                    component: () => import("@r/pages/container/editorTemplate.vue")
                }
            ]
        },
        {
            path: "/auth",
            name: "auth",
            component: () => import("@r/pages/auth/index.vue")
        }
    ] as RouteRecordRaw[]
})