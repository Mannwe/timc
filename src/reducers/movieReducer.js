// Importamos todos los types
import { NEW_MOVIE,
         CREATING_MOVIE,
         MOVIE_CREATED,
         ERROR_CREATING_MOVIE,
         GETTING_MOVIES,
         GOT_MOVIES,
         ERROR_GETTING_MOVIES,
         CURRENT_MOVIE,
         UPDATING_MOVIE,
         MOVIE_UPDATED,
         ERROR_UPDATING_MOVIE, 
         DELETING_MOVIE,
         MOVIE_DELETED,
         ERROR_DELETING_MOVIE,
         SET_ERROR_MOVIE,
         GETTING_TOTAL_MOVIES,
         GOT_TOTAL_MOVIES,
         ERROR_TOTAL_MOVIES,
         UPDATE_FILTER,
         CURRENT_MOVIE_PAGE,
         CLEAN_MOVIE_MESSAGES }   from '../types'

const initialState = {
    listOfMovies: null,
    error: false,
    loading: false,
    message: null,
    currentMovie: null,
    transactionDone: false,
    totalMovies: null,
    filters: null,
    currentPage: 1,
    apiMovie: null
}         

export default (state = initialState, action) => {
    switch(action.type){
        case NEW_MOVIE:
            return{
                ...state,
                message:null,
                error: false,
                transactionDone: false
            }
        case CREATING_MOVIE:
            return{
                ...state,
                loading: true,
                message: null,
                error: false,
                transactionDone: false
            }
        case MOVIE_CREATED:
            return{
                ...state,
                loading: false,
                message: action.payload,
                error: false,
                transactionDone: true
            }
        case ERROR_CREATING_MOVIE:
            return{
                ...state,
                loading: false,
                message: action.payload,
                error: true,
                transactionDone: false
            }
        case GETTING_MOVIES:
            return{
                ...state,
                loading: true,
                error: false,
                listOfMovies: null,
                currentMovie: null,
                transactionDone: false
            }
        case GOT_MOVIES:
            return{
                ...state,
                loading: false,
                currentMovie: null,
                listOfMovies: action.payload,
                transactionDone: true
            }
        case ERROR_GETTING_MOVIES:
            return{
                ...state,
                loading: false,
                message: action.payload,
                listOfMovies: null,
                error: true,
                transactionDone: false,
                currentPage: 1
            }
        case CURRENT_MOVIE:
            return{
                ...state,
                currentMovie: action.payload,
                message: null,
                error: false,
                transactionDone: false
            }
        case UPDATING_MOVIE:
        case DELETING_MOVIE:    
            return{
                ...state,
                loading: true,
                message: null,
                error: false
            }
        case MOVIE_UPDATED:
            return{
                ...state,
                loading: false,
                message: null,
                currentMovie: null,
                error: false,
                transactionDone: true
            }
        case ERROR_DELETING_MOVIE:
        case ERROR_UPDATING_MOVIE:
            return{
                ...state,
                loading: false,
                message: action.payload,
                currentMovie: null,
                error: true,
                transactionDone: false
            }
        case MOVIE_DELETED:
            return{
                ...state,
                loading: false,
                message: action.payload.message,
                listOfMovies: state.listOfMovies.filter(movie => movie._id !== action.payload.movieId),
                error: false,
                currentPage: 1,
                totalMovies: state.totalMovies - 1,
                transactionDone: true
            }
        case SET_ERROR_MOVIE:
            return{
                ...state,
                error: action.payload !== '' ? true : false,
                message: action.payload
            }
        case GETTING_TOTAL_MOVIES:
            return{
                ...state,
                loading: true,
                error: false,
                totalMovies: 0,
                transactionDone: false
            }    
        case GOT_TOTAL_MOVIES:
            return{
                ...state,
                loading: false,
                totalMovies: action.payload,
                transactionDone: true
            }
        case ERROR_TOTAL_MOVIES:
            return{
                ...state,
                loading: false,
                totalMovies: null,
                transactionDone: false,
                error: true,
                message: action.apyload
            }
        case UPDATE_FILTER:
            return{
                ...state,
                filters: action.payload
            }
        case CURRENT_MOVIE_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
        case CLEAN_MOVIE_MESSAGES:
            return{
                ...state,
                error: false,
                message: ''
            }
        default:
            return state
    }
}