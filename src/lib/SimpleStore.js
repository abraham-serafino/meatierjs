import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

function createActions(actions) {
  const actionCreators = {};
  const proto = actions.prototype;

  for (const actionName of Object.getOwnPropertyNames(proto)) {
    if (!actionName.startsWith('_') &&
        typeof proto[actionName] === 'function'
    ) {
      actionCreators[actionName] = (payload) =>
          ({ type: actionName, payload });
    }
  }

  return actionCreators;
}

function createContainer(component, ...actions) {
  return connect(
      (state) => state,
      actions.reduce(
          (obj, methods) => ({ ...obj, ...createActions(methods) }),
          {}
      )
  )(
      component
  );
}

function createReducer(model) {
  const { name } = model;
  const { initialState } = new model();

  return {
    [name](state = initialState, action = {}) {
      const {type = '', payload} = action;

      if (type.startsWith('@@redux')) {
        return state;
      }

      if (typeof model.prototype[type] === 'function') {
        return model.prototype[type].call(new model(), state, payload);
      }

      return state;
    }
  }
}

function createSimpleStore(...reducers) {
  const devTools = (
      (typeof window !== 'undefined') &&
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  ) || undefined;

  return createStore(combineReducers(
      reducers.reduce(
          (obj, reducer) => ({ ...obj, ...createReducer(reducer) }),
          {}
      )
  ), devTools);
}

export {
  createActions,
  createContainer,
  createReducer,
  createSimpleStore
};
