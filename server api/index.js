const { response } = require('express')
const express = require('express')
const req = require('express/lib/request')
const server = express()
const PORT = process.env.PORT || 8080

const mysql = require('mysql')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    port: 3306,
    database : 'dbadmin',
    password : '1234'
})

server.use(express.json())

connection.connect(function (error){
    if(error){
        throw error
    }else{
        console.log("¡Conexion exitosa!")
    }
})

server.get('/', (req, res) =>{
    res.send('<h1>Hola</h1>')
})

server.get('/api/manager', (req,res)=>{
    connection.query('SELECT us.NameUser as user_name, ma.Amount as amount, ma.Category as category, ma.Depiction as description FROM manager ma inner join user us on ma.IdUser = us.id', (error,filas)=>{
        if(error){
            console.log(error)
            let err = { message: "internal server error", code: 500, cause: [], code_name: "internal_server_err" }
            res.status(500)
        }else{
            res.send(filas)
        }
    })
})

server.get('/api/manager/:id/last_movement', (req,res)=>{
    connection.query('SELECT us.NameUser as user_name, ma.Amount as amount, ma.Category as category, ma.Depiction as description, ma.DateOp as date FROM manager ma inner join user us on ma.IdUser = us.id where us.id = ?  order by ma.DateOp desc limit 2', [req.params.id], (error,filas)=>{
        if(error){
            console.log(error)
            let err = { message: "internal server error", code: 500, cause: [], code_name: "internal_server_err" }
            res.status(500)
        }else{
            res.send(filas)
        }
    })
})

server.get('/api/manager/:id/last_movement/total', (req,res)=>{
    connection.query('SELECT us.NameUser as user_name, sum(ma.Amount) as total FROM manager ma inner join user us on ma.IdUser = us.id where us.id = ?  order by ma.DateOp desc limit 2', [req.params.id], (error,filas)=>{
        if(error){
            console.log(error)
            let err = { message: "internal server error", code: 500, cause: [], code_name: "internal_server_err" }
            res.status(500)
        }else{
            res.send(filas)
        }
    })
})

server.get('/api/manager/:id', (req,res)=>{
    connection.query('SELECT us.NameUser as user_name, ma.Amount as amount, ma.Category as category, ma.Depiction as description FROM manager ma inner join user us on ma.IdUser = us.id where us.id = ?', [req.params.id], (error,filas)=>{
        if(error){
            console.log(error)
            let err = { message: "internal server error", code: 500, cause: [], code_name: "internal_server_err" }
            res.status(500)
        }else{
            res.send(filas)
        }
    })
})

server.get('/api/manager/:id/total', (req,res)=>{
    connection.query('SELECT us.id as user_id, sum(ma.Amount) as total FROM manager ma inner join user us on ma.IdUser = us.id where us.id = ?', [req.params.id], (error,filas)=>{
        if(error){
            console.log(error)
            let err = { message: "internal server error", code: 500, cause: [], code_name: "internal_server_err" }
            res.status(500)
        }else{
            if(filas[0].total == null){
                let err = { message: "Not found user id", code: 404, cause: [], code_name: "not_found" }
                res.status(404)
                res.send(err)
              
               return 
            }
            res.send(filas[0])
        }
    })
})

server.post('/api/manager', (req,res) => {
    let data = {idOp: 10 ,iduser:req.body.id_user, Amount:req.body.amount, Category:req.body.category}
    let sql = "INSERT INTO manager SET  ?"
    connection.query(sql, data, function(error, results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})



server.listen(PORT, () =>{
    console.log(`ESCUCHO PUERTO ${PORT}`)
})
