// Importamos todos los types
import { SHOW_ALERT, HIDE_ALERT }   from '../types/index'

// Muestra una alerta
export const showAlert = alert => {
    return (dispatch) => {
        dispatch( showAlertAction(alert) )
    }
} 

const showAlertAction = alert => ({
    type: SHOW_ALERT,
    payload: alert
})

// Oculta la alerta
export const hideAlert = () => {
    return(dispatch) => {
        dispatch( hideAlertAction() )
    }
}

const hideAlertAction = () => ({
    type: HIDE_ALERT
})