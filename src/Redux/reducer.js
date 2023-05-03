import actions from './actions'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  socketId: null,
  alert: null,
  matiere: '',
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
    case actions.addCours:
      return { ...state, user: action.user }
    case actions.updateCours:
      return { ...state, user: action.user }
    case actions.deleteCours:
      return { ...state, user: action.user }
    case actions.alert: {
      return { ...state, alert: action.alert }
    }
    case actions.search_cours:
      return { ...state, matiere: action.matiere }
    default:
      return state
  }
}

export default reducer
