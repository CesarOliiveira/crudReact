const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors())

// const db = require('./models/db')

const Carros = require('./models/carros');
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'react'
});

app.get("/", (re, res)=> {
    return res.json("From Backend Side");
});

app.get('/cars', (req, res)=> {
    const sql = "SELECT * FROM carros";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/cars/:id", (req, res)=>{
    let id = req.params.id;
    const sql = `SELECT * FROM carros where Id=${id}`;
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.post('/add-cars', async(req, res) => {

     await Carros.create(req.body)
     .then(() => {
        return res.json({
             erro: false,
             mensagem: "Dados para página Carros cadastrado com sucesso!"
         });
     }).catch(() => {
         return res.json({
            erro: true,
            mensagem: "Erro: Dados para página home não cadastrada."
         });
    });   
    
});

app.listen(8081, ()=> {
    console.log("listening");
})