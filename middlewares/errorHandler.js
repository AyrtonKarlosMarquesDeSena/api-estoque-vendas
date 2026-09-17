const errorHandler = (erro, req, res, next) => {
  console.error(erro.stack);

  const status = erro.statusCode || 500;
  const mensagem = erro.message || 'Erro interno do servidor';

  res.status(status).json({ erro: mensagem });
};

module.exports = errorHandler;