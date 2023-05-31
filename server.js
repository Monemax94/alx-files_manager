import express from 'express';
import routerFunc from './routes/index';

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

routerFunc(server);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default server;