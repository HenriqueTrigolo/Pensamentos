const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// chamada dos models
const Pensamento = require('./models/Pensamento')
const User = require('./models/User')

//import dos Routes
const pensamentosRoutes = require('./routes/pensamentosRoutes')
const authRoutes = require('./routes/authRoutes')

// import Controller
const PensamentoController = require('./controllers/PensamentoController')


// configuração da template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// configuração para receber dados do body
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// configuração do session middleware
app.use(session({
    name: 'session',
    secret: 'meu_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}))

// configuração das flashs messages
app.use(flash())

// configuração para acessar a pasta publica
app.use(express.static('public'))

// configuração de sessão
app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

// Routes

app.use('/pensamentos', pensamentosRoutes)

app.use('/', authRoutes)

app.get('/', PensamentoController.showPensamentos)

conn.sync()
    //.sync({force:true})
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })