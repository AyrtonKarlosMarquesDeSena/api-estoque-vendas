const express = require('express');
const router = express.Router();
const {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto,
} = require('../controllers/produtoController');

router.post('/', criarProduto);
router.get('/', listarProdutos);
router.get('/:id', buscarProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);

module.exports = router;