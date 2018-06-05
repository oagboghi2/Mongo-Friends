const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const friendsController = require('./friends/friendsController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//build a controller

server.use('/api/friends', friendsController);


server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});
//build a mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/', {}, (err => {
  err ? console.log(err): console.log('Mongoose is connected to our Database')
}))
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
