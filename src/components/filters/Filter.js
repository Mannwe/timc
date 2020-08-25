import React, { useState, useEffect }   from 'react'

// Redux
import { useDispatch, useSelector }     from 'react-redux'
import { getListOfMovies, countMovies,
         setCurrentMoviePage }          from '../../actions/movieAction'

import './Filter.css'

// Custom
import ListOfSelectors                  from './ListOfSelectors'

const Filter = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    // States locales
    const [ filtersOpen, setFiltersOpen ] = useState(false)
    const totalMovies = useSelector(state => state.movieData.totalMovies)
    const currentPage = useSelector(state => state.movieData.currentPage)
    const filters = useSelector(state => state.movieData.filters)

    // Parametrizamos la página que queremos mostrar - en este caso la primera
    const queryParams = { limit: process.env.REACT_APP_MOVIES_PER_PAGE, skip: 0}

    const dispatch = useDispatch()

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    useEffect(() => {
        if(!totalMovies || totalMovies === 0) return

        // Inicializamos la paginación
        if(currentPage !== 1) dispatch( setCurrentMoviePage(1) )

        // Concatenamos los parámetros de consulta con los filtros
        const params = {...queryParams, ...filters }
        dispatch( getListOfMovies(params) ) 
        
        dispatch( getListOfMovies(params) ) 
    }, [totalMovies, currentPage, queryParams, filters, dispatch])
    
    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleCloseFilters = () => {
        setFiltersOpen(false)
    }

    const handleOpenFilters = () => {
        setFiltersOpen(true)
    }

    const handleApplyFilters = () => {
        dispatch( countMovies(filters) )
    } 

    return (
        <div className="card filter-card">
            <div className="card-header-filter">
                <span className='filter-title'>Filtros</span>
                <div className="actions-box">
                    <div 
                        className="action-box"
                        title='Cerrar Filtros'
                        onClick={handleCloseFilters}
                    >
                        &minus;
                    </div>
                    <div 
                        className="action-box"
                        title='Abrir Filtros'
                        onClick={handleOpenFilters}
                    >
                        +
                    </div>
                </div>
            </div>
            
            <div className='card-body-filter'>
                {filtersOpen ? <ListOfSelectors /> : null}  
                <button
                    type='button'
                    className='btn btn-ok btn-filter btn-block'
                    onClick={handleApplyFilters}
                >
                    Buscar películas
                </button>              
            </div>
        </div>
    )
}
 
export default Filter