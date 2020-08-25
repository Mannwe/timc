import React, { useEffect, useState }                   from 'react'
import { useHistory }                                   from 'react-router-dom'

import './Loan.css'

// Redux
import { useDispatch, useSelector }                     from 'react-redux'
import { newLoan, cleanMessages, deleteLoan }           from '../../actions/loanAction'
import { showAlert, hideAlert }                         from '../../actions/alertAction'

// Custom
import Loan                                             from './Loan'
import Alert                                            from '../alert/Alert'
import ConfirmDelete                                    from '../modal/ConfirmDelete'
import ModalOverlay                                     from '../modal/ModalOverlay'

const ListOfLoans = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const [ confirm, setConfirm ] = useState(false)
    const [ currentLoan, setCurrentLoan ] = useState(null)
    const dispatch = useDispatch()

    const loans = useSelector(state => state.loanData.listOfLoans)
    const alert = useSelector(state => state.alert.alertMessage)
    const error = useSelector(state => state.loanData.error)
    const message = useSelector(state => state.loanData.message)
    const currentMovie = useSelector(state => state.movieData.currentMovie)

    const history = useHistory()

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
            dispatch( cleanMessages() )    
            dispatch( hideAlert() )
        }, 2500)
    }, [message, error, dispatch])

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleNewLoan = () => {
        dispatch( newLoan() )
        history.push('/new-loan')
    }

    const deleteLoanClient = id => {
        setCurrentLoan(id)
        setConfirm(true)         
    }

    const closeModal = () => {
        setConfirm(false)
    }

    const confirmDelete = () => {
        setConfirm(false)
        dispatch( deleteLoan(currentLoan) )
    }

    const handleBack = () => {
        history.push('edit-movie')      
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <>
            <h1 className='loans-header'>Lista de Préstamos</h1>            
            <ConfirmDelete      
                show={confirm}
                closeModal={closeModal}
                confirmDelete={confirmDelete}
            />
            <div className="card loans-card">
                {alert
                ?
                    <Alert 
                        alert={alert}
                        width='100%'
                    />
                : null}
                <button
                    type='button'
                    className='btn btn-ok btn-block btn-new-loan btn-top'
                    onClick={handleNewLoan}
                >
                    Nuevo Préstamo
                </button>                
                <table className='loans-table'>
                    <thead>
                        <tr>
                            <th className='loans-table-cell'>Película</th>
                            <th className='loans-table-cell'>F. Préstamo</th>
                            <th className='loans-table-cell return-date'>F. Préstamo</th>
                            <th className='loans-table-cell return-date'>F. Devolución</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans && loans.length > 0
                        ? loans.map(loan => 
                            <Loan                            
                                key={loan._id}
                                loan={loan}
                                deleteLoanClient={deleteLoanClient}
                            />
                        )
                    : null
                    } 
                    </tbody>
                </table>
                <table className='loans-table-sm'>
                    <thead>
                        <tr>
                            <th className='loans-table-cell'>Película</th>
                            <th className='loans-table-cell loan-date'>F. Préstamo</th>
                            <th className='loans-table-cell return-date'>F. Devolución</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans && loans.length > 0
                        ? loans.map(loan => 
                            <Loan                            
                                key={loan._id}
                                loan={loan}
                                deleteLoanClient={deleteLoanClient}
                            />
                        )
                    : null
                    } 
                    </tbody>
                </table>
                {currentMovie
                ?   
                <button
                    type='button'
                    className='btn btn-movie btn-secondary btn-block btn-new-loan'
                    onClick={handleBack}
                >
                    Volver
                </button>                
                : null}
            </div>
            {confirm 
            ?
                <ModalOverlay
                    className='modal-overlay'
                />
            : null}
        </>
    )
}
 
export default ListOfLoans