import loaderStatuses from './loaderStatuses'

const createLoaderReducer = (
  reduceSuccessState = state => state,
  reducePendingState = state => state,
  reduceFailState = state => state
) => (state, action) => {
  switch (action.status) {
    case loaderStatuses.PENDING:
      return {
        ...(reducePendingState(state, action)),
        status: loaderStatuses.PENDING,
        action: action.type
      }
    case loaderStatuses.SUCCESS:
      return {
        ...(reduceSuccessState(state, action)),
        status: loaderStatuses.SUCCESS,
        action: action.type,
        error: undefined
      }
    case loaderStatuses.FAIL:
      return {
        ...(reduceFailState(state, action)),
        status: loaderStatuses.FAIL,
        action: action.type,
        error: action.error.message
      }
    default:
      return state
  }
}

export default createLoaderReducer
