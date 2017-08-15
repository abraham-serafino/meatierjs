import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

function createActions(actions) {
  const actionCreators = {};

  for (const actionName of Object.keys(actions)) {
    if (typeof actions[actionName] === 'function') {
      actionCreators[actionName] = (payload) =>
          ({ type: actionName, payload });
    }
  }

  return actionCreators;
}

function createContainer(component, ...actions) {
  return connect(
      (state) => {
        console.log(state);
        return state;
      },
      actions.reduce(
          (obj, methods) => ({ ...obj, ...createActions(methods) }),
          {}
      )
  )(
      component
  );
}

function createReducer(methods) {
  const { name, initialState } = methods;

  return {
    [name](state = initialState, action = {}) {
      const {type = '', payload} = action;

      if (type.startsWith('@@redux')) {
        return state;
      }

      if (typeof methods[type] === 'function') {
        return methods[type](state, payload);
      }

      return state;
    }
  }
}

function createSimpleStore(...reducers) {
  return createStore(combineReducers(
      reducers.reduce(
          (obj, reducer) => ({ ...obj, ...reducer }),
          {}
      )
  ));
}

export {
  createActions,
  createContainer,
  createReducer,
  createSimpleStore
};
