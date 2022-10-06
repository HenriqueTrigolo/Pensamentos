const session = require('express-session')
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

    static async createPensamentoSave(req, res){
        const pensamento = {
            title: req.body.title,
            UserId: req.session.userid,
        }

        try {
            await Pensamento.create(pensamento)

            req.flash('message', "Pensamento criado com sucesso!")

            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        } catch (err) {
            console.log(err)
        }
    }
}