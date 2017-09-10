import rethink from '../lib/rethinkdb';

import AUTHOR_SEED_DATA from './EMPLOYEE_SEED_DATA';

async function seedTableData() {
  const { db, getConnection } = rethink;

  try {
    const tableNames = await db.tableList().run(getConnection());

    if (!tableNames.includes('employees')) {
      await db.tableCreate('employees').run(getConnection());
    }

    const rowCount = await db.table('employees').count().run(getConnection());

    if (rowCount <= 0) {
      await db.table('employees').insert(AUTHOR_SEED_DATA).run(getConnection());
    }
  } catch (e) {
    console.error(e.message);
  }
}

export default seedTableData;
