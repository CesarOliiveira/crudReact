const Sequelize = require('sequelize');

const sequelize = new Sequelize('react', 'root', 'toor', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão realizada com sucesso.")
}).catch(function() {
    console.log("Erro: Não foi Possivel conectar ao banco de dados.")
});

module.exports = sequelize;


