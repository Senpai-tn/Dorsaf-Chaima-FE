import actions from './actions'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.login: {
      return { ...state, user: action.user }
    }
    case actions.logout: {
      return { ...state, user: null }
    }
    default:
      return state
  }
}

export default reducer
