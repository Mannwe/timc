import React from 'react'

import './FilterSelector.css'

const FilterSelector = ({ filter, removeFilter }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const { label, value } = filter

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleRemoveFilter = () => {
        removeFilter(filter)
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <li className='filter-selector'>
            <input 
                type="text"
                className='filter-name'
                name='label'
                value={label}
                disabled                
            />
            <input 
                type="text"
                className='filter-value'
                name='value'
                value={value}
                disabled                
            />
            <div 
                className="filter-icon"
                title='Eliminar filtro'
                onClick={handleRemoveFilter}
            >
                &times;
            </div>
        </li>
    )
}
 
export default FilterSelector