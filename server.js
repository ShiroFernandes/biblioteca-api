const express = require('express');
const sequelize = require('./config/database'); // Importa a conexão com o banco de dados
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const app = express(); // Inicializa o Express
const PORT = process.env.PORT || 3000; // Define a porta do servidor

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Testa a conexão com o banco de dados antes de iniciar o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincroniza os modelos com o banco de dados
    return sequelize.sync({ alter: true }); // Usa alter para atualizar tabelas sem perder dados
  })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ou sincronizar com o banco de dados:', error);
  });

// Rota de teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});