import React, { useState }              from 'react'
import uuid                             from 'react-uuid'

// Custom
import FilterSelector                   from '../filter-selectors/FilterSelector'
import FilterSelectorTemplate           from '../filter-selectors/FiterSelectorTemplate'

// Redux
import { useDispatch, useSelector }     from 'react-redux'
import { updateFilters }                from '../../actions/movieAction'

import './Filter.css'

const ListOfSelectors = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const [ arrayOfSelections, updateArrayOfSelections ] = useState([])
    const filters = useSelector(state => state.movieData.filters)

    const dispatch = useDispatch()
    
    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    // Añadimos un nuevo filtro desde el componente hijo FilterSelector
    const addFilter = newFilter => {
        newFilter.id = uuid() // Le asignamos id único para la key de la iteración
        updateArrayOfSelections([newFilter, ...arrayOfSelections])
        // Convertimos el array de filtros en un objeto de tipo propiedad: valor, para los filtros
        dispatch( updateFilters({
                    ...filters, 
                    [newFilter.name]: newFilter.value
                }) )
    }

    // Eliminamos el filtro seleccionado desde el componente hijo FilterSelector
    const removeFilter = filter => {
        const { id, name } = filter
        updateArrayOfSelections(arrayOfSelections.filter(element => element.id !== id))

        // Eliminamos el elemento correspondiente del objeto de filtros
        const newFilters = filters
        delete newFilters[name]
        dispatch( updateFilters(newFilters) )
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <div className="card-body-filter-list">
            <ul className='list-of-selectors'>
                <FilterSelectorTemplate 
                    addFilter={addFilter}
                />
                {arrayOfSelections && arrayOfSelections.length > 0
                ?
                    arrayOfSelections.map(filter => (
                        <FilterSelector
                            key={filter.id}
                            filter={filter}
                            addFilter={addFilter}
                            removeFilter={removeFilter}
                        />
                    ))
                : null}
            </ul>
        </div>
    )
}
 
export default ListOfSelectors