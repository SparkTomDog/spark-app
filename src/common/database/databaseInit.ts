import { dataModel } from "../models/data"

const DataBaseInit = async () => {
    await dataModel.sync().then(() => {
        console.log("数据模型同步完成")
    })
}

DataBaseInit()