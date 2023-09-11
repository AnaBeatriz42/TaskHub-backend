const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


router.post('/user', async (req, res) => {
     try {
          const salt = await bcrypt.genSalt(10);
          const senhaCripto = await bcrypt.hash(req.body.senha, salt);

          const user = new User({
               nome: req.body.nome,
               cpf: req.body.cpf,
               telefone: req.body.telefone,
               email: req.body.email,
               senha: senhaCripto
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

router.post("/user/login", async (req, res) => {
     console.log(req.body)
     const email = req.body.email;
     const senha = req.body.senha;

     try {
          const usuario = await User.findOne({ email: email });

          console.log(usuario)
          if (usuario && (bcrypt.compareSync(senha, usuario.senha))) {
               console.log('Sucesso')
               const payload = {
                    sub: usuario._id,
                    iss: "taskhub-backend",
                    aud: "taskhub-frontend",
                    email: usuario.email,
               };
               const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' })
               console.log(token)
               res.json({ accessToken: token , id: usuario._id, nome: usuario.nome})
          } else {
               console.log('Falha ao autenticar. Usuário ou senha inválidos')
               res.status(403).json({ msg: "usuário ou senha inválidos" })
          }

     } catch (error) {
          console.error('Erro ao buscar usuário por email:', error);
          res.status(500).json({ error: 'Erro ao buscar usuário por email' });
     }

});

module.exports = router;
