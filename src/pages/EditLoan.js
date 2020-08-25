import React, { useState, useEffect }       from 'react'
import { useHistory, Link }                 from 'react-router-dom'

// Custom
import Alert                                from '../components/alert/Alert'
import FormHeader                           from '../components/form-header/FormHeader'

// Redux
import { useSelector, useDispatch }         from 'react-redux'
import { showAlert, hideAlert }             from '../actions/alertAction'
import { updateLoan }                       from '../actions/loanAction'

const EditLoan = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const [ loan, setLoan ] = useState({
        movieTitle: '',
        lendTo: '',
        loanDate: '',
        returnDate: ''
    })
    const { movieTitle, lendTo, loanDate, returnDate } = loan

    const history = useHistory()
    const dispatch = useDispatch()

    const alert = useSelector(state => state.alert.alertMessage)
    const message = useSelector(state => state.loanData.message)
    const transactionDone = useSelector(state => state.loanData.transactionDone)
    const currentLoan = useSelector(state => state.loanData.currentLoan)
    const currentMovie = useSelector(state => state.movieData.currentMovie)

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/

    // Capturamos cuando se obtiene el registro actual
    useEffect(() => {
        if(!currentLoan) return

        currentLoan.loanDate = !currentLoan.loanDate 
               ? ''
               : new Date(currentLoan.loanDate).toISOString().slice(0,10)

        currentLoan.returnDate = !currentLoan.returnDate
               ? ''
               : new Date(currentLoan.returnDate).toISOString().slice(0,10)

        setLoan(currentLoan)
    }, [currentLoan])

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

        clear()
        history.push('/loans')
        // Si añado clear, salta un warning por declararlo antes del effect, por eso lo quito de las dependencias
        // eslint-disable-next-line
    }, [transactionDone, history])

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const clear = () => {
        if(alert) dispatch( hideAlert() )
        setLoan({
            movieTitle: '',
            lendTo: '',
            loanDate: '',
            returnDate: ''
        })
    }

    const handleOnChange = e => {
        setLoan({
            ...loan,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Validaciones
        if(movieTitle.trim() === ''){
            const alertLocal = {
                message: 'Error al recuperar el título de la película',
                type: 'error'
            }
            dispatch( showAlert(alertLocal) )
            return
        }
        if(lendTo.trim() === ''){
            const alertLocal = {
                message: 'Debe indicarse a quién se presta la película',
                type: 'error'
            }
            dispatch( showAlert(alertLocal) )
            return
        }
        if(!loanDate || loanDate.trim() === ''){
            const alertLocal = {
                message: 'La fecha del préstamo no puede estar en blanco',
                type: 'error'
            }
            dispatch( showAlert(alertLocal) )
            return
        }
        if(returnDate && returnDate.trim() !== '' && new Date(loanDate) > new Date(returnDate)){
            const alertLocal = {
                message: 'La fecha de préstamo no puede ser posterior a la de devolución',
                type: 'error'
            }
            dispatch( showAlert(alertLocal) )
            return
        }
        
        // Guardar
        dispatch( updateLoan(loan) )
    }

    const handleCancel = () => {
        clear()
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <div className="form-container">
            <div className="card form-card">
                <FormHeader
                    title='Modificación del Préstamo'    
                />
                <div className="form-wrapper">
                    <form
                        className='w-100'
                        onSubmit={handleSubmit}
                    >
                        {alert
                        ?
                            <Alert alert={alert} />
                        : null}
                        <div className="form-line">
                            <label className='form-label w-50'>Película:</label>
                        </div>
                        <div className="form-line">
                            <input
                                type='text'
                                name='movieTitle'
                                className='form-field w-100 edit-movie-title'
                                value={movieTitle}
                                disabled
                            />
                        </div>
                        <div className="form-line">
                            <label className='form-label w-50' htmlFor="lentTo">Prestado a:</label>                        
                        </div>
                        <div className="form-line">
                            <input
                                type='text'
                                name='lendTo'
                                id='lendTo'
                                className='form-field w-100'
                                value={lendTo}
                                onChange={handleOnChange}
                            />                        
                        </div>
                        <div className="form-line">
                            <label className='form-label w-25' htmlFor="loanDate">Fecha Préstamo:</label>
                            <label className='form-label w-25' htmlFor="loanDate">Fecha Devolución:</label>
                        </div>
                        <div className="form-line">
                            <input
                                type='date'
                                name='loanDate'
                                id='loanDate'
                                className='form-field w-25'
                                value={loanDate}
                                onChange={handleOnChange}
                            />
                            <input
                                type='date'
                                name='returnDate'
                                id='returnDate'
                                className='form-field w-25'
                                value={returnDate}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-line">
                            <button
                                type='submit'
                                className='btn btn-ok btn-form'
                                onClick={handleSubmit}  
                            >
                                Guardar
                            </button>
                            <Link to={{ pathname: '/loans',
                                        state: {currentMovie} }}
                                  title='Ver préstamos' 
                                  className='btn btn-cancel btn-form'
                                  onClick={handleCancel}
                            >
                                Cancelar
                            </Link>
                        </div>                        
                    </form>
                </div>                
            </div>
        </div>
    )
}
 
export default EditLoan;