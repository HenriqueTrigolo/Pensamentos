const express = require('express')
const router = express.Router()
const PensamentoController = require('../controllers/PensamentoController')

// controller

router.get('/', PensamentoController.showPensamentos)

module.exports = router