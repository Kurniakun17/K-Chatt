const controllers = require('../controllers/auth.controller')
const router = require('express').Router()

router.post('/validatetoken', controllers.validateToken)
router.post('/login', controllers.login) 
router.post('/register', controllers.register)

module.exports = router