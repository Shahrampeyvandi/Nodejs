const express = require('express')
let router = express.Router()
const userController = require('./Controllers/UserController')
router.get('/',userController.home)

router.post('/login',userController.login)
router.post('/register',userController.register)

module.exports=router