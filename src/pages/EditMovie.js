import React, { useState, useEffect }               from 'react'
import { useHistory }                               from 'react-router-dom'

// Custom
import Alert                                        from '../components/alert/Alert'
import FormHeader                                   from '../components/form-header/FormHeader'

// Redux
import { useSelector, useDispatch }                 from 'react-redux'
import { showAlert, hideAlert }                     from '../actions/alertAction'
import { updateMovie, setError }                    from '../actions/movieAction'
import { getLastLoan }                              from '../actions/loanAction'


const EditMovie = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    // State local con los campos del formulario
    const [ movie, setMovie ] = useState({
        title: '',
        year: 0,
        cast: '',
        director: '',
        plot: '',
        opinion: ''
    })
    // Extraemos variables del formulario
    const { title, year, cast, director, plot, opinion } = movie

    const [ loan, setLoan ] = useState({
        loanDate: '',
        lentTo: ''
    })
    // Extraemos las variables del formulario relativas al último préstamo
    const { loanDate, lentTo } = loan

    const dispatch = useDispatch()

    // Obtenemos los states de Redux
    const alert = useSelector(state => state.alert.alertMessage)
    const message = useSelector(state => state.movieData.message)
    const error = useSelector(state => state.movieData.error)
    const currentMovie = useSelector(state => state.movieData.currentMovie)
    const transactionDone = useSelector(state => state.movieData.transactionDone)
    const lastLoan = useSelector(state => state.loanData.lastLoan)

    const history = useHistory()

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Capturamos cuando se obtiene el registro actual
    useEffect(() => {

        if(!currentMovie) return

        const { _id: movieId } = currentMovie            

        setMovie(currentMovie)                
        dispatch( getLastLoan(movieId) )
    }, [currentMovie, dispatch])

    useEffect(() => {
        if(!lastLoan){
            setLoan({
                loanDate: '',
                lentTo: ''
            })    
            return
        }

        lastLoan.loanDate = !lastLoan.loanDate 
            ? ''
            : new Date(lastLoan.loanDate).toISOString().slice(0,10)

        setLoan({
            loanDate: lastLoan.loanDate,
            lentTo: lastLoan.lendTo
        })
    },[lastLoan])

    // Capturamos el momento en el que el se crea un message y mostrarmos alerta
    useEffect(() => {
        if(!message) {
            if(alert) dispatch( hideAlert() )
            return
        }

        const alertLocal = {
            message: message,
            type: 'error'
        }

        dispatch( showAlert(alertLocal) )
        return
    }, [message, alert, dispatch])

    /* Hasta que no nos aseguremos que se ha guardado correctamente
       el registro, no salimos */
    useEffect(() => {
        if(!transactionDone) return

        // Limpiamos y reseteamos
        clear()   

        // Nos vamos a la página principal
        history.push('/main')

        // Si añado clear, salta un warning por declararlo antes del effect, por eso lo quito de las dependencias
        // eslint-disable-next-line
    }, [transactionDone, history])

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleCancel = () => {
        clear()
        history.push('/main')
    }


    const handleOnChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.name === 'year' ? Number(e.target.value) : e.target.value
        })
    }

    const clear = () => {
        if(error) dispatch (setError('') )
        if(alert) dispatch( hideAlert() )
        setMovie({
            title: '',
            year: 0,
            cast: '',
            director: '',
            plot: '',
            opinion: ''
        })
    }

    const handleLoans = () => {
        clear()
        history.push('/loans')
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Validaciones
        if(title.trim() === ''){
            const messageLocal = 'El título no puede estar en blanco'

            /* Para registrar el error en el state del redux - mostraremos este
               error al capturar el cambio de message en el useEffect */
            dispatch( setError(messageLocal) ) 
            return
        }

        dispatch( updateMovie(movie) )
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <div className="form-container">
            <div className="card form-card">
                <FormHeader
                    title='Ver / Modificar los datos de la película'    
                />
                {alert 
                ? <Alert alert={alert} />  
                : null}
                <div className="form-wrapper">
                    <form
                        className='w-100'
                        onSubmit={handleSubmit}
                    >
                        <div className='edit-movie'>
                            <div className="form-line">
                                <label className='form-label w-75' htmlFor="title">Título:</label>
                                <label className='form-label w-20' htmlFor="year">Año:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    className='form-field w-75'
                                    value={title}
                                    onChange={handleOnChange}
                                />
                                <input
                                    type='number'
                                    name='year'
                                    id='year'
                                    className='form-field w-20'
                                    value={year}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label' htmlFor="year">Reparto:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    name='cast'
                                    id='cast'
                                    className='form-field w-100'
                                    value={cast}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label' htmlFor="director">Director:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    name='director'
                                    id='director'
                                    className='form-field w-100'
                                    value={director}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label w-48' htmlFor="plot">Argumento:</label>
                                <label className='form-label w-48' htmlFor="opinion">Opinión:</label>
                            </div>
                            <div className="form-line">
                                <textarea
                                    name='plot'
                                    id='plot'
                                    className='form-field w-48'
                                    value={plot}
                                    rows={7}
                                    onChange={handleOnChange}
                                ></textarea>
                                <textarea
                                    name='opinion'
                                    id='opinion'
                                    className='form-field w-48'
                                    value={opinion}
                                    rows={7}
                                    onChange={handleOnChange}
                                ></textarea>
                            </div>
                            <div className="form-line">
                                <label className='form-label w-70' htmlFor="lentTo">Prestado a:</label>
                                <label className='form-label w-25' htmlFor="loanDate">Fecha del Préstamo:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    id='lentTo'
                                    className='form-field w-70'
                                    value={lentTo}
                                    readOnly
                                />
                                <div className='w-25'>
                                    <input
                                        type='date'
                                        name='loanDate'
                                        className='form-field edit-movie-loan-date'
                                        value={loanDate}
                                        readOnly
                                    />
                                    {currentMovie
                                    ?
                                    <span 
                                        title='Ver préstamos'
                                        onClick={handleLoans}
                                    >
                                        <i className="fa fa-search fa form-icon"></i>
                                    </span>
                                    : null}
                                </div>
                            </div>
                        </div>

                        <div className='edit-movie-sm'>
                            <div className="form-line">
                                <label className='form-label w-100' htmlFor="title">Título:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    className='form-field w-100'
                                    value={title}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label w-48' htmlFor="year">Año:</label>              
                            </div>
                            <div className="form-line">
                                <input
                                    type='number'
                                    name='year'
                                    id='year'
                                    className='form-field w-48'
                                    value={year}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label' htmlFor="year">Reparto:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    name='cast'
                                    id='cast'
                                    className='form-field w-100'
                                    value={cast}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label' htmlFor="director">Director:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    name='director'
                                    id='director'
                                    className='form-field w-100'
                                    value={director}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label w-100' htmlFor="plot">Argumento:</label>
                            </div>
                            <div className="form-line">
                                <textarea
                                    name='plot'
                                    id='plot'
                                    className='form-field w-100'
                                    value={plot}
                                    rows={7}
                                    onChange={handleOnChange}
                                ></textarea>
                            </div>
                            <div className="form-line">
                                <label className='form-label w-100' htmlFor="opinion">Opinión:</label>
                            </div>    
                            <div className="form-line">
                                <textarea
                                    name='opinion'
                                    id='opinion'
                                    className='form-field w-100'
                                    value={opinion}
                                    rows={7}
                                    onChange={handleOnChange}
                                ></textarea>
                            </div>
                            <div className="form-line">
                                <label className='form-label w-100' htmlFor="lentTo">Prestado a:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='text'
                                    id='lentTo'
                                    className='form-field w-100'
                                    value={lentTo}
                                    readOnly
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label w-80' htmlFor="loanDate">Fecha del Préstamo:</label>
                            </div>
                            <div className="form-line">
                                <div className='w-80'>
                                    <input
                                        type='date'
                                        name='loanDate'
                                        className='form-field edit-movie-loan-date'
                                        value={loanDate}
                                        readOnly
                                    />
                                    {currentMovie
                                    ?
                                    <span 
                                        title='Ver préstamos'
                                        onClick={handleLoans}
                                    >
                                        <i className="fa fa-search fa form-icon"></i>
                                    </span>
                                    : null}
                                </div>
                            </div>
                        </div>
                        <div className="form-line">
                            <button
                                type='submit'
                                className='btn btn-ok btn-form'
                            >
                                Guardar
                            </button>
                            <button
                                type='button'
                                className='btn btn-cancel btn-form'
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>  
            </div>
        </div>
    )
}
 
export default EditMovie