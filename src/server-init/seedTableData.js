import md5 from 'md5';

import rethink from '../lib/rethinkdb';

import EMPLOYEE_SEED_DATA from './EMPLOYEE_SEED_DATA';

async function seedTableData() {
  const { db, getConnection } = rethink;

  try {
    const tableNames = await db.tableList().run(getConnection());

    if (!tableNames.includes(`employees`)) {
      await db.tableCreate(`employees`).run(getConnection());
    }

    if (!tableNames.includes(`users`)) {
      await db.tableCreate(`users`).run(getConnection());
    }

    let rowCount = await db.table(`employees`).count().run(getConnection());

    if (rowCount <= 0) {
      await db.table(`employees`)
        .insert(EMPLOYEE_SEED_DATA)
        .run(getConnection());
    }

    rowCount = await db.table(`users`).count().run(getConnection());

    if (rowCount <= 0) {
      await db.table(`users`)
        .insert({ username: `admin`, password: md5(`password`) })
        .run(getConnection());
    }

  } catch (e) {
    console.error(e.message);
  }
}

export default seedTableData;
