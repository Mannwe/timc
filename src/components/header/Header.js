import React, { useEffect }                            from 'react'
import { useHistory }                   from 'react-router-dom'

import './Header.css'

// Redux
import { useSelector, useDispatch }     from 'react-redux'
import { retrieveLoggedUser, logout }   from '../../actions/userAction'

const Header = () => {

    // Obtenemos los states de redux
    const user = useSelector(state => state.userData.user)
    const authenticated = useSelector(state => state.userData.authenticated)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if(authenticated) return
        
        const token = localStorage.getItem('timcToken')
        dispatch( retrieveLoggedUser(token) )
    }, [authenticated, dispatch])

    if(!user) return null

    const { name } = user

    const handleClose = () => {
        dispatch( logout() )
        history.push('/')
    }

    return (
        <header className="header">
            <div className='header-left'>
                <div className='header-logo'>
                    <img className='logo-small' src="https://img.icons8.com/officel/25/000000/documentary.png" alt='Logo pequeño' />
                    <img className='logo-medium' src="https://img.icons8.com/officel/50/000000/documentary.png" alt='Logo mediano' />
                    <span className='header-brand'>timC</span>
                </div>
                {user ? <h1 className='header-title'>Hola, {name}</h1> : null}
            </div>
            <span
                className='header-session'
                onClick={handleClose}
            >
                Cerrar Sesión
            </span>
        </header>
    )
}
 
export default Header