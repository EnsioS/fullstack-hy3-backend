const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  person
    .save()
    .then(response => {
      console.log(`lisätään hekilö ${process.argv[2]} numero ${process.argv[3]} luetteloon`)
      mongoose.connection.close()
    }) 
} else {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()    
    })
}