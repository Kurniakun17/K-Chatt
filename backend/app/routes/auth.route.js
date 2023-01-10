const controllers = require('../controllers/auth.controller')
const router = require('express').Router()

router.get('/', controllers.getData)
router.post('/', controllers.findUser)
router.post('/add', controllers.addUser)

module.exports = router