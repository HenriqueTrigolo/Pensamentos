const session = require('express-session')
const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

module.exports = class PensamentoController {
    static async showPensamentos(req, res){

        const pensamentosData = await Pensamento.findAll({
            include: User,
        })

        const todosPensamentos = pensamentosData.map((result) => result.get({plain: true}))

        res.render('pensamentos/home', {todosPensamentos})
    }

    static async dashboard(req, res){
        const userId = req.session.userid

        const user = await User.findOne({
            where: {id: userId},
            include: Pensamento,
            plain: true,
        })

        if(!user){
            res.redirect('/login')
        }

        const pensamentos = user.Pensamentos.map((result) => result.dataValues)

        let pensamentosVazios = false

        if(pensamentos.length === 0 ){
            pensamentosVazios = true
        }

        res.render('pensamentos/dashboard', {pensamentos, pensamentosVazios})
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

    static async updatePensamento(req, res){
        const id = req.params.id

        const pensamento = await Pensamento.findOne({where: {id: id}, raw: true})

        res.render('pensamentos/update', {pensamento})
    }

    static async updatePensamentoSave(req, res){
        
        const id = req.body.id

        const pensamento = {
            title: req.body.title
        }
        try {
            await Pensamento.update(pensamento, {where: {id: id}})

            req.flash('message', "Pensamento atualizado com sucesso!")

            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        } catch (err) {
            console.log(err)
        }
        

    }

    static async remove(req, res){
        const id = req.body.id
        const userId = req.session.userid

        try {
            await Pensamento.destroy({where: {id: id, UserId: userId}})

            req.flash('message', "Pensamento excluído com sucesso!")

            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}