const Sequelize = require('sequelize');
const db = require('./db');


const Carros = db.define('carros', {
    Id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Marca: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Modelo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

// Criar a Tabela.
// Carros.sync();

module.exports = Carros;