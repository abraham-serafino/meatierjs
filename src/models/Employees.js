import rethink from '../lib/rethinkdb';
import SuperModel from '../lib/SuperModel';

const { db, getConnection } = rethink;

class Employees extends SuperModel {
  constructor(socket) {
    super('Employees', Employees, socket);
  }

  create({ name, rank, sn }) {
    try {
      db.table('employees').insert({ name, rank, sn })
        .run(getConnection());
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  }

  remove({ name }) {
    try {
      db.table('employees').filter(db.row('name').eq(name)).delete()
        .run(getConnection());
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  }
}

export default Employees;
