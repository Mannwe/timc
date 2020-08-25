// Importamos todos los types
import { CREATING_USER,
         USER_CREATED,
         ERROR_CREATING_USER,
         BEGINNING_LOGIN,
         USER_LOGGED,
         LOGIN_ERROR,
         RETRIEVE_USER_LOGGED,
         SET_ERROR_USER,
         LOGOUT }           from '../types'

import clientAxios                  from '../config/axios'
import authToken                    from '../config/token'

// Creamos un nuevo usuario
export const createUser = user => {
    return async (dispatch) => {
        dispatch( beginCreatingUser() )

        try {
            const response = await clientAxios.post('/api/users', user)
            
            const token = response.data.token
            if(token){
                authToken(token) // Guardamos el token en la cabecera del cliente axios
                dispatch( userCreated( token ) )
                dispatch( retrieveLoggedUser(token) )
            }else{
                dispatch( errorLoggingUser({ msg: 'No se ha podido autenticar el usuario actual '}) )    
            }
        } catch (error) {
            console.log(error.response.data)
            dispatch( errorCreatingUser(error.response.data.msg) )
        }
    }    
}

const beginCreatingUser = () => ({
    type: CREATING_USER
})

const userCreated = user => ({
    type: USER_CREATED,
    payload: user  
})

const errorCreatingUser = errorMessage => ({
    type: ERROR_CREATING_USER,
    payload: errorMessage
})

// Iniciamos sesión
export const login = user => {
    return async (dispatch) => {
        dispatch( beginningLogin() )            
        try {
            const response = await clientAxios.post('/api/auth', user)
            
            const token = response.data.token
            if(token){
                authToken(token) // Guardamos el token en la cabecera del cliente axios
                dispatch( retrieveLoggedUser(token) )
            }else{
                dispatch( errorLoggingUser({ msg: 'No se ha podido autenticar el usuario actual '}) )    
            }
        } catch (error) {
            dispatch( errorLoggingUser(error.response.data.msg) )
        }
    }
}

const beginningLogin = () => ({
    type: BEGINNING_LOGIN
})

const userLogged = user => ({
    type: USER_LOGGED,
    payload: user
})

const errorLoggingUser = errorMessage => ({
    type: LOGIN_ERROR,
    payload: errorMessage
})

// Obtenemos el usuario que ha iniciado la sesión
export const retrieveLoggedUser = token => {
    return async(dispatch) => {
        try {
            const response = await clientAxios.get('/api/auth')
            dispatch( userLogged(token) )
            dispatch( retrieveLoggedUserAction(response.data) )            
        } catch (error) {
            console.log(error.response)
            dispatch( errorLoggingUser(error.response.data.msg) )
        }
    }    
}

const retrieveLoggedUserAction = user => ({
    type: RETRIEVE_USER_LOGGED,
    payload: user
})

// Errores para los casos en los que se producen en el cliente
export const setError = isError => ({
    type: SET_ERROR_USER,
    payload: isError
})

export const logout = () => ({
    type: LOGOUT
})
