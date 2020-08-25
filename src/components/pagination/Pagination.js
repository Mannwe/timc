import React                                             from 'react'

import './Pagination.css'

// Redux
import { useSelector, useDispatch }                      from 'react-redux'
import { getListOfMovies, setCurrentMoviePage }          from '../../actions/movieAction'
import { setCurrentLoanPage, getListOfLoans }            from '../../actions/loanAction'

const Pagination = ({ source }) => {   

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const currentMoviePage = useSelector(state => state.movieData.currentPage)
    const currentLoanPage = useSelector(state => state.loanData.currentPage)
    const filters = useSelector(state => state.movieData.filters)
    const totalMovies = useSelector(state => state.movieData.totalMovies)
    const recordsPerPage = process.env.REACT_APP_MOVIES_PER_PAGE
    const totalRawPages = totalMovies / recordsPerPage
    const moviesPages = Math.trunc(totalRawPages, 0) === totalRawPages ? totalRawPages : Math.trunc(totalRawPages, 0) + 1

    const totalLoans = useSelector(state => state.loanData.totalLoans)
    const currentMovie = useSelector(state => state.movieData.currentMovie)
    const loansPerPage = process.env.REACT_APP_LOANS_PER_PAGE
    const loansRawPages = totalLoans / loansPerPage
    const loansPages = Math.trunc(loansRawPages, 0) === loansRawPages ? loansRawPages : Math.trunc(loansRawPages, 0) + 1

    let currentPage = 1
    let totalPages = 1

    if(source === 'movies'){
        currentPage = currentMoviePage
        totalPages = moviesPages
    }else{
        currentPage = currentLoanPage
        totalPages = loansPages
    }

    const dispatch = useDispatch()

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const getListOfRecords = page => {

        if(source === 'movies'){
            getMovies(page)
        }else{
            getLoans(page)
        }
    }

    const getMovies = page => {
        // Parametrizamos la página que queremos mostrar 
        const pageOffset = (page - 1) * recordsPerPage
        const queryParams = { limit: recordsPerPage, skip: pageOffset}

        const params = {...queryParams, ...filters }
        dispatch( getListOfMovies(params) )
    }

    const getLoans = page => {
        // Parametrizamos la página que queremos mostrar 
        const pageOffset = (page - 1) * loansPerPage
        const queryParams = { limit: loansPerPage, skip: pageOffset}

        if(currentMovie){
            const filters = { movieId: currentMovie._id }
            const params = {...queryParams, ...filters }
            dispatch( getListOfLoans(params) )
        }else{
            dispatch( getListOfLoans(queryParams) )
        }
    }

    const setCurrentPage = page => {
        if(source === 'movies'){
            dispatch( setCurrentMoviePage(page) )
        }else{
            dispatch( setCurrentLoanPage(page) )
        }

        getListOfRecords(page)
    }

    const handleFirstPage = () => {
        if(currentPage === 1) return
        setCurrentPage(1)
    }

    const handlePreviousPage = () => {
        if(currentPage === 1) return
        setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if(currentPage === totalPages) return
        setCurrentPage(currentPage + 1)
    }

    const handleLastPage = () => {
        if(currentPage === totalPages) return
        setCurrentPage(totalPages)
    }

    return (
        <div className="pagination-card">
            <div className='pagination-buttons'>
                <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={handleFirstPage}
                >
                    <i className="fa fa-angle-double-left"></i>
                </button>
                <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={handlePreviousPage}
                >
                    <i className="fa fa-angle-left"></i>
                </button>
                <button
                    type='button'
                    className='btn btn-secondary btn-next-prev'
                    onClick={handleNextPage}
                >
                    <i className="fa fa-angle-right"></i>
                </button>            
                <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={handleLastPage}
                >
                    <i className="fa fa-angle-double-right"></i>
                </button>
            </div>
            <span className='pagination-label'>Pág: {currentPage} de {totalPages}</span>
        </div>
    )
}
 
export default Pagination