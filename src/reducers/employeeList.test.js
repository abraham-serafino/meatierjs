/* global describe, it, expect */
import employeeList from './employeeList';

describe('Employee List', () => {
  it('Employee List - add employee', () => {
    expect(new employeeList().addEmployee(
      [{ name: 'Bob', rank: 'Manager', sn: 1 }],
      { name: 'Sally', rank: 'CEO', sn: 2 }
    )).toEqual([
      { name: 'Bob', rank: 'Manager', sn: 1 },
      { name: 'Sally', rank: 'CEO', sn: 2 }
    ]);
  });

  it('Employee List - remove employee', () => {
    const bob = { name: 'Bob', rank: 'Manager', sn: 1 };
    const sally = { name: 'Sally', rank: 'CEO', sn: 2 };

    expect(new employeeList().removeEmployee([bob, sally], bob))
      .toEqual([sally]);
  });

  it('Employee List - reset employees', () => {
    const bob = { name: 'Bob', rank: 'Manager', sn: 1 };
    const sally = { name: 'Sally', rank: 'CEO', sn: 2 };

    expect(new employeeList().resetEmployees([], [bob, sally]))
      .toEqual([bob, sally]);
  });
});
