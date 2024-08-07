<template>
    <div id="ButtonItem">
        <span class="icon w-8 h-8" @click="addData('folder')">
            <font-awesome-icon icon="folder-plus" />
        </span>
        <span class="icon w-8 h-8" @click="addData('file')">
            <font-awesome-icon icon="file-circle-plus" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { useApp } from '@r/stores/app.store';

const appStore = useApp()

const addData = (type: "folder" | "file") => {
    appStore.addData(type)
}
</script>