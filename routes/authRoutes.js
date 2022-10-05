const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const { route } = require('./pensamentosRoutes')

//controller

router.get('/login', AuthController.login)
router.get('/registrar', AuthController.register)
router.post('/registrar', AuthController.registerPost)

module.exports = router