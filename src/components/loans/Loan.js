import React                            from 'react'
import { useHistory }                   from 'react-router-dom'

// Redux
import { useDispatch }                  from 'react-redux'
import { getCurrentLoan }               from '../../actions/loanAction'

const Loan = ({ loan, deleteLoanClient }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const dispatch = useDispatch()
    const { _id, movieTitle, lendTo, loanDate, returnDate } = loan

    const history  = useHistory()

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/

    const toShortDate = longDate => {

        if(!longDate) return ''

        const newDate = new Date(longDate)
        return newDate.getDate() + "/" +
               (newDate.getMonth() + 1) + "/" +
               newDate.getFullYear()
    }

    const handleEdit = () => {
        if(!loan) return

        dispatch( getCurrentLoan(loan) )
        history.push('/edit-loan')
    }

    const handleDelete = () => {
        deleteLoanClient(_id)
    }

    return (
        <>
            <tr className='loan'>
                <td className='loans-table-cell long-cell'>{movieTitle}</td>
                <td className='loans-table-cell long-cell'>{lendTo}</td>
                <td className='loans-table-cell date-cell'>{toShortDate(loanDate)}</td>
                <td className='loans-table-cell date-cell'>{toShortDate(returnDate)}</td>
                <td className='buttons-cell'>
                    <button
                        type='button'
                        className='btn btn-ok btn-table'
                        onClick={handleEdit}
                    >
                        Editar
                    </button>
                    <button
                        type='button'
                        className='btn btn-cancel btn-table'
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </td>
            </tr>
            <tr className='loan-sm'>
                <td className='loans-table-cell long-cell'>{movieTitle}</td>
                <td className='loans-table-cell date-cell loan-date'>{toShortDate(loanDate)}</td>
                <td className='loans-table-cell date-cell return-date'>{toShortDate(returnDate)}</td>
                <td className='buttons-cell'>
                    <button
                        type='button'
                        className='btn btn-ok btn-table'
                        onClick={handleEdit}
                    >
                        <i className="fa fa-edit"></i>
                    </button>
                    <button
                        type='button'
                        className='btn btn-cancel btn-table'
                        onClick={handleDelete}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}
 
export default Loan