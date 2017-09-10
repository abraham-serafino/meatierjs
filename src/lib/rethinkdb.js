import db from 'rethinkdb';

let _connection = null;

function getConnection() {
  return _connection;
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

export default { db, getConnection };
