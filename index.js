const express = require('express');
const server = express();
require('dotenv').config();

const postsRouter = require('./postsRouter.js');


server.use(express.json());


server.use('/api/posts', postsRouter);

const port = process.env.PORT || 5000;


server.use('/', (req, res) => {
    res.status(200).send("hello from index.js server");
});

server.listen(port, () => {
    console.log('The server is running');
});