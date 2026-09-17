const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do produto é obrigatório'],
    trim: true,
  },
  quantidade: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'A quantidade não pode ser negativa'],
  },
  preco: {
    type: Number,
    required: [true, 'O preço é obrigatório'],
    min: [0, 'O preço não pode ser negativo'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Produto', produtoSchema);