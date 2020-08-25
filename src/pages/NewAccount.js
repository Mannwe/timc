import React, { useState, useEffect }   from 'react'
import { useDispatch, useSelector }     from 'react-redux'
import { Link }                         from 'react-router-dom'

// Actions de Redux
import { showAlert, hideAlert }         from '../actions/alertAction'
import { createUser, setError }         from '../actions/userAction'

// Custom
import Alert                            from '../components/alert/Alert'

// css
import 'font-awesome/css/font-awesome.min.css'
import '../assets/css/responsive.css'

const NewAccount = ({ history }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    // Estados locales para el formulario
    const [ fields, setFields ] = useState({
        email: '',
        name: '',
        password: '',
        confirm: ''

    })
    const { email, name, password, confirm } = fields

    // Dispatch para ejecutar las acciones
    const dispatch = useDispatch()

    // Obtenemos los states a partir del selector
    const alert = useSelector(state => state.alert.alertMessage)
    const message = useSelector(state => state.userData.message)
    const authenticated = useSelector(state => state.userData.authenticated)

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Detectamos los cambios en errorMessage para lanzar la alerta de error
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

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Guardamos los valores del formulario en el state
    const handleOnChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const createNewUser = newUser => dispatch( createUser(newUser) )

    // Aceptamos cambios y enviarmos el formulario
    const handleSubmit = e => {
        e.preventDefault()

        // Validamos campos
        if(email.trim() === '' || name.trim() === '' || password.trim() === '' || confirm.trim() === ''){
            const alert = {
                message: 'Todos los campos son obligatorios',
                type: 'error' 
            }
            dispatch( showAlert(alert) )
            dispatch( setError(true) ) // Para registrar el error en el state del redux
            return
        }

        if(password.trim().length < 6){
            const alert = {
                message: 'Introduzca una contraseña con seis o más caracteres',
                type: 'error' 
            }
            dispatch( showAlert(alert) )
            dispatch( setError(true) ) // Para registrar el error en el state del redux
            return
        }

        if(password.trim() !== confirm.trim()){
            const alert = {
                message: 'Las contraseñas no coinciden',
                type: 'error' 
            }
            dispatch( showAlert(alert) )
            dispatch( setError(true) ) // Para registrar el error en el state del redux
            return
        }

        // Si todo es ok, reiniciamos el state del formulario y las alertas
        dispatch( hideAlert() )

        // Guardamos en la bbdd
        createNewUser({
            email,
            name,
            password
        })
    }

    return (
        <div className='card'>
            <header className='card-header'>
                <h1>Datos de registro</h1>
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
                {/* Nombre */}
                <div className="form-group">
                    <div className='input-icon'>
                        <i className="fa fa-user"></i>
                    </div>
                    <input
                        className='login-field'
                        type='text'
                        name='name'
                        placeholder='Introduce una nombre o alias'
                        value={name}
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
                {/* Confirmar contraseña */}
                <div className="form-group">
                    <div className='input-icon'>
                        <i className="fa fa-lock"></i>
                    </div>
                    <input
                        className='login-field'
                        type='password'
                        name='confirm'
                        placeholder='Confirma la contraseña'
                        value={confirm}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <button
                        className='btn btn-ok btn-block'
                    >
                        Registrarse
                    </button>
                </div>
                <div className="form-group">
                    <Link
                        className='login-new-user'
                        to='/'
                    >
                        Si ya tienes cuenta, inicia sesión
                    </Link>
                </div>
            </form>
        </div>
    )
}
 
export default NewAccount