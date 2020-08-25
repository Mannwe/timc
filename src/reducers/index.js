import { combineReducers }      from 'redux'
import alertReducer             from './alertReducer'
import userReducer              from './userReducer'
import movieReducer             from './movieReducer'
import loanReducer              from './loanReducer'

// En combineReducers agregamos todos los reducers para combinarlos y exportalos combinados al store
export default combineReducers({
    alert: alertReducer,
    userData: userReducer,
    movieData: movieReducer,
    loanData: loanReducer
})
