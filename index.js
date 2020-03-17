const express = require("express")
const server = express()
const cookieParser = require("cookie-parser")
const auth = require("./auth/auth-route")
const users = require("./auth/user-router")
const port = 5000

server.use(express.json())
server.use(cookieParser())
server.use("/api", auth)
server.use("/api", users)

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        error: "we messed up"
    })
})

server.listen(port, () => {
    console.log(`running on ${port}`)
})