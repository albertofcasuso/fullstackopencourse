const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    "name": "marian",
    "number": "23329823",
    "id": 6
  },
  {
    "name": "mazdey",
    "number": "2913892819",
    "id": 7
  },
  {
    "name": "casuso",
    "number": "666",
    "id": 8
  },
  {
    "name": "alberto",
    "number": "5542438754",
    "id": 9
  },
  {
    "name": "satanas",
    "number": "666",
    "id": 10
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
