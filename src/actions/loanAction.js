import { NEW_LOAN, 
         CREATING_LOAN,
         LOAN_CREATED, 
         ERROR_CREATING_LOAN,
         GETTING_LOANS,
         ERROR_GETTING_LOANS, 
         GOT_LOANS,
         CURRENT_LOAN,
         UPDATING_LOAN,
         LOAN_UPDATED,
         ERROR_UPDATING_LOAN,
         DELETING_LOAN,
         LOAN_DELETED,
         ERROR_DELETING_LOAN,
         GETTING_LAST_LOAN,
         GOT_LAST_LOAN,
         ERROR_LAST_LOAN,
         GETTING_TOTAL_LOANS,
         GOT_TOTAL_LOANS,
         ERROR_TOTAL_LOANS,
         CURRENT_LOAN_PAGE,
         CLEAN_LOAN_MESSAGES }        from '../types'
import axiosClient                  from '../config/axios'         
import clientAxios                  from '../config/axios'


export const cleanMessages = () => ({
    type: CLEAN_LOAN_MESSAGES
})

export const newLoan = () => ({
    type: NEW_LOAN
})         

export const createLoan = loan => {
    return async (dispatch) => {
        dispatch( creatingLoan() )

        try {
            const response = await axiosClient.post('/api/loans', loan)

            dispatch( loanCreated(response.data.msg) )
        } catch (error) {
            console.log(error.response)
            dispatch( errorCreatingLoan(error.response.data.msg))
        }
    }    
}

const creatingLoan = () => ({
    type: CREATING_LOAN
})

const loanCreated = message => ({
    type: LOAN_CREATED,
    payload: message
})

const errorCreatingLoan = errorMessage => ({
    type: ERROR_CREATING_LOAN,
    payload: errorMessage
})

export const getListOfLoans = params => {
    return async (dispatch) => {
        dispatch( gettingLoans() )
        try {
            /* Obtenemos la lista de películas - En la variable params incluímos:
                * Filtros
                * Limit: registros por página
                * Skip: el offset para seleccionar la página
            */
            const response = await clientAxios.get('/api/loans', { params })

            //const response = await axiosClient.get('/api/loans/all')
            dispatch( gotLoans(response.data.loans) )
        } catch (error) {
            console.log(error.response)
            dispatch( errorGettingLoans(error.response.data.msg) )
        }
    }
}

/*export const getLoansByMovie = movieId => {
    return async (dispatch) => {
        dispatch( gettingLoans() )

        try {
            const response = await axiosClient.get('/api/loans', { params: { movieId }})
            dispatch( gotLoans(response.data.loans) )
        } catch (error) {
            console.log(error.response)
            dispatch( errorGettingLoans(error.response.data.msg) )
        }
    }
}*/

const gettingLoans = () => ({
    type: GETTING_LOANS
})

const gotLoans = loans => ({
    type: GOT_LOANS,
    payload: loans
})

const errorGettingLoans = errorMessage => ({
    type: ERROR_GETTING_LOANS,
    payload: errorMessage
})

export const getCurrentLoan = currentLoan => ({
    type: CURRENT_LOAN,
    payload: currentLoan
})

export const updateLoan = loan => {
    return async (dispatch) => {
        dispatch( updatingLoan() )

        try {
            const response = await clientAxios.put(`/api/loans/${loan._id}`, loan)
            dispatch( loanUpdated(response.data.loan))
        } catch (error) {
            console.log(error.response)
            dispatch( errorUpdatingLoan(error.response.data.msg))
        }
    }
}

const updatingLoan = () => ({
    type: UPDATING_LOAN
})

const loanUpdated = loanUpdated => ({
    type: LOAN_UPDATED,
    payload: loanUpdated
})

const errorUpdatingLoan = errorMessage => ({
    type: ERROR_UPDATING_LOAN,
    payload: errorMessage
})

export const deleteLoan = loanId => {
    return async(dispatch) => {
        dispatch ( deletingLoan() )

        try {
            const message = await clientAxios.delete(`/api/loans/${loanId}`)
            dispatch( loanDeleted(loanId, message.data.msg))
        } catch (error) {
            dispatch( errorDeletingLoan(error.response.data.msg) )
            console.log(error.response)
        }
    }
}

const deletingLoan = () => ({
    type: DELETING_LOAN
})

const loanDeleted = (loanId, message) => ({
    type: LOAN_DELETED,
    payload: { loanId, message }
})

const errorDeletingLoan = errorMessage => ({
    type: ERROR_DELETING_LOAN,
    payload: errorMessage
})

export const getLastLoan = movieId => {
    return async (dispatch) => {
        dispatch( gettingLastLoan() )
        try {
            
            const response = await clientAxios.get('/api/loans/last', { params: { movieId }})
            dispatch( gotLastLoan(response.data.loan) )
        } catch (error) {
            dispatch( errorGettingLastLoan(error.response.data.msg) )
            console.log(error.response)
        }
    }
}

const gettingLastLoan = () => ({
    type: GETTING_LAST_LOAN
})

const gotLastLoan = lastLoan => ({
    type: GOT_LAST_LOAN,
    payload: lastLoan
})

const errorGettingLastLoan = errorMessage => ({
    type: ERROR_LAST_LOAN,
    payload: errorMessage
})

export const countLoans = filters => {
    return async(dispatch) => {

        dispatch( gettingTotalLoans() )
        try {
            const response = await clientAxios.get('/api/loans/count', {params: filters})
            const total = response.data.count
            
            dispatch( gotTotalLoans(total))
        } catch (error) {
            console.log(error.response.data.msg)           
            dispatch( errorGettingTotalLoans(error.response.data.msg))
        }
    }
}

const gettingTotalLoans = () => ({
    type: GETTING_TOTAL_LOANS
})

const gotTotalLoans = total => ({
    type: GOT_TOTAL_LOANS,
    payload: total
})

const errorGettingTotalLoans = errorMessage => ({
    type: ERROR_TOTAL_LOANS,
    payload: errorMessage
})

export const setCurrentLoanPage = currentPage => ({
    type: CURRENT_LOAN_PAGE,
    payload: currentPage
})