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
         CLEAN_LOAN_MESSAGES }      from '../types'

const initialState = {
    listOfLoans: null,
    error: false,
    message: null,
    loading: false,
    transactionDone: false,
    currentLoan: null,
    lastLoan: null,
    totalLoans: null,
    currentPage: 1
}   

export default (state = initialState, action) => {
    switch(action.type){
        case NEW_LOAN:
            return{
                ...state,
                error: false,
                message: null,
                transactionDone: false
            }
        case CREATING_LOAN:
            return{
                ...state,
                loading: true,
                error: false,
                message: null,
                transactionDone: false
            }
        case LOAN_CREATED:
            return{
                ...state,
                loading: false,
                error: false,
                message: action.payload,
                transactionDone: true
            }
        case ERROR_CREATING_LOAN:
            return{
                ...state,
                loading: false,
                error: true,
                message: action.payload,
                transactionDone: false
            }
        case GETTING_LOANS:
            return{
                ...state,
                loading: false,
                error: false,
                listOfLoans: null,
                currentLoan: null,
                transactionDone: false
            }
        case GOT_LOANS:
            return{
                ...state,
                loading: false,
                error: false,
                listOfLoans: action.payload,
                transactionDone: false
            }
        case ERROR_GETTING_LOANS:
            return{
                ...state,
                loading: false,
                error: true,
                listOfLoans: null,
                message: action.payload,
                transactionDone: false,
                currentPage: 1
            }
        case CURRENT_LOAN:
            return{
                ...state,
                loading: true,
                error: false,
                currentLoan: action.payload,
                message: null
            }
        case UPDATING_LOAN:
        case DELETING_LOAN:
            return{
                ...state,
                loading: true,
                message: null,
                error: false
            }
        case LOAN_UPDATED:
            return{
                ...state,
                loading: false,
                message: 'Registro modificado',
                currentLoan: null,
                listOfLoans: state.listOfLoans.map(loan => loan._id === action.payload._id ? action.payload : loan ),
                error: false,
                transactionDone: true
            }
        case ERROR_UPDATING_LOAN:
        case ERROR_DELETING_LOAN:
            return{
                ...state,
                loading: false,
                message: action.payload,
                currentLoan: null,
                error: true,
                transactionDone: false
            }
        case LOAN_DELETED:
            return{
                ...state,
                loading: false,
                message: action.payload.message,
                listOfLoans: state.listOfLoans.filter(loan => loan._id !== action.payload.loanId),
                error: false,
                transactionDone: true
            }    
        case GETTING_LAST_LOAN:
            return{
                ...state,
                lastLoan: null,
                loading: true,
                error: false,
                message: null
            }
        case GOT_LAST_LOAN:
            return{
                ...state,
                lastLoan: action.payload,
                loading: false,
                error: false,
                message: null
            }
        case ERROR_LAST_LOAN:
            return{
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case GETTING_TOTAL_LOANS:
            return{
                ...state,
                loading: false,
                error: false,
                transactionDone: true
            }    
        case GOT_TOTAL_LOANS:
            return{
                ...state,
                loading: false,
                totalLoans: action.payload,
                transactionDone: false                
            }
        case ERROR_TOTAL_LOANS:
            return{
                ...state,
                loading: false,
                totalLoans: null,
                transactionDone: false,
                error: true,
                message: action.apyload
            }
        case CURRENT_LOAN_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
        case CLEAN_LOAN_MESSAGES:
            return{
                ...state,
                error: false,
                message: ''
            }
        default:
            return state
    }
}