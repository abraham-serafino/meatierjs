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
    console.log(err.message);
  }
}

function subscribe(collectionName, callback) {
  if (clientSocket) {
    clientSocket.on(`collection:${collectionName}`, callback);
  }
}

if (typeof window === 'undefined') {
  db.connect({host: 'localhost', port: 28015}, (err, connection) => {
    if (err) {
      console.log(JSON.stringify(err, null, 2));
      throw err;
    }

    _connection = connection;
  });
}

export default { db, getConnection, publish, subscribe };
