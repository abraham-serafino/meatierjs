import get from 'lodash.get';

import rethink from './lib/rethinkdb';

const { db, getConnection } = rethink;

async function authenticate({ username, password, permissions = `` }) {
  const user = db.table(`users`)
    .filter({ username, password })
    .run(getConnection());

  if (
    (!user) ||
    (permissions && !get(user, permissions, null))
  ) {
    throw new Error(`Permission denied`);
  }
}

export default authenticate;
