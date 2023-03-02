const { Router } = require("express")
const controller = require("../controllers/user.js")
const router = Router()

router.post('/users', controller.createUser)

module.exports = router