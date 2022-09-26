const express = require('express')
const cookie = require('cookie-session')
const helmet = require('helmet')
const mongodb = require('mongodb')
const app = express()
require('dotenv').config()

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }) )
app.use(express.json())

//Cookie
app.use( cookie({
    name: 'session',
    keys: ['key1', 'key2'],
  }))

//Helmet
app.use(helmet())

app.use( (req,res,next) => {
    if( collection_login !== null && collection_pokemon !== null) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection_pokemon = client.db('Pokemon').collection('pokemon')
let collection_login = client.db('Pokemon').collection('login')

app.get('/', (req, res) => {
    res.send('/index.html')
})

app.get('/data', (req, res) => {
    collection_pokemon.find( { user: req.session.user } ).toArray().then(result => {
        res.send(result)
    })
})

app.post( '/login', (req,res)=> { 
    collection_login.findOne({username: req.body.username})
    .then((result => {
        if (result !== null) {
            if (result.password === req.body.password) {
                req.session.login = true
                req.session.user = req.body.username
                res.redirect('main.html')
            }
            else {
                res.redirect('index.html')
            }
        }
        else{
            collection_login.insertOne(req.body).then(result => {
                req.session.login = true
                req.session.user = req.body.username
                res.redirect( 'main.html' )
            })
        }
    }))
  })

app.use( function( req,res,next) {
    if( req.session.login === true )
        next()
    else
        res.sendFile( __dirname + '/public/index.html' )
})

app.post( '/submit', (req, res) => {
    const pokemon = addTypeChart(req.body)
    pokemon.user = req.session.user
    collection_pokemon.replaceOne({user: req.session.user, name: pokemon.name}, pokemon, {upsert: true})
})

app.delete('/delete', (req, res) => {
    collection_pokemon.deleteOne( { user: req.session.user, name: req.body.name })
})

app.listen( process.env.PORT || 3000 )

const weaknesses = {
    'Normal': ['Fighting'],
    'Fighting': ['Flying', 'Psychic', 'Fairy'],
    'Flying': ['Rock', 'Electric', 'Ice'],
    'Poison': ['Ground', 'Psychic'],
    'Ground': ['Water', 'Grass', 'Ice'],
    'Rock': ['Fighting', 'Ground', 'Steel', 'Water', 'Grass'],
    'Bug': ['Flying', 'Rock', 'Fire'],
    'Ghost': ['Ghost', 'Dark'],
    'Steel': ['Fighting', 'Ground', 'Fire'],
    'Fire': ['Ground', 'Rock', 'Water'],
    'Water': ['Grass', 'Electric'],
    'Grass': ['Flying', 'Poison', 'Bug', 'Fire', 'Ice'],
    'Electric': ['Ground'],
    'Psychic': ['Bug', 'Ghost', 'Dark'],
    'Ice': ['Fighting', 'Rock', 'Steel', 'Fire'],
    'Dragon': ['Ice', 'Dragon', 'Fairy'],
    'Dark': ['Fighting', 'Bug', 'Fairy'],
    'Fairy': ['Poison', 'Steel'],
    'None': []
}
  
const resistances = {
    'Normal': [],
    'Fighting': ['Rock', 'Bug', 'Dark'],
    'Flying': ['Fighting', 'Bug', 'Grass'],
    'Poison': ['Fighting', 'Poison', 'Bug', 'Grass', 'Fairy'],
    'Ground': ['Poison', 'Rock'],
    'Rock': ['Normal', 'Flying', 'Poison', 'Fire'],
    'Bug': ['Fighting', 'Ground', 'Grass'],
    'Ghost': ['Poison', 'Bug'],
    'Steel': ['Normal', 'Flying', 'Rock', 'Bug', 'Steel', 'Grass', 'Psychic', 'Ice', 'Dragon', 'Fairy'],
    'Fire': ['Bug', 'Steel', 'Fire', 'Grass', 'Ice', 'Fairy'],
    'Water': ['Steel', 'Fire', 'Water', 'Ice'],
    'Grass': ['Ground', 'Water', 'Grass', 'Electric'],
    'Electric': ['Flying', 'Steel', 'Electric'],
    'Psychic': ['Fighting', 'Psychic'],
    'Ice': ['Ice'],
    'Dragon': ['Fire', 'Water', 'Grass', 'Electric'],
    'Dark': ['Ghost', 'Dark'],
    'Fairy': ['Fighting', 'Bug', 'Dark'],
    'None': []
}

const immunities = {
    'Normal': ['Ghost'],
    'Fighting': [],
    'Flying': ['Ground'],
    'Poison': [],
    'Ground': ['Electric'],
    'Rock': [],
    'Bug': [],
    'Ghost': ['Normal', 'Fighting'],
    'Steel': ['Poison'],
    'Fire': [],
    'Water': [],
    'Grass': [],
    'Electric': [],
    'Psychic': [],
    'Ice': [],
    'Dragon': [],
    'Dark': ['Psychic'],
    'Fairy': ['Dragon'],
    'None': []
}

const addTypeChart = function( pokemon ) {
    const type1 = pokemon.type1,
        type2 = pokemon.type2

    const weaknesses1 = weaknesses[type1],
        weaknesses2 = weaknesses[type2],
        resistances1 = resistances[type1],
        resistances2 = resistances[type2],
        immunities1 = immunities[type1],
        immunities2 = immunities[type2]


    const finalImmunities = [],
        finalWeaknesses = [],
        finalResistances = []

    immunities1.forEach(element => {
        finalImmunities.push(element)
    });

    immunities2.forEach(element => {
        if(!finalImmunities.includes(element)) {
        finalImmunities.push(element)
        }
    });

    weaknesses1.forEach(element => {
        if(!finalImmunities.includes(element) && !resistances2.includes(element)) {
        finalWeaknesses.push(element)
        }
    });

    weaknesses2.forEach(element => {
        if(!finalImmunities.includes(element) && !resistances1.includes(element) && !finalWeaknesses.includes(element)) {
        finalWeaknesses.push(element)
        }
    });

    resistances1.forEach(element => {
        if(!finalImmunities.includes(element) && !weaknesses2.includes(element)) {
        finalResistances.push(element)
        }
    });

    resistances2.forEach(element => {
        if(!finalImmunities.includes(element) && !weaknesses1.includes(element) && !finalResistances.includes(element)) {
        finalResistances.push(element)
        }
    });

    pokemon.immunities = finalImmunities
    pokemon.resistances = finalResistances
    pokemon.weaknesses = finalWeaknesses

    return pokemon
}