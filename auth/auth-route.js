const bcrypt = require("bcryptjs")
const express = require("express")
const userModel = require("../users/user-model")
const jwt = require("jsonwebtoken")
const secrets = require("../config/secrets")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const saved = await userModel.add(req.body)

        res.status(201).json(saved)
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findBy({ username }).first()
        const valid = await bcrypt.compare(password, user.password)

        if (user && valid) {
            const token = generateToken(user)
            req.session.user = user
            res.status(200).json({
                message: `welcome ${user.username}`,
                token
            })
        } else {
            res.status(401).json({
                message: "please dont brute force me"
            })
        }
    } catch(err) {
        next(err)
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = secrets.jwtSecret
    const options = {
        expiresIn: "8h"
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router