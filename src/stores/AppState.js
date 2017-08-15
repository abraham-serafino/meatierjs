const AppState = {
  name: 'appState',
  initialState: { name: '', rank: '' },

  updateName(appState, name) {
    return { ...appState, name };
  },

  updateRank(appState, rank) {
    return { ...appState, rank };
  },

  reset() {
    return this.initialState;
  }
};

export default AppState;
