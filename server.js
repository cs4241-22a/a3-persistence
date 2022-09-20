const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('/index.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


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