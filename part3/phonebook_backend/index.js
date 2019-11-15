const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    "name": "marian",
    "number": "23329823",
    "id": 1
  },
  {
    "name": "mazdey",
    "number": "2913892819",
    "id": 2
  },
  {
    "name": "casuso",
    "number": "666",
    "id": 3
  },
  {
    "name": "alberto",
    "number": "5542438754",
    "id": 4
  },
  {
    "name": "satan",
    "number": "666",
    "id": 5
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info',(req, res)=>{
  const length = persons.length
  const fecha = new Date()
  res.send(`
    <p>The page has info for ${length} people</p>
    <p>${fecha}</p>`)
})

app.get('/api/persons/:id',(request, response)=>{
  const id = Number(request.params.id)
  const person = persons.find(person=>person.id === id)
  person?
  response.json(person)
  :response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})



app.post('/api/persons', (request, response) => {
  const randomId =(max) =>{
    return Math.floor(Math.random()*Math.floor(max))
  }

  const person = request.body
  person.id = randomId(5000)

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
