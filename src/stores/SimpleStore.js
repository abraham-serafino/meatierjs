import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

function flatten(ary) {
  return ary.reduce(
      (obj, item) => ({ ...obj, ...item }),
      {}
  );
}

function createActions(actions) {
  const actionCreators = {};

  for (const actionName of
      Object.getOwnPropertyNames(Object.getPrototypeOf(actions))
  ) {
    if (typeof actions[actionName] === 'function') {
      actionCreators[actionName] = (payload) =>
          ({type: actionName, payload});
    }
  }

  return actionCreators;
}

function createContainer(component, ...models) {
  return connect(
      (state) => state,
      flatten(models.map((model) => createActions(model)))
  )(
      component
  );
}

function createReducer(model) {
  const { name, initialState } = model;

  return {
    [name](state = initialState, action = {}) {
      const {type = '', payload} = action;

      const methods = flatten(
          Object.getOwnPropertyNames(Object.getPrototypeOf(model))
          .map((key) =>
              typeof model[key] === 'function' ?
                  { [key]: model[key] } :
                  null
          )
        );

      if (type.startsWith('@@redux')) {
        return state;
      }

      if (methods[type]) {
        return methods[type](state, payload);
      }

      return state;
    }
  }
}

function createSimpleStore(...reducers) {
  const newReducers = flatten(
      reducers.map((reducer) => createReducer(reducer))
  );
  return createStore(combineReducers(newReducers));
}

export { createActions, createContainer, createReducer, createSimpleStore };
