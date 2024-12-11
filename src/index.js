import express from "express"
import config from "../config/index.js"
import {createServer} from "http"
import path from "path"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", async (req, res)=> {
    return res.sendFile(path.resolve("public", "pages/index.html"))
})

app.get("/signup", async(req, res) => {
    return res.sendFile(path.resolve("public", "pages/signup.html"))
})

app.get("/services", async (req, res) => {
    return res.sendFile(path.resolve("public", "pages/services.html"))
})

app.get("/dashboard", async (req, res) => {
    return res.sendFile(path.resolve("public", "pages/dashboard.html"))
})

app.get("/dashboard/activeRides", async(req, res) => {
    return res.sendFile(path.resolve("public", "pages/active-rides.html"))
})
app.get("/dashboard/completedRides", async(req, res) => {
    return res.sendFile(path.resolve("public", "pages/completed-rides.html"))
})

app.get("/login", async (req, res) => {
    return res.sendFile(path.resolve("public", "pages/login.html"))
})

const server = createServer(app)
const PORT = config.serverConfig.port

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})