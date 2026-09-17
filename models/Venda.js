const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto',
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  valorTotal: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Venda', vendaSchema);