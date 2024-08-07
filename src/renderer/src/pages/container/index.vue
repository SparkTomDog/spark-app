<template>
    <div id="Container">
        <div id="ContainerAside" v-show="appStore.asideShow" :style="{ width: `${appStore.asideWidth}px` }">
            <ButtonItem />
            <TreeData />
        </div>
        <div id="ContainerMain">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApp } from '@r/stores/app.store';
import ButtonItem from "@r/components/ButtonItem/index.vue"
import TreeData from "@r/components/TreeData/index.vue"
import { useData } from '@r/stores/data.store';
import { onMounted } from 'vue';

const appStore = useApp()
const dataStore = useData()

onMounted(async () => {
    await dataStore.getTree()
})
</script>