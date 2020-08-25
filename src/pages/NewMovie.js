import React, { useState, useEffect }           from 'react'
import { useHistory }                           from 'react-router-dom'

// Redux
import { useDispatch, useSelector }             from 'react-redux'
import { showAlert, hideAlert }                 from '../actions/alertAction'
import { createMovie, setError, countMovies,
         setCurrentMoviePage, getListOfMovies } from '../actions/movieAction'

// Custom
import NewMovieHeader                           from '../components/movies/NewMovieHeader'
import Alert                                    from '../components/alert/Alert'
import NewMovieManual                           from '../components/movies/NewMovieManual'
import NewMovieTMDB                             from '../components/movies/NewMovieTMDB'

const NewMovie = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    
    // State local con los campos del formulario
    const [ selection, setSelection ] = useState('imported') // Selección de tipo de alta
    const [ header, setHeader ] = useState('Importar de')
    const [ movieCreated, setMovieCreated ] = useState(false)
    
    const dispatch = useDispatch()

    // Llamamos a los states del reducer
    const alert = useSelector(state => state.alert.alertMessage)
    const message = useSelector(state => state.movieData.message)
    const error = useSelector(state => state.movieData.error)
    const transactionDone = useSelector(state => state.movieData.transactionDone)
    const totalMovies = useSelector(state => state.movieData.totalMovies)
    const currentPage = useSelector(state => state.movieData.currentPage)

    const history = useHistory()

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Capturamos el momento en el que el se crea un message y mostrarmos alerta
    useEffect(() => {
        if(!message) {
            if(alert) dispatch( hideAlert() )
            return
        }
        if(error){
            const alertLocal = {
                message: message,
                type: 'error'
            }

            dispatch( showAlert(alertLocal) )      
            return  
        }
    }, [message, alert, error, dispatch])

    useEffect(() => {
        if(!totalMovies || totalMovies === 0) return

        // Inicializamos la paginación
        if(currentPage !== 1) dispatch( setCurrentMoviePage(1) )

        // Concatenamos los parámetros de consulta con los filtros
        dispatch( getListOfMovies({}) ) 
        
    }, [totalMovies, currentPage, dispatch])

    /* Hasta que no nos aseguremos que se ha guardado correctamente
       el registro, no salimos */
    useEffect(() => {
        if(!transactionDone || !movieCreated) return

        dispatch( countMovies({}) )
        history.push('/main')        

    }, [transactionDone, history, movieCreated, dispatch])

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Función que pasaremos como prop para ser lanzada por el componente hijo  NewMovieHeader
    const handleLink = e => {
        setSelection(e.target.name)
        
        const title = e.target.name === 'manual' ? 'Añadir Manualmente' : 'Importar de'
        setHeader(title)
    }

    const submitMovie = newMovie => {
        const { title } = newMovie
        // Validaciones
        if(title.trim() === ''){
            const messageLocal = 'El título no puede estar en blanco'

            /* Para registrar el error en el state del redux - mostraremos este
               error al capturar el cambio de message en el useEffect */
            dispatch( setError(messageLocal) ) 
            return
        }

        if(error) dispatch( setError('') )
        if(alert) dispatch( hideAlert() )

        // Submit - guardamos la nueva película
        dispatch( createMovie(newMovie) )           
        setMovieCreated(true)
    }

    const cancelNewMovie = () => {
        if(error) dispatch( setError('') )
        if(alert) dispatch( hideAlert() )

        history.push('/main')
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <div className="form-container">
            <NewMovieHeader
                selection={selection}
                handleLink={handleLink}
            />
            <div className="card form-card">
                <h1 className='form-card-header'>
                    {header}
                    {header === 'Importar de'
                    ? <span className='the-movie-db-theme'> The Movie DB</span>
                    : null}
                </h1>
                {alert 
                ? <Alert 
                    alert={alert}
                    width='90%'
                />  
                : null}
                {selection === 'manual'
                ?
                <NewMovieManual
                    submitMovie={submitMovie}
                    cancelNewMovie={cancelNewMovie}
                />
                :
                <NewMovieTMDB
                    submitMovie={submitMovie}
                    cancelNewMovie={cancelNewMovie}
                />}
            </div>
        </div>
    )
}
 
export default NewMovie