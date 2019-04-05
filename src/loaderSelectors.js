import loaderStatuses from './loaderStatuses'

class LoaderSelectors {
  createGetIsInitial = storeName => state => !(state && state[storeName] && state[storeName].status)
  createGetIsLoading = storeName => state => !!state && !!state[storeName] && state[storeName].status === loaderStatuses.PENDING
}

export default new LoaderSelectors()