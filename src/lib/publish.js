import rethink from './rethinkdb';

const { getConnection } = rethink;

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

export default publish;
