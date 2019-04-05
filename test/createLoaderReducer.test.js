import { expect } from 'chai'
import sinon from 'sinon'
import createLoaderReducer from '../src/createLoaderReducer'

describe('createLoaderReducer', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('when used without supporting reducers', function () {
    const reducer = createLoaderReducer()
    describe('given a PENDING loader action', function () {
      let action
      let state
      beforeEach(function () {
        action = {
          type: 'LOAD_DATA',
          status: 'PENDING'
        }
        state = {
          data: []
        }
      })
      it('should add the PENDING status to the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.status).to.equal(action.status)
      })
      it('should add the action type to the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.action).to.equal(action.type)
      })
    })
    describe('given a SUCCESS loader action', function () {
      let action
      let state
      beforeEach(function () {
        action = {
          type: 'LOAD_DATA',
          status: 'SUCCESS',
          result: []
        }
        state = {
          data: [],
          error: 'it previously failed'
        }
      })
      it('should add the SUCCESS status to the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.status).to.equal(action.status)
      })
      it('should add the action type to the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.action).to.equal(action.type)
      })
      it('should clear the error from the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.error).to.equal(undefined)
      })
    })
    describe('given a FAIL loader action', function () {
      let action
      let state
      beforeEach(function () {
        action = {
          type: 'LOAD_DATA',
          status: 'FAIL',
          error: new Error('it failed')
        }
        state = {
          data: [],
          error: 'it previously failed'
        }
      })
      it('should add the FAIL status to the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.status).to.equal(action.status)
      })
      it('should add the action type to the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.action).to.equal(action.type)
      })
      it('should add the error message to the state', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(nextState.error).to.equal(action.error.message)
      })
    })
  })
  describe('when used with supporting reducers', function () {
    const clearedData = []
    const successReducer = (state, action) => ({ ...state, data: action.result })
    const pendingReducer = (state, action) => ({ ...state, data: clearedData, error: undefined })
    const failReducer = (state, action) => ({ ...state, data: clearedData })
    let successReducerSpy
    let pendingReducerSpy
    let failReducerSpy
    beforeEach(function () {
      successReducerSpy = sandbox.spy(successReducer)
      pendingReducerSpy = sandbox.spy(pendingReducer)
      failReducerSpy = sandbox.spy(failReducer)
    })
    const reducer = createLoaderReducer(successReducer, pendingReducer, failReducer)
    describe('given a PENDING loader action', function () {
      let action
      let state
      beforeEach(function () {
        action = {
          type: 'LOAD_DATA',
          status: 'PENDING'
        }
        state = {
          data: ['stale data'],
          error: 'it previously failed'
        }
      })
      it('should assign the mapped state to the next state using the pendingReducer', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(pendingReducerSpy.calledOnce).to.not.equal(true)
        expect(nextState.data).to.equal(clearedData)
        expect(nextState.error).to.equal(undefined)
      })
    })
    describe('given a SUCCESS loader action', function () {
      let action
      let state
      beforeEach(function () {
        action = {
          type: 'LOAD_DATA',
          status: 'SUCCESS',
          result: []
        }
        state = {
          data: [],
          error: 'it previously failed'
        }
      })
      it('should assign the mapped state to the next state using the successReducer', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(successReducerSpy.calledOnce).to.not.equal(true)
        expect(nextState.data).to.equal(action.result)
      })
    })
    describe('given a FAIL loader action', function () {
      let action
      let state
      beforeEach(function () {
        action = {
          type: 'LOAD_DATA',
          status: 'FAIL',
          error: new Error('it failed')
        }
        state = {
          data: [],
          error: 'it previously failed'
        }
      })
      it('should assign the mapped state to the next state using the failReducer', function () {
        const nextState = reducer(state, action)
        expect(nextState).to.not.equal(state)
        expect(successReducerSpy.calledOnce).to.not.equal(true)
        expect(nextState.data).to.equal(clearedData)
      })
    })
  })
})
