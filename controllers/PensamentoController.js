const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

module.exports = class PensamentoController {
    static async showPensamentos(req, res){
        res.render('pensamentos/home')
    }
}