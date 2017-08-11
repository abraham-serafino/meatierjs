class AppState {
  name = 'appState';

  initialState = { name: '', rank: '' };

  updateName(app, name) {
    return { ...app, name };
  }

  updateRank(app, rank) {
    return { ...app, rank };
  }

  reset(app) {
    return initialState;
  }
}

export default new AppState();
