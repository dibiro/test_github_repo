import { 
    GET_REPOS,
    GET_COMMINTS,
    SET_REPO
} from '../reducers/repo'
import app from '../../../app.json'
import { store } from '../store'
import base64 from 'react-native-base64'

// phone 

export function set_repo (repo) {
  return{
    type: SET_REPO,
    repo
  }
}

export function get_repos (searchText) {
  const storeNow = store.getState()
  const userFull = storeNow.auth.user
  const { user, password } = userFull
  return (dispatch) => {
    fetch(app.server + "search/repositories?q="+searchText, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Basic "+ base64.encode(user + ":" + password),
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: GET_REPOS,
        repos: responseJson.items
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

export function get_commints (repo) {
  const storeNow = store.getState()
  const userFull = storeNow.auth.user
  const { user, password } = userFull
  return (dispatch) => {
    dispatch({
      type: GET_COMMINTS,
      comments: []
    })
    fetch(repo.commits_url.split("/commits")[0]+"/commits", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Basic "+ base64.encode(user + ":" + password),
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      dispatch({
        type: GET_COMMINTS,
        comments: responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
