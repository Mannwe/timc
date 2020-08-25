import React, { useState, useEffect }   from 'react'
import { Link, useHistory }             from 'react-router-dom'

// Redux
import { useDispatch, useSelector }     from 'react-redux'
import { showAlert, hideAlert }         from '../actions/alertAction'
import { login, setError }              from '../actions/userAction'

// Custom
import Alert                            from '../components/alert/Alert'
import '../assets/css/responsive.css'

const Login = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    // Estados locales para el formulario
    const [ fields, setFields ] = useState({
        email: '',
        password: ''
    })
    const { email, password } = fields

    // Dispatch para ejecutar las acciones
    const dispatch = useDispatch()

    const history = useHistory()

    // Obtenemos los states a partir del selector
    const alert = useSelector(state => state.alert.alertMessage)
    const message = useSelector(state => state.userData.message)
    const authenticated = useSelector(state => state.userData.authenticated)

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Detectamos los cambios en message para lanzar la alerta de error
    useEffect(() => {
        if(!message) return

        const alert = {
            message,
            type: 'error'
        }
        dispatch( showAlert(alert) )
    }, [message, dispatch])

    // Detectamos cuando un usuario ha sido autenticado para iniciar sesión
    useEffect(() => {
        if(!authenticated) return

        history.push('/main')
    }, [authenticated, history])

    // Guardamos los valores del formulario en el state
    const handleOnChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleSubmit = e => {
        e.preventDefault()
        
        // Validaciones
        if(email.trim() === '' || password.trim() === ''){
            const alert = {
                message: 'Todos los campos son obligatorios',
                type: 'error'
            }
            dispatch( showAlert(alert) )
            dispatch( setError(true) ) // Para registrar el error en el state del redux
            return
        }

        // Si todo es ok, reiniciamos el state del formulario y las alertas
        if(alert) dispatch( hideAlert() )

        // Iniciamos sesión
        dispatch( login({ email, password }) )
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <div className='card'>
            <header className='card-header'>
                <h1>Inicio de Sesión</h1>
            </header>
            <form 
                className='card-body'
                onSubmit={handleSubmit}
            >   
                {alert
                ?
                    <Alert alert={alert} />
                : null}
                {/* Email */}
                <div className="form-group">
                    <div className="input-icon">
                        <i className="fa fa-at"></i>
                    </div>
                    <input
                        className='login-field'
                        type='email'
                        name='email'
                        placeholder='Introduce una dirección de correo'
                        value={email}
                        onChange={handleOnChange}
                    />
                </div>
                {/* Contraseña */}
                <div className="form-group">
                    <div className='input-icon'>
                        <i className="fa fa-lock"></i>
                    </div>
                    <input
                        className='login-field'
                        type='password'
                        name='password'
                        placeholder='Introduce una contraseña'
                        value={password}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <button
                        type='submit'
                        className='btn btn-ok btn-block'
                    >
                        Iniciar Sesión
                    </button>
                </div>
                <div className="form-group">
                    <Link
                        className='login-new-user'
                        to='/new-account'
                    >
                        Si no tienes cuenta, regístrate
                    </Link>
                </div>
            </form>
        </div>
    )
}
 
export default Login