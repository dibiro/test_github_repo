import app from '../../../app.json'
export const GET_USER = app.name + '/auth/GET_USER'
export const LOGOUT = app.name + '/auth/LOGOUT'
export const LOGIN = app.name + '/auth/LOGIN'
export const LOGIN_SUCCESS = app.name + '/auth/LOGIN_SUCCESS'
export const LOGIN_FAIL = app.name + '/auth/LOGIN_FAIL'

const initialStates = {
  isLoading: false,
  isAuth: false,
  token: false,
  id: false,
  user: false,
  request: false,
  error: false
}

export default function reducer (state = initialStates, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true
      }
      break
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true
      }
      break
    case GET_USER:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.user
      }
      break
    case LOGIN_FAIL:
      return {
        ...state,
        user: false,
        isLoading: false,
        error: action.error
      }
      break
    case LOGOUT:
      return initialStates
      break
    default:
      return state
      break
  }
}
