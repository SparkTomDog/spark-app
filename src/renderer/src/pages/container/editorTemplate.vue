<template>
    <el-tabs v-model="tabStore.currentTab" type="card" closable class="demo-tabs" @tab-remove="handleTabsEdit">
        <el-tab-pane v-for="item in tabStore.tabs" :key="item.id" :label="item.label" :name="item.id">
            <EditorComponent :data="item" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { useTab } from '@r/stores/tab.store';
import { TabPaneName } from 'element-plus';
import EditorComponent from "@r/components/EditorComponent/index.vue"

const tabStore = useTab()

const handleTabsEdit = (
    targetName: TabPaneName | string | undefined,
) => {
    tabStore.removeTab(targetName as string)
}
</script>