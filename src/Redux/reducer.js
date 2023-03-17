import actions from './actions'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  socketId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.login: {
      return { ...state, user: action.user }
    }
    case actions.logout: {
      return { ...state, user: null }
    }
    case actions.getSocketId:
      return { ...state, socketId: action.socketId }
    default:
      return state
  }
}

export default reducer
