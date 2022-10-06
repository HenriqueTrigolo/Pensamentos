const express = require('express')
const router = express.Router()
const PensamentoController = require('../controllers/PensamentoController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth


// controller

router.get('/add', checkAuth, PensamentoController.createPensamento)
router.post('/add', checkAuth, PensamentoController.createPensamentoSave)
router.post('/remove', checkAuth, PensamentoController.remove)
router.get('/dashboard', checkAuth, PensamentoController.dashboard)
router.get('/', PensamentoController.showPensamentos)

module.exports = router