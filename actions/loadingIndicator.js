export const SET_LOADING = 'SET_LOADING';

export function setLoading(loadingIndicator) {
  return {
    type: SET_LOADING,
    loadingIndicator
  }
}