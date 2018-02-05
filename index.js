const express = require('express')
const app = express()

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

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})