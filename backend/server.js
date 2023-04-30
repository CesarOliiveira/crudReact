const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const Carros = require('./models/carros');



app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'react'
});

app.get("/", (req, res)=> {
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
        return res.status(200).json( {
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

app.put('/edit-cars/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE carros SET `Marca` = ?, `Modelo` = ?, `Ano` = ? WHERE `Id` = " + id;

    const values = [
        req.body.Marca,
        req.body.Modelo,
        req.body.Ano,
    ];

    db.query(sql, [...values], (err)=>{
            if(err) return res.status(400).json({
                error: true,
                mensagem: "Erro: Não foi possivel Alterar o carro. "
            });
            return res.status(200).json({
                erro: false,
                message: "Carro Alterado com sucesso!"
            });
    }) 
});

app.delete('/remove-cars/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM carros WHERE Id = ${id};`
        db.query(sql, (err)=>{
            if(err) return res.status(400).json({
                error: true,
                mensagem: "Erro: Não foi possivel remover carro. "
            });
            return res.json({
                erro: false,
                message: "Carro apagado com sucesso!"
            });
        }) 
});

app.listen(8081, ()=> {
    console.log("listening");
})