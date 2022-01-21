const express = require('express')
const server = express()



server.get('/', (req, res) =>{
    res.send('<h1>Hola</h1>')
})

server.get('/api/notes', (req, res) =>{
    res.json(notes)
})



const PORT = 8080
server.listen(PORT, () =>{
    console.log(`ESCUCHO PUERTO ${PORT}`)
})
