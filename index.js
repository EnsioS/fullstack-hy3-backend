const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",  
//     id: 1,
//   },
//   {
//     name: "Martti Tienari",
//     number: "040-123456",        
//     id: 2,
//   },
//   {
//     name: "Arto Järvinen",
//     number: "040-123456",        
//     id: 3,
//   },
//   {
//     name: "Lea Kutvonen",
//     number: "040-123456",        
//     id: 4,
//   }  
// ]

app.get('/info', (request, response) => {
    const info = `<p> puhelinluettossa ${persons.length} henkilön tiedot </p>
                  <p>${new Date()}</p>`
    response.send(info)    
})

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//const generateId = () => Math.floor(Math.random()*1000000*persons.length)

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }// else if (persons.find(person => person.name === body.name)) {
  //  return response.status(400).json({ error: 'name must be unique' })
  //}

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => {
      response.json(Person.format(savedPerson))
    })
    .catch(error => {
      console.log(error)
    })
})  

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})