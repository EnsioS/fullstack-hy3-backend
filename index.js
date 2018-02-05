const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    name: "Arto Hellas",
    numder: "040-123456",  
    id: 1,
  },
  {
    name: "Martti Tienari",
    numder: "040-123456",        
    id: 2,
  },
  {
    name: "Arto Järvinen",
    numder: "040-123456",        
    id: 3,
  },
  {
    name: "Lea Kutvonen",
    numder: "040-123456",        
    id: 4,
  }  
]

app.get('/info', (request, response) => {
    const info = `<p> puhelinluettossa ${persons.length} henkilön tiedot </p>
                  <p>${new Date()}</p>`
    response.send(info)    
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

const generateId = () => Math.floor(Math.random()*1000000*persons.length)

app.post('/api/persons', (request, response) => {
  const person = request.body
  person.id = generateId()

  console.log(person.id)

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})