// Importamos todos los types
import { CREATING_MOVIE,
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
         CLEAN_MOVIE_MESSAGES }     from '../types'

import clientAxios                  from '../config/axios'

export const cleanMessages = () => ({
    type: CLEAN_MOVIE_MESSAGES
})

// Creamos la película         
export const createMovie = movie => {
    return async (dispatch) => {
        dispatch( creatingNewMovie() )

        try {
            // Creamos la película
            const response = await clientAxios.post('/api/movies', movie)

            dispatch( movieCreated(response.data.msg) )
        } catch (error) {
            console.log(error.response.data.msg)
            dispatch( errorCreatingMovie(error.response.data.msg) )
        }
    }
}

const creatingNewMovie = () => ({
    type: CREATING_MOVIE
})

const movieCreated = message => ({
    type: MOVIE_CREATED,
    payload: message
})

const errorCreatingMovie = message => ({
    type: ERROR_CREATING_MOVIE,
    payload: message
})

// Obtenemos una lista con las películas
export const getListOfMovies = params => {
    return async (dispatch) => {
        dispatch( gettingListOfMovies() )

        try {
            /* Obtenemos la lista de películas - En la variable params incluímos:
                * Filtros
                * Limit: registros por página
                * Skip: el offset para seleccionar la página
            */
            const response = await clientAxios.get('/api/movies', { params })
            const movies = response.data.movies
            
            dispatch( gotListOfMovies(movies) )
        } catch (error) {
            console.log(error.response.data.msg)
            dispatch( errorGettigListOfMovies(error.response.data.msg) )
        }
    }
}

const gettingListOfMovies = () => ({
    type: GETTING_MOVIES
})

const gotListOfMovies = movies => ({
    type: GOT_MOVIES,
    payload: movies
})

const errorGettigListOfMovies = message => ({
    type: ERROR_GETTING_MOVIES,
    payload: message
})

// Obtenemos la película actual seleccionada
export const setCurrentMovie = movie => ({
    type: CURRENT_MOVIE,
    payload: movie
})

// Actualizamos el registro de la película editada
export const updateMovie = movie => {
    return async (dispatch) => {
        dispatch( updatingMovie() )

        try {
            // Actualizamos la película
            const response = await clientAxios.put(`/api/movies/${movie._id}`, movie)
            
            dispatch( movieUpdated(response.data.movie) )
        } catch (error) {
            console.log(error.response.data.msg)
            dispatch( errorUpdatingMovie(error.response.data.msg) )
        }
    }
}

const updatingMovie = () => ({
    type: UPDATING_MOVIE
})

const movieUpdated = movieUpdated => ({
    type: MOVIE_UPDATED,
    payload: movieUpdated
})

const errorUpdatingMovie = message => ({
    type: ERROR_UPDATING_MOVIE,
    payload: message
})

// Borramos la película actual
export const deleteMovie = movieId => {
    return async (dispatch) =>{
        dispatch( deletingMovie() )

        try {
            // Eliminamos la película
            const message = await clientAxios.delete(`/api/movies/${movieId}`)
            
            dispatch( movieDeleted(movieId, message.data.msg) )
        } catch (error) {
            console.log(error.response.data.msg)
            dispatch( errorDeletingMovie(error.response.data.msg) )
        }
    }
}

const deletingMovie = () => ({
    type: DELETING_MOVIE
})

const movieDeleted = (movieId, message) => ({
    type: MOVIE_DELETED,
    payload: {movieId, message}
})

const errorDeletingMovie = errorMessage => ({
    type: ERROR_DELETING_MOVIE,
    payload: errorMessage
})

// Mensajes para los casos en los que se producen en el cliente
export const setError = message => ({
    type: SET_ERROR_MOVIE,
    payload: message
})

export const countMovies = filters => {
    return async(dispatch) => {

        dispatch( gettingTotalMovies() )
        try {
            const response = await clientAxios.get('/api/movies/count', {params: filters})
            const total = response.data.count
            
            dispatch( gotTotalMovies(total))
        } catch (error) {
            console.log(error.response.data.msg)           
            dispatch( errorGettingTotalMovies(error.response.data.msg))
        }
    }
}

const gettingTotalMovies = () => ({
    type: GETTING_TOTAL_MOVIES
})

const gotTotalMovies = total => ({
    type: GOT_TOTAL_MOVIES,
    payload: total
})

const errorGettingTotalMovies = errorMessage => ({
    type: ERROR_TOTAL_MOVIES,
    payload: errorMessage
})

export const updateFilters = filters => ({
    type: UPDATE_FILTER,
    payload: filters
})

export const setCurrentMoviePage = currentPage => ({
    type: CURRENT_MOVIE_PAGE,
    payload: currentPage
})
