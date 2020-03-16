var express = require ('express')
var app = express()
app.set('view engine', 'ejs')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('./public'))
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/covid2019', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', function (req, res) {

    res.render('find')

})


var DadosPais = mongoose.model('corona', {

    nome_pais: String,
    casos: String,
    mortes: String,
    regiao: String,
    total_recuperados: String,
    novas_mortes:String,
    novos_casos: String,
    casos_serios: String
})

app.get('/find', function (req, res) {

    res.render('find')

})


app.post('/dados', function (req, res) {

    DadosPais.find({nome_pais: req.body.pais}, function (err, docs) {

        if(err) console.log(err)


        console.log(docs)

        res.render('dados', {

            nom: docs[docs.length - 1].nome_pais,
            cas: docs[docs.length - 1].casos,
            mor: docs[docs.length - 1].mortes,
            reg: docs[docs.length - 1].regiao,
            total_rec: docs[docs.length - 1].total_recuperados,
            novas_mor:docs[docs.length - 1].novas_mortes,
            novos_cas: docs[docs.length - 1].novos_casos,
            casos_ser: docs[docs.length - 1].casos_serios

        })
    })
})


app.listen('5051', function () {

    console.log('servidor rodando')

})