import { 
  GET_USER,
  LOGOUT,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../reducers/auth'
import app from '../../../app.json'
import base64 from 'react-native-base64'
// phone 

export function logout () {
  return{
    type: LOGOUT
  }
}

export function login (user, password, callBack) {
  return (dispatch) => {
    dispatch({
      type: LOGIN
    })
    fetch(app.server + "/user", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Basic "+ base64.encode(user + ":" + password),
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if ( responseJson["message"] === "Bad credentials"){
        dispatch({
          type: LOGIN_FAIL,
          error: responseJson["message"]
        })
      } else {
        dispatch({
          type: GET_USER,
          user: {...responseJson, user, password}
        })
        dispatch({
          type: LOGIN_SUCCESS
        })
        if(callBack){
          callBack("/home")
        }
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: LOGIN_FAIL
      })
    });
  }
}


