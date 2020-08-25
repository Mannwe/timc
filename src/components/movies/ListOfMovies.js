import React, { useEffect }             from 'react'
import { useHistory}                    from 'react-router-dom'

import './Movies.css'
import '../modal/Modal.css'

// Redux
import { useDispatch, useSelector }     from 'react-redux'
import { cleanMessages }                from '../../actions/movieAction'
import { showAlert, hideAlert }         from '../../actions/alertAction'

// Custom
import Movie                            from './Movie'
import Alert                            from '../alert/Alert'

const ListOfMovies = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/

    // Habilitamos history para la redirección
    const history = useHistory()

    // Obtenemos los states de redux
    const movies = useSelector(state => state.movieData.listOfMovies)
    const message = useSelector(state => state.movieData.message)
    const error = useSelector(state => state.movieData.error)
    const alert = useSelector(state => state.alert.alertMessage)
    
    const dispatch = useDispatch()

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Detectamos mensajes de error para lanzar una alerta
    useEffect(() => {
        if(!message) return

        let alertLocal = null
        if(error){
            alertLocal = {
                message,
                type: 'error'
            }
        }else{
            alertLocal = {
                message,
                type: 'success'
            }
        }
        dispatch( showAlert(alertLocal) )
        
        setTimeout(() => {
            dispatch( hideAlert() )
            dispatch( cleanMessages() )            
        }, 2500)
    }, [message, error, dispatch])

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleNewMovie = () => {
        //dispatch( newMovie() )
        history.push('/new-movie')
    }
    
    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <div className='card movies-card'>
            {alert
            ? <Alert 
                alert={alert}
                width='100%'
              />  
            : null}
            <button
                type='button'
                className='btn btn-ok btn-block btn-top btn-new-movie'
                onClick={handleNewMovie}
            >
                Nueva película
            </button>            
            <ul>
                {!movies || movies.length === 0 
                ?   <p className='info'>No hay películas. Utilice los filtros para buscarlas</p>
                :
                    movies.map(movie => 
                        <Movie
                            key={movie._id}
                            movie={movie}
                            readonly={false}
                        />
                    )
                }
            </ul>                        
        </div>
    )
}
 
export default ListOfMovies
