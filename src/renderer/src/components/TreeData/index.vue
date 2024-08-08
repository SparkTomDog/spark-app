<template>
    <div id="TreeData">
        <el-input v-model="filterText" placeholder="搜索..." />
        <el-scrollbar height="360px">
            <el-tree ref="treeRef" default-expand-all draggable :data="dataStore.treeData" :props="defaultProps"
                :filter-node-method="filterNode" @node-drop="NodeDrop" :allow-drop="AllDrop">
                <template #default="{ node, data }">
                    <span class="tree-data" @click="clickTreeNode(data)">
                        <span class="tree-icon icon w-8 h-8" v-if="data.type === 'folder'">
                            <font-awesome-icon icon="folder-open" v-if="node.expanded" />
                            <font-awesome-icon icon="folder" v-else />
                        </span>
                        <span class="tree-icon icon w-8 h-8" v-else>
                            <font-awesome-icon icon="file" />
                        </span>
                        <span class="tree-label flex-1">
                            {{ data.label }}
                        </span>
                        <span class="tree-active h-full">
                            <span class="tree-active-edit icon w-8 h-8" v-show="data.type === 'folder'"
                                @click.stop="edit(data)">
                                <font-awesome-icon icon="pen-to-square" />
                            </span>
                            <span class="tree-active-delete icon w-8 h-8" @click.stop="del(data)">
                                <font-awesome-icon icon="xmark" />
                            </span>
                        </span>
                    </span>
                </template>
            </el-tree>
        </el-scrollbar>
    </div>
    <el-dialog v-model="appStore.dataDialogShow" width="800" @close="close">
        <el-input v-model="appStore.data.label" placeholder="Please input">
            <template #prepend>
                <el-select v-model="appStore.data.parentId" placeholder="选择分类" style="width: 115px">
                    <el-option label="无分类" value="null" />
                    <el-option v-for="item in dataStore.folder" :label="item.label" :value="item.id" />
                </el-select>
            </template>
            <template #append>
                <el-button @click="pushData">提交</el-button>
            </template>
        </el-input>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { ElTree } from 'element-plus'
import { useData } from '@r/stores/data.store';
import { useApp } from '@r/stores/app.store';
import { getDate, getUUID } from '@c/functions'
import { useTab } from '@r/stores/tab.store';

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const dataStore = useData()
const appStore = useApp()
const tabStore = useTab()
const isEdit = ref<boolean>(false)

const defaultProps = {
    children: 'children',
    label: 'label',
    key: "id"
}

watch(filterText, (val) => {
    treeRef.value!.filter(val)
})

const filterNode = (value: string, data: any) => {
    if (!value) return true
    return data.label.includes(value)
}

const clickTreeNode = (data: any) => {
    if (data.type === "file") {
        tabStore.setTabs(data)
    }
}

const edit = (data: any) => {
    isEdit.value = true
    appStore.editData("folder", data)
}

const del = (data: any) => {
    console.log("del", data)
}

const close = () => {
    isEdit.value = false
}

const pushData = async () => {
    if (isEdit.value) {
        await dataStore.updateData({
            ...appStore.data,
            type: "folder"
        })
    } else {
        await dataStore.createData({
            ...appStore.data,
            createAt: getDate(),
            id: getUUID()
        })
    }
    appStore.toggleDataDialogShow(false)
}

const AllDrop = (_draggingNode: any, dropNode: any) => {
    if (dropNode.data.type === "folder") {
        return true
    } else {
        return false
    }
}

const NodeDrop = async (cNode: any, pNode: any, pos: any, _event: any) => {
    // console.log(cNode)
    // console.log(pNode)
    // console.log(pos)
    // console.log(event)
    let parentId: string
    if(pos !== "inner") {
        if (pNode.data.parentId === "null") {
            parentId = "null"
        } else {
            parentId = pNode.data.parentId
        }
    } else {
        parentId = pNode.data.id
    }
    await dataStore.updateData({
        ...cNode.data,
        parentId
    })
}

onMounted(async () => {
    await dataStore.getFolder()
})
</script>