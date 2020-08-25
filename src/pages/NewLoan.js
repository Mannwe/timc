import React, { useState, useEffect }   from 'react'
import { useHistory }                   from 'react-router-dom'

// Custom
import FormHeader                       from '../components/form-header/FormHeader'
import Alert                            from '../components/alert/Alert'

// Redux
import { useSelector, useDispatch }     from 'react-redux'
import { showAlert, hideAlert }         from '../actions/alertAction'
import { createLoan }                   from '../actions/loanAction'
import { getListOfMovies }              from '../actions/movieAction'

const NewLoan = () => {

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

    const dispatch = useDispatch()
    const alert = useSelector(state => state.alert.alertMessage)
    const message = useSelector(state => state.loanData.message)
    const transactionDone = useSelector(state => state.loanData.transactionDone)
    const listOfMovies = useSelector(state => state.movieData.listOfMovies)

    const history = useHistory()

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/

    /* Si por algún motivo no están carcagas las películas, las cargamos aquí */
    useEffect(() => {
        dispatch( getListOfMovies() )
    }, [dispatch])

    useEffect(() => {
        if(!message){
            if(alert) dispatch( hideAlert() )
            return
        }

        const alertLocal = {
            message,
            type: 'error'
        }
        dispatch( showAlert(alertLocal) )
        return
    }, [message, alert, dispatch])

    /* Hasta que no nos aseguremos que se ha guardado correctamente
       el registro, no limpiamos */
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

    const handleCancel = () => {
        clear()
        history.push('/loans')
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Validaciones
        if(movieTitle.trim() === '' || movieTitle.trim() === '--Selecciona una película--'){
            const alertLocal = {
                message: 'El título de la película no puede estar en blanco',
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

        // Hacemos el submit
        dispatch( createLoan(loan) )       
        
    }

    return (
        <div className="form-container">
            <div className="card form-card">
                <FormHeader
                    title='Nuevo Préstamo'
                />
                <div className="form-wrapper">
                    <form
                        className='w-100'
                        onSubmit={handleSubmit}
                    >
                        {alert && alert.type === 'error'
                        ?
                            <Alert alert={alert} />
                        : null}
                        <div className="form-line">
                            <label className='form-label w-50' htmlFor="movieTitle">Película:</label>
                        </div>
                        <div className="form-line">
                            <select
                                name='movieTitle'
                                id='movieTitle'
                                className='form-field w-100'
                                value={movieTitle}
                                onChange={handleOnChange}
                            >
                                <option> --Selecciona una película-- </option>
                                {!listOfMovies || listOfMovies.length === 0 
                                ? null
                                : 
                                    listOfMovies.map(movie => 
                                        <option
                                            key={movie._id}
                                        >
                                            {movie.title}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-line">
                            <label className='form-label w-50' htmlFor="lentTo">Prestar a:</label>                        
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
                        <div className='loan-dates'>
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
                        </div>
                        <div className='loan-dates-sm'>
                            <div className="form-line">
                                <label className='form-label w-100' htmlFor="loanDate">Fecha Préstamo:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='date'
                                    name='loanDate'
                                    id='loanDate'
                                    className='form-field w-100'
                                    value={loanDate}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="form-line">
                                <label className='form-label w-100' htmlFor="loanDate">Fecha Devolución:</label>
                            </div>
                            <div className="form-line">
                                <input
                                    type='date'
                                    name='returnDate'
                                    id='returnDate'
                                    className='form-field w-100'
                                    value={returnDate}
                                    onChange={handleOnChange}
                                />
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
 
export default NewLoan