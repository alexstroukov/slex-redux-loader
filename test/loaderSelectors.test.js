import { expect } from 'chai'
import sinon from 'sinon'
import loaderSelectors from '../src/loaderSelectors'
import loaderStatuses from '../src/loaderStatuses'

describe('loaderSelectors', function () {
  const sandbox = sinon.sandbox.create()
  beforeEach(function () {
    sandbox.restore()
  })
  afterEach(function () {
    sandbox.restore()
  })
  describe('getIsInitial', function () {
    const getIsInitial = loaderSelectors.createGetIsInitial('test')
    describe('when the state has a status', function () {
      let state
      beforeEach(function () {
        state = {
          test: {
            status: loaderStatuses.PENDING
          }
        }
      })
      it('should return false', function () {
        expect(getIsInitial(state)).to.equal(false)
      })
    })
    describe('when the state has no status', function () {
      let state
      beforeEach(function () {
        state = {
          test: {}
        }
      })
      it('should return true', function () {
        expect(getIsInitial(state)).to.equal(true)
      })
    })
  })
  describe('getIsLoading', function () {
    const getIsLoading = loaderSelectors.createGetIsLoading('test')
    describe('when the state status is PENDING', function () {
      let state
      beforeEach(function () {
        state = {
          test: {
            status: loaderStatuses.PENDING
          }
        }
      })
      it('should return true', function () {
        expect(getIsLoading(state)).to.equal(true)
      })
    })
    describe('when the state has no status', function () {
      let state
      beforeEach(function () {
        state = {
          test: {}
        }
      })
      it('should return false', function () {
        expect(getIsLoading(state)).to.equal(false)
      })
    })
  })
})
