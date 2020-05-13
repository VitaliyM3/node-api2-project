const express = require('express');
const server = express();
const postsRouter = require('./postsRouter.js');


server.use(express.json());


server.use('/api/posts', postsRouter);


server.use('/', (req, res) => {
    res.status(200).send("hello from index.js server");
});

server.listen(3000, () => {
    console.log('The server is running');
});