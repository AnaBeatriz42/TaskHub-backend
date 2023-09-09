const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  status: {
    type: String,
    enum: ["nao_iniciada", "em_progresso", "finalizada", "arquivada"],
    default: "nao_iniciada",
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
