import {combineReducers} from 'redux'
import auth from './auth'
import { LOGOUT } from './auth'


const appReducer = combineReducers({
  auth,
})


const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        window.localStorage.clear()
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer
