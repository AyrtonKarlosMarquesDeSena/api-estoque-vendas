const Produto = require('../models/Produto');

const criarProduto = async (req, res, next) => {
  try {
    const { nome, quantidade, preco } = req.body;
    const produto = await Produto.create({ nome, quantidade, preco });
    res.status(201).json(produto);
  } catch (erro) {
    next(erro);
  }
};

const listarProdutos = async (req, res, next) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (erro) {
    next(erro);
  }
};

const buscarProduto = async (req, res, next) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      const erro = new Error('Produto não encontrado');
      erro.statusCode = 404;
      throw erro;
    }
    res.status(200).json(produto);
  } catch (erro) {
    next(erro);
  }
};

const atualizarProduto = async (req, res, next) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!produto) {
      const erro = new Error('Produto não encontrado');
      erro.statusCode = 404;
      throw erro;
    }
    res.status(200).json(produto);
  } catch (erro) {
    next(erro);
  }
};

const deletarProduto = async (req, res, next) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      const erro = new Error('Produto não encontrado');
      erro.statusCode = 404;
      throw erro;
    }
    res.status(200).json({ mensagem: 'Produto removido com sucesso' });
  } catch (erro) {
    next(erro);
  }
};

module.exports = {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto,
};