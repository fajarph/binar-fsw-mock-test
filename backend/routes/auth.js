const { Router } = require('express');
const controllers = require('../controllers/auth.js');
const router = Router()

router.get('/me', controllers.me)
router.post('/login', controllers.login)
router.delete('/logout', controllers.logOut)

module.exports = router