import { ipcMain } from "electron";
import { dataModel } from "./models/data";
import { dataResponse, getDate } from "./functions";

/**
 * 创建data
 */
ipcMain.handle("create-data", async (_e: Electron.IpcMainInvokeEvent, attr: string) => {
    try {
        const data = JSON.parse(attr)
        const res = await dataModel.create(data)
        return dataResponse("创建成功", res.dataValues, 200)
    } catch (error) {
        return dataResponse("创建失败", error, 400)
    }
})

/**
 * 查找data
 */
ipcMain.handle("find-data", async (_e: Electron.IpcMainInvokeEvent) => {
    try {
        const res = await dataModel.findAll({
            where: {
                deleteAt: "null"
            }
        })
        return dataResponse("获取成功", res, 200)
    } catch (error) {
        return dataResponse("获取失败", error, 400)
    }
})

/**
 * 查找data-folder
 */
ipcMain.handle("find-data-folder", async (_e: Electron.IpcMainInvokeEvent) => {
    try {
        const res = await dataModel.findAll({
            where: {
                deleteAt: "null",
                type: "folder"
            }
        })
        
        return dataResponse("获取成功", res, 200)
    } catch (error) {
        return dataResponse("获取失败", error, 400)
    }
})

/**
 * 查找data
 */
ipcMain.handle("find-data-one", async (_e: Electron.IpcMainInvokeEvent, attr: string) => {
    try {
        const { id } = JSON.parse(attr)
        const data = await dataModel.findOne({
            where: {
                deleteAt: "null",
                id
            }
        })
        if (data) {
            data.dataValues.parent = await dataModel.findOne({
                where: {
                    deleteAt: "null",
                    id: data.dataValues.parentId
                }
            })
        }
        return dataResponse("获取信息成功", data, 200)
    } catch (error) {
        return dataResponse("获取信息失败", error, 400)
    }
})

/**
 * 更新data
 */
ipcMain.handle("update-data", async (_e: Electron.IpcMainInvokeEvent, attr: string) => {
    try {
        const data = JSON.parse(attr)
        console.log(data)
        if(data.type === "folder") delete(data.content)
        if (data.parent) delete(data.parent)
        const res = await dataModel.update({ ...data }, {
            where: {
                id: data.id
            }
        })
        return dataResponse("更新成功", res, 200)
    } catch (error) {
        return dataResponse("更新失败", error, 400)
    }
})

/**
 * 软删除data
 */
ipcMain.handle("remove-data", async (_e: Electron.IpcMainInvokeEvent, attr: string) => {
    try {
        const { id } = JSON.parse(attr)
        const data = await dataModel.update({ deleteAt: getDate() }, {
            where: {
                id
            }
        })
        return dataResponse("移除成功", data, 200)
    } catch (error) {
        return dataResponse("移除失败", error, 400)
    }
})

/**
 * 删除data
 */
ipcMain.handle("delete-data", async (_e: Electron.IpcMainInvokeEvent, attr: string) => {
    try {
        const { id } = JSON.parse(attr)
        const data = await dataModel.destroy({
            where: {
                id
            }
        })
        return dataResponse("删除成功", data, 200)
    } catch (error) {
        return dataResponse("删除失败", error, 400)
    }
})