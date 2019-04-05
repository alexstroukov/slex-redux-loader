import loaderStatuses from './loaderStatuses'

const loadData = ({ load, action, dispatch, getState }) => {
  dispatch({ ...action, status: loaderStatuses.PENDING })
  return load(dispatch, getState)
    .then(result => {
      const successAction = { ...action, result, status: loaderStatuses.SUCCESS }
      dispatch(successAction)
      return Promise.resolve(result)
    })
    .catch(error => {
      dispatch({ ...action, error, status: loaderStatuses.FAIL })
      return Promise.reject(error)
    })
}
const loaderMiddleware = ({ dispatch, getState }) => {
  return next => (action) => {
    const { load, ...rest } = action
    if (load) {
      return loadData({ load, action: rest, dispatch, getState })
    }
    next(action)
  }
}

export default loaderMiddleware