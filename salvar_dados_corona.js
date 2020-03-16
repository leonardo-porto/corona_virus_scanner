var fs = require('fs')
var unirest = require("unirest");
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/covid2019', {useNewUrlParser: true, useUnifiedTopology: true});

var req = unirest("GET", "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php");


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

var array = []



req.headers({
	"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
	"x-rapidapi-key": "chave de acesso"
});


req.end(function (res) {
    if (res.error) throw new Error(res.error);

    var corona = JSON.parse(res.body)



    for (i = 0; i < corona.countries_stat.length; i ++){

        if(corona.countries_stat[i].country_name == 'China'){

            console.log(corona.countries_stat[i])

        }


    }

    for (i = 0; i < corona.countries_stat.length; i++){

        array[i] = new DadosPais({

            nome_pais:corona.countries_stat[i].country_name,
            casos: corona.countries_stat[i].cases,
            mortes: corona.countries_stat[i].deaths,
            regiao: corona.countries_stat[i].region,
            total_recuperados: corona.countries_stat[i].total_recovered,
            novas_mortes:corona.countries_stat[i].new_deaths,
            novos_casos: corona.countries_stat[i].new_cases,
            casos_serios: corona.countries_stat[i].serious_critical
        })

        array[i].save()


    }

    function atualizarDados() {


        for (i = 0; i < corona.countries_stat.length; i++){

            array[i] = new DadosPais({

                nome_pais:corona.countries_stat[i].country_name,
                casos: corona.countries_stat[i].cases,
                mortes: corona.countries_stat[i].deaths,
                regiao: corona.countries_stat[i].region,
                total_recuperados: corona.countries_stat[i].total_recovered,
                novas_mortes:corona.countries_stat[i].new_deaths,
                novos_casos: corona.countries_stat[i].new_cases,
                casos_serios: corona.countries_stat[i].serious_critical
            })

            array[i].save()
            console.log('dados atualizados em: ' + new Date())

           fs.writeFile('./corona_file.json', JSON.stringify(corona.countries_stat), function (err) {

           console.log('dados salvos')

           })


        }

    }

    setInterval(atualizarDados, 1000*60*60)








    //console.log(corona.countries_stat)

    fs.writeFile('./corona_file.json', JSON.stringify(corona.countries_stat), function (err) {

        console.log('dados salvos')

    })




});