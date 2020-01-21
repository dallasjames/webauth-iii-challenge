const bcrypt = require("bcryptjs")
const express = require("express")
const userModel = require("./user-model")
const restricted = require("../middleware/restricted")

const router = express.Router()
  
  router.get("/users", restricted(), async (req, res, next) => {
    try {
      const users = await userModel.find()
      
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

  router.get("/logout", restricted(), async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        next(err)
      } else {
        res.json({
          message: "bye felica"
        })
      }
    })
  })

module.exports = router