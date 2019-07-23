import app from '../../../app.json'
export const GET_REPOS = app.name + '/auth/GET_REPOS'
export const SET_REPO = app.name + '/auth/SET_REPO'
export const GET_COMMINTS = app.name + '/auth/GET_COMMINTS'

const initialStates = {
  error: false,
  repos: [],
  comments: [],
  repo: false
}

export default function reducer (state = initialStates, action) {
  switch (action.type) {
    case GET_COMMINTS:
      return {
        ...state,
        comments: action.comments
      }
      break
    case GET_REPOS:
      return {
        ...state,
        repos: action.repos
      }
      break
    case SET_REPO:
      return {
        ...state,
        repo: action.repo
      }
      break
    default:
      return state
      break
  }
}
