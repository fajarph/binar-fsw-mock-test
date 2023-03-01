const { Router } = require("express")
const controller = require("../controllers/task.js")
const middleware = require("../middlewares/auth.js")
const router = Router()

router.get('/tasks', middleware.verifyUser, controller.getTasks)
router.post('/tasks', middleware.verifyUser, controller.createTask)
router.patch('/tasks/:id', middleware.verifyUser, controller.finishTask)

module.exports = router