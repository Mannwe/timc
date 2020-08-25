// Importamos todos los types
import { SHOW_ALERT, HIDE_ALERT }   from '../types/index'

// States del reducer
const initialState = {
    alertMessage: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_ALERT:
            return{
                ...state,
                alertMessage: action.payload
            }
        case HIDE_ALERT:
            return{
                ...state,
                alertMessage: null
            }
        default:
            return state;
    }
}