import {combineReducers} from 'redux'
import auth from './auth'
import repo from './repo'
import { LOGOUT } from './auth'


const appReducer = combineReducers({
  auth,
  repo,
})


const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        window.localStorage.clear()
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer
