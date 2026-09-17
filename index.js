require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');

const app = express();

conectarDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Estoque e Vendas rodando!');
});

const produtoRoutes = require('./routes/produtoRoutes');
app.use('/produtos', produtoRoutes);

const vendaRoutes = require('./routes/vendaRoutes');
app.use('/vendas', vendaRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});