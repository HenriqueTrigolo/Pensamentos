const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

module.exports = class PensamentoController {
    static async showPensamentos(req, res){
        res.render('pensamentos/home')
    }

    static async dashboard(req, res){
        res.render('pensamentos/dashboard')
    }

    static createPensamento(req, res){
        res.render('pensamentos/create')
    }
}