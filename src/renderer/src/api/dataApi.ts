import { BackgroundImageType, SearchEngineType } from "../../data"
import { instance } from "./http"

const getAllDatasApi = async() => {
    return await instance.get("/data/all")
}

const getDayBackgroundImageApi = async(data: BackgroundImageType) => {
    return await instance.post("/data/background-image", data)
}

const getAllSearchEnginesApi = async() => {
    return await instance.get("/data/engines")
}

export {
    getAllDatasApi,
    getDayBackgroundImageApi,
    getAllSearchEnginesApi
}