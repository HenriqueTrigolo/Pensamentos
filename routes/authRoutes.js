const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const { route } = require('./pensamentosRoutes')

//controller

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/registrar', AuthController.register)
router.post('/registrar', AuthController.registerPost)
router.get('/logout', AuthController.logout)

module.exports = router