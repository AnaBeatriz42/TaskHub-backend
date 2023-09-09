const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  email: String,
  telefone: String,
  senha: String
});

const user = mongoose.model('User', userSchema);

module.exports = user; 