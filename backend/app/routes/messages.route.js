const controller = require('../controllers/messages.controller')
const router = require('express').Router()

router.post('/add', controller.sendMessage)
router.get('/', controller.getMessages)

module.exports = router