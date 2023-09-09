const express = require('express');
const router = express.Router();
const Task = require('../model/tasks');

router.post('/tasks', async (req, res) => {
     try {
          const newTask = new Task({
               titulo: req.body.titulo,
               descricao: req.body.descricao,
               usuario: req.body.usuario
          });

          const savedTask = await newTask.save();
          res.status(201).json(savedTask);

     } catch (error) {
          console.error('Erro ao criar tarefa:', error);
          res.status(500).json({ error: 'Erro ao criar tarefa' });
     }
});

router.get('/tasks', async (req, res) => {
     try {
          const tasks = await Task.find();
          res.status(200).json(tasks);
     } catch (error) {
          console.error('Erro ao buscar tarefas:', error);
          res.status(500).json({ error: 'Erro ao buscar tarefas' });
     }
});

router.get('/tasks/:id', async (req, res) => {
     try {
          const taskId = req.params.id;
          const task = await Task.findById(taskId);
          if (!task) {
               return res.status(404).json({ error: 'Tarefa não encontrada' });
          }
          res.status(200).json(task);
     } catch (error) {
          console.error('Erro ao buscar tarefa por ID:', error);
          res.status(500).json({ error: 'Erro ao buscar tarefa por ID' });
     }
});

router.put('/tasks/:id', async (req, res) => {
     try {
          const taskId = req.params.id;
          const updates = req.body;

          const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

          if (!updatedTask) {
               return res.status(404).json({ error: 'Tarefa não encontrada' });
          }
          res.status(200).json(updatedTask);

     } catch (error) {
          console.error('Erro ao atualizar tarefa por ID:', error);
          res.status(500).json({ error: 'Erro ao atualizar tarefa por ID' });
     }
});

router.get('/tasks/user/:id', async (req, res) => {
     try {
          const userId = req.params.id;

          const tasks = await Task.find({ usuario: userId });
          res.status(200).json(tasks);
          
     } catch (error) {
          console.error('Erro ao buscar tarefas por ID de usuário:', error);
          res.status(500).json({ error: 'Erro ao buscar tarefas por ID de usuário' });
     }
});

module.exports = router;
