const express = require('express');
const router = express.Router();
const User = require('../model/user');


router.post('/user', async (req, res) => {
     try {
          const user = new User({
               nome: req.body.nome,
               cpf: req.body.cpf,
               telefone: req.body.telefone,
               senha: req.body.senha
          });

          const savedUser = await user.save();
          res.status(201).json(savedUser);

     } catch (error) {
          console.error('Erro ao criar usuário:', error);
          res.status(500).json({ error: 'Erro ao criar usuário' });
     }
});

router.get('/user', async (req, res) => {
     try {
          const users = await User.find();
          res.status(200).json(users);
     } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          res.status(500).json({ error: 'Erro ao buscar usuário' });
     }
});

router.get('/user/:id', async (req, res) => {
     try {
          const taskId = req.params.id;
          const task = await User.findById(taskId);
          if (!task) {
               return res.status(404).json({ error: 'usuário não encontrada' });
          }
          res.status(200).json(task);
     } catch (error) {
          console.error('Erro ao buscar usuário por ID:', error);
          res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
     }
});


module.exports = router;
