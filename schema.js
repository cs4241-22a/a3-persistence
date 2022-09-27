const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true
  },
  fortunes: {
    type: Array,
    required: true
  }
})

UserSchema.methods.deleteFortune = function deleteFortune(num){
    this.fortunes.splice(num, 1)
    this.save()
}

UserSchema.methods.addFortune = function addFortune(fortune){
    fortune.Age = getAge(fortune.DateofBirth)
    fortune.Fortune = getFortune()
    this.fortunes.push(fortune)
    this.save()
}
function getAge(dateString) {
    let today = new Date()
    let birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    let m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

function getFortune(){
  let result = Math.floor(Math.random() * 5)
  if(result === 0) return 'Very Unlucky'
  if(result === 1) return 'Unlucky'
  if(result === 2) return 'Fair'
  if(result === 3) return 'Lucky'
  if(result === 4) return 'Super Lucky'
}

module.exports = mongoose.model("User", UserSchema)