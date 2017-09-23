import db from 'rethinkdb';

let clientSocket;

if (typeof window !== 'undefined') {
  clientSocket = require('./util').clientSocket;
}

let _connection = null;

function getConnection() {
  return _connection;
}

async function sendLatest(socket, collectionName, getQuery) {
  const cursor = await getQuery().run(getConnection());
  const results = await cursor.toArray();

  socket.emit(`collection:${collectionName}`, results);
}

function publish(socket, collectionName, getQuery) {
  try {
    getQuery().changes().run(getConnection(), (err, changes) => {
      if (err) throw err;

      sendLatest(socket, collectionName, getQuery);

      changes.each((err) => {
        if (err) throw err;
        sendLatest(socket, collectionName, getQuery);
      });
    });
  } catch (err) {
    console.error(err.message);
  }
}

const collections = {};

function subscribe(collectionName, component) {
  collections.component = component;

  if (collections[collectionName]) {
    component.setState({ [collectionName]: collections[collectionName] });
  }

  if (clientSocket && !collections.handler) {
    clientSocket.on(`collection:${collectionName}`, (data) => {
      collections[collectionName] = data;
      if (collections.component) {
        collections.component.setState({ [collectionName]: data });
      }
    });
  }
}

if (typeof window === 'undefined') {
  db.connect({host: 'localhost', port: 28015}, (err, connection) => {
    if (err) {
      console.error(JSON.stringify(err, null, 2));
      throw err;
    }

    _connection = connection;
  });
}

export default { db, getConnection, publish, subscribe };
