import browserify from 'express-browserify';
import express from 'express';
import http from 'http';
import postcssScss from 'postcss-scss';
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
  const plugin = [
    'autoprefixer',
    'css-mqpacker',
    'cssnano',
    'lost',
    'postcss-assets',
    'postcss-cssnext',
    'precss'
  ];

  app.get('/client.js', browserify('src/client.js', {
    debug: true,
    transform: [
        ['browserify-postcss', {
          plugin,
          inject: true,
          postCssOptions: {
            parser: postcssScss,
            map: { inline: true },
          }
        }],

        ['babelify', {
          presets: ['env', 'stage-0', 'react'],
          plugins: ['transform-es2015-modules-commonjs']
        }]
    ]
  }));
}

server.listen(9001, () => {
  console.log('listening on :9001...');
});
