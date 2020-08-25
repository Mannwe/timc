// Importamos todos los types
import { CREATING_USER,
         USER_CREATED,
         ERROR_CREATING_USER,
         BEGINNING_LOGIN,
         USER_LOGGED,
         LOGIN_ERROR,
         RETRIEVE_USER_LOGGED,
         SET_ERROR_USER,
         LOGOUT }          from '../types'

// States del reducer
const initialState = {
    user: null,
    loading: false,
    message: null,
    error: false,
    authenticated: false
}

export default (state = initialState, action) => {
    switch (action.type){
        case CREATING_USER:
            return{
                ...state,
                user: null,
                message: null,
                loading: true,
                error: false,
                authenticated: false
            }
        case USER_CREATED:   
        case USER_LOGGED:     
            localStorage.setItem('timcToken', action.payload)
            return{
                ...state,
                loading: false,
                message: null,
                error: false,
                authenticated: true
            }
        case ERROR_CREATING_USER:
        case LOGIN_ERROR:
            return{
                ...state,
                user: null,
                loading: false,
                message: action.payload,
                error: true,
                authenticated: false
            }
        case BEGINNING_LOGIN:
            return{
                ...state,
                message: null,
                loading: true,
                error: false,
                authenticated: false
            }
        case RETRIEVE_USER_LOGGED:
            return{
                ...state,
                user: action.payload
            }
        case SET_ERROR_USER:
            return{
                ...state,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('timcToken')
            return{
                ...state,
                authenticated: false
            }
        default:
            return state
    }
}