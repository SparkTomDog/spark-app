import express from "express"
import cors from 'cors'

const app = express()
const port = 3000

const createServer = () => {
    app.use(cors())
    app.use(express.json())

    app.listen(port, () => {
        console.log(`服务已启动 http://localhost:${port}`)
    })
}

export {
    createServer
}