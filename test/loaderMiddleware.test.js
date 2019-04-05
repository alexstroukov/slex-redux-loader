import { expect } from 'chai'
import sinon from 'sinon'
import loaderMiddleware from '../src/loaderMiddleware'
import loaderStatuses from '../src/loaderStatuses'

describe('loaderMiddleware', function () {
  const sandbox = sinon.sandbox.create()
  const doDispatch = () => {}
  const doGetState = () => {}
  const nextHandler = loaderMiddleware({ dispatch: doDispatch, getState: doGetState })
  it('should return a function to handle next', function () {
    expect(nextHandler).to.be.a('function')
  })
  describe('handle next', function () {
    const next = () => {}
    const actionHandler = nextHandler(next)
    let nextSpy
    beforeEach(function () {
      nextSpy = sandbox.spy(next)
    })
    it('should return a function to handle the action', function () {
      expect(actionHandler).to.be.a('function')
    })
    describe('when the action is a loader action', function () {
      const loaderResult = []
      const loader = (dispatch, getState) => Promise.resolve(loaderResult)
      const createAction = (loader) => ({
        load: loader
      })
      let loaderSpy
      beforeEach(function () {
        loaderSpy = sandbox.spy(loader)
      })
      it('should run the load function with dispatch and getState', function () {
        const handledAction = actionHandler(
          createAction((dispatch, getState) => {
            expect(dispatch).to.equal(doDispatch)
            expect(getState).to.equal(doGetState)
            return Promise.resolve(loaderResult)
          })
        )
        return handledAction
      })
      it('should return the load function result', function () {
        const handledAction = actionHandler(
          createAction((dispatch, getState) => {
            return Promise.resolve(loaderResult)
          })
        )
        return handledAction
          .then((result) => {
            expect(result).to.equal(loaderResult)
          })
      })
      it('should not call next', function () {
        const handledAction = actionHandler(
          createAction((dispatch, getState) => {
            expect(dispatch).to.equal(doDispatch)
            expect(getState).to.equal(doGetState)
            return Promise.resolve(loaderResult)
          })
        )
        return handledAction
          .then((result) => {
            expect(nextSpy.callCount).to.equal(0)
          })
      })
    })
  })
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
})
