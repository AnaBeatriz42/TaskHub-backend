const express = require('express');
const app = express();
const cors = require('cors'); 
const port = process.env.PORT || 3001;
const db = require('./app.js');
const mongoose = require('mongoose');
const taskRouter = require('./Router/task.js');
const userRouter = require('./Router/user.js');

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json());

app.use('/api', taskRouter);

app.use('/api', userRouter);

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the Node.js server!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
