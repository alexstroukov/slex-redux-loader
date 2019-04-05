[![CircleCI](https://circleci.com/gh/alexstroukov/slex-libs.svg?style=svg)](https://circleci.com/gh/alexstroukov/slex-libs)

# Slex Redux Loader

```
$ npm install slex-redux-loader
```

`slex-redux-loader` a redux utility to simplify loading async data. The process for loading async data in redux goes through 3 stages: pending, success, fail. This package provides a redux middleware and helper functions to unify the 3 stages into 1 logical step: load

## Example Usage

### Create your store

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { loaderMiddleware, createLoaderReducer, loaderSelectors } from 'slex-redux-loader'

const actionTypes = {
  LOAD_TODOS: 'LOAD_TODOS'
}
const actions = {
  loadTodos: () => ({
    type: actionTypes.LOAD_GENRES,
    load: (dispatch, getState) => {
      return Promise.resolve([])
    }
  })
}
const reducers = {
  loadTodos: createLoaderReducer(
    (state, action) => {
      return {
        ...state,
        todos: action.result
      }
    }
  )
}
const selectors = {
  getTodos: (state) => state.todos.todos
  getIsInitial = loaderSelectors.createGetIsInitial('todos')
  getIsLoading = loaderSelectors.createGetIsLoading('todos')
}
const todos = (state, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TODOS:
      return reducers.loadTodos(state, action)
    default:
      return state
  }
}
const store = createStore(combineReducers({ todos }), undefined, applyMiddleware(loaderMiddleware))
```

### Connect to your store and load data into your components

```javascript

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class App extends PureComponent {
  componentDidMount () {
    const { loadTodos } = this.props
    loadTodos()
  }
  render () {
    const { todos, isInitial, isLoading } = this.props
    return (
      ...
    )
  }
}
const mapStateToProps = (state) => {
  const todos = selectors.getTodos(state)
  const isInitial = selectors.getIsInitial(state)
  const isLoading = selectors.getIsLoading(state)
  return {
    todos,
    isInitial,
    isLoading
  }
}
const actionCreators = {
  loadTodos: actions.loadTodos
}
export default connect(mapStateToProps, actionCreators)(App)

```
