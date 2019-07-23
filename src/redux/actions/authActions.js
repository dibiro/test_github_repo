import { 
  GET_USER,
  LOGOUT,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../reducers/auth'
import app from '../../../app.json'

// phone 

export function login (user, password, callBack) {
  return (dispatch) => {
    dispatch({
      type: LOGIN
    })
    fetch(app.server + "https://api.github.com/user", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Basic "+ btoa(user + ":" + password),
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: GET_USER,
        user: responseJson
      })
      dispatch({
        type: LOGIN_SUCCESS
      })
      if(callBack){
        callBack("/home")
      }
    })
    .catch((error) => {
      console.error(error);
    });
    dispatch({
      type: LOGIN_FAIL
    })
  }
}
