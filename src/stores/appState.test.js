import appState from './appState';

test('App State - update name', () => {
  expect(new appState().updateName({ name: 'Alice' }, 'Bob'))
    .toEqual({ name: 'Bob' });
});

test('App State - update rank', () => {
  expect(new appState().updateRank({ rank: 'CEO' }, 'fired'))
  .toEqual({ rank: 'fired' });
});

test('App State - reset', () => {
  expect(new appState().reset())
  .toEqual({ name: '', rank: '' });
});
