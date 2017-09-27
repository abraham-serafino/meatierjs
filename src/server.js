import browserify from 'express-browserify';
import express from 'express';
import http from 'http';
import socket from 'socket.io';

import config from './config';
import getModels from './server-init/getModels';
import rethink from './lib/rethinkdb';
import seedTableData from './server-init/seedTableData';

const app = express();
const server = http.createServer(app);

socket(server).on(`connection`, (io) => {
  console.log(`a user connected`);

  getModels(io);
  seedTableData();

  const { db, publish } = rethink;
  publish(io, `employees`, () => db.table(`employees`));
});

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === `dev`) {
  app.get(`/client.js`, browserify(`src/client.js`, { debug: true }));
}

const port = config.port;

server.listen(port, () => {
  console.log(`listening on :${port}...`);
});
