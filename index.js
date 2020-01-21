const express = require("express")
const server = express()
const auth = require("./auth/auth-route")
const users = require("./users/user-router")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const dbConfig = require("./database/dbConfig")
const port = 5000

const sessionConfig = {
    name: "token",
    secret: "secrets is hard",
    resave: false,
    savedUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true
    })
}

server.use(express.json())
server.use(session(sessionConfig))
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