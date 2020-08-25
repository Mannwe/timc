import React, { useState } from 'react'

import './FilterSelector.css'

const FilterSelectorTemplate = ({ addFilter }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const [ filterInputs, setFilterInputs ] = useState({
        name: '',
        value: '',
        label: ''
    })
    const { name, value, label } = filterInputs
    
    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleAddFilter = () => {
        addFilter({
            name,
            label,
            value
        })
    }

    const handleOnChange = e => {
        // Obtenemos el valor del texto de la etiqueta option seleccionada
        if(e.target.name === 'name'){
            const index = e.nativeEvent.target.selectedIndex
            const label = e.nativeEvent.target[index].text
            setFilterInputs({
                ...filterInputs,
                label,
                name: e.target.value
            })
        }else{
            setFilterInputs({
                ...filterInputs,
                [e.target.name]: e.target.value
            })
        }
    }    
    
    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <li className='filter-selector filter-template'>
            <div className='fields-block'>
                <select 
                    name='name'
                    className='filter-name filter-field'
                    value={name}
                    onChange={handleOnChange}
                >
                    <option value="*"> --Seleccione una opción-- </option>
                    <option value="title">Título</option>
                    <option value="director">Director</option>
                    <option value="year">Año</option>
                </select>
                <input 
                    type="text"
                    className='filter-value filter-field'
                    name='value'
                    value={value}
                    onChange={handleOnChange}
                />
            </div>
            <div 
                className="filter-icon add-filter"
                title='Añadir filtro'
                onClick={handleAddFilter}
            >
                <i className="fa fa-check"></i>
            </div>
        </li>
    )
}
 
export default FilterSelectorTemplate