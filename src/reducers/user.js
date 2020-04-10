export const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.user
    case 'LOG_OUT':
      return {}
    case 'GET_RATINGS':
      return {...state, ratings: action.ratings}
    case 'RATE_MOVIE':
      return {...state, ratings: [...state.ratings, action.rating] }
    default:
      return state
  }
}
