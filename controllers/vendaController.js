const Venda = require('../models/Venda');
const Produto = require('../models/Produto');

// Criar venda
const criarVenda = async (req, res, next) => {
  try {
    const { produtoId, quantidade } = req.body;

    if (!quantidade || quantidade <= 0) {
      const erro = new Error('Quantidade deve ser maior que zero');
      erro.statusCode = 400;
      throw erro;
    }

    const produto = await Produto.findById(produtoId);
    if (!produto) {
      const erro = new Error('Produto não encontrado');
      erro.statusCode = 404;
      throw erro;
    }

    if (produto.quantidade < quantidade) {
      const erro = new Error('Estoque insuficiente');
      erro.statusCode = 400;
      throw erro;
    }

    const valorTotal = produto.preco * quantidade;

    const venda = await Venda.create({
      produto: produtoId,
      quantidade,
      valorTotal,
    });

    produto.quantidade -= quantidade;
    await produto.save();

    res.status(201).json(venda);
  } catch (erro) {
    next(erro);
  }
};

// Listar vendas
const listarVendas = async (req, res, next) => {
  try {
    const vendas = await Venda.find().populate('produto');
    res.status(200).json(vendas);
  } catch (erro) {
    next(erro);
  }
};

// Deletar venda (cancelar)
const deletarVenda = async (req, res, next) => {
  try {
    const venda = await Venda.findById(req.params.id);
    if (!venda) {
      const erro = new Error('Venda não encontrada');
      erro.statusCode = 404;
      throw erro;
    }

    const produto = await Produto.findById(venda.produto);
    if (produto) {
      produto.quantidade += venda.quantidade;
      await produto.save();
    }

    await Venda.findByIdAndDelete(req.params.id);

    res.status(200).json({ mensagem: 'Venda cancelada e estoque devolvido' });
  } catch (erro) {
    next(erro);
  }
};

module.exports = {
  criarVenda,
  listarVendas,
  deletarVenda,
};