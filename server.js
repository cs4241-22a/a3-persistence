const express = require('express')
const cookie = require('cookie-session')
const app = express()

app.use(express.static('public'))
app.use( express.urlencoded({ extended:true }) )

app.use( cookie({
    name: 'session',
    keys: ['key1', 'key2']
  }))

app.get('/', (req, res) => {
    res.send('/index.html')
})

app.post( '/login', (req,res)=> {
    // express.urlencoded will put your key value pairs 
    // into an object, where the key is the name of each
    // form field and the value is whatever the user entered
    console.log( req.body )
    
    // below is *just a simple authentication example* 
    // for A3, you should check username / password combos in your database
    if( req.body.password === 'test' ) {
      // define a variable that we can check in other middleware
      // the session object is added to our requests by the cookie-session middleware
      req.session.login = true
      
      // since login was successful, send the user to the main content
      // use redirect to avoid authentication problems when refreshing
      // the page or using the back button, for details see:
      // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
      res.redirect( 'main.html' )
    }else{
      // password incorrect, redirect back to login page
      res.sendFile( __dirname + '/public/index.html' )
    }
  })
  
  // add some middleware that always sends unauthenicaetd users to the login page
  app.use( function( req,res,next) {
    if( req.session.login === true )
      next()
    else
      res.sendFile( __dirname + '/public/index.html' )
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