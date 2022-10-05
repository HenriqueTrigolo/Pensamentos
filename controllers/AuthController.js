const User = require('../models/User')
const bcrypt = require('bcryptjs')


module.exports = class AuthController{
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        //verificando a existencia do usuário
        const user = await User.findOne({where: {email: email}})
        
        if(!user){
            req.flash('message', "E-mail não encontrado!")
            res.render('auth/login')
            return
        }

        //verificando a veracidade da senha
        const checkPassword = bcrypt.compareSync(password, user.password)

        if(!checkPassword){
            req.flash('message', "Senha incorreta!")
            res.render('auth/login')
            return
        }

        //iniciando a session
        req.session.userid = user.id

        req.flash('message', "Login realizado com sucesso!")
        
        req.session.save(() => {
            res.redirect('/')
        })
    }


    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body

        //validando a senha
        if(password != confirmpassword){
            req.flash('message', "As senhas não conferem, tente novamente")
            res.render('auth/register')
            return
        }

        //verificar a existencia de usuario
        const checkUserExist = await User.findOne({where: {email: email}})

        if(checkUserExist){
            req.flash('message', "O e-mail informado já está cadastrado!")
            res.render('auth/register')
            return
        }

        //criptografando a senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name: name,
            email: email,
            password: hashedPassword,
        }

        try{
            const createdUser = await User.create(user)

            //iniciando a session
            req.session.userid = createdUser.id
            
            req.flash('message', "Cadastro realizado com sucesso!")
            
            req.session.save(() => {
                res.redirect('/')
            })
        }catch(err){
            console.log(err)
        }

    }

    
}