import employeeList from './employeeList';

test('Employee List - add employee', () => {
  expect(new employeeList().addEmployee(
      [{ name: 'Bob', rank: 'Manager', sn: 1 }],
      { name: 'Sally', rank: 'CEO', sn: 2 }
  )).toEqual([
    { name: 'Bob', rank: 'Manager', sn: 1 },
    { name: 'Sally', rank: 'CEO', sn: 2 }
  ]);
});

test('Employee List - add employee', () => {
  const bob = { name: 'Bob', rank: 'Manager', sn: 1 };
  const sally = { name: 'Sally', rank: 'CEO', sn: 2 };

  expect(new employeeList().removeEmployee([bob, sally], bob))
    .toEqual([sally]);
});
