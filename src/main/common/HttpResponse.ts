import { Response } from "express";

const HttpResponse = (res: Response, msg: string, data: any = {}, code: number = 200) => {
    res.send({
        code,
        msg,
        data
    })
}

export {
    HttpResponse
}