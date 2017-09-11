import babelify from 'babelify';
import browserify from 'browserify';
import browserifyCss from 'browserify-css';
import express from 'express';
import http from 'http';
import socket from 'socket.io';

import rethink from './lib/rethinkdb';
import getModels from './server-init/getModels';
import seedTableData from './server-init/seedTableData';

const app = express();
const server = http.createServer(app);

socket(server).on('connection', (io) => {
  console.log('a user connected');

  getModels(io);
  seedTableData();

  const { db, publish } = rethink;
  publish(io, 'employees', () => db.table('employees'));
});

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'dev') {
  app.get('/client.js', (req, res) => {
      browserify({ debug: true })
        .require('babel-core/register')
        .require('babel-polyfill')
        .add('src/client.js')
        .transform('babelify', {
          presets: ['env', 'stage-0', 'react'],
          plugins: ['transform-es2015-modules-commonjs', "transform-runtime"],
          minified: true,
          sourceMap: true
        })
        .transform('browserify-css', { autoInject: true })
        .bundle()
        .pipe(res);
  });
}

server.listen(9001, () => {
  console.log('listening on :9001...');
});
