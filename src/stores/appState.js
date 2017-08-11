import { createReducer } from './SimpleStore';

const initialState = { name: '', rank: '' };

const AppActions = {
  updateName(app, name) {
    return { ...app, name };
  },

  updateRank(app, rank) {
    return { ...app, rank };
  },

  reset(app) {
    return initialState;
  }
};

const appState = createReducer('appState', AppActions, initialState);

export { appState, AppActions };
