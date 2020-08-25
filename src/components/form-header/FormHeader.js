import React from 'react'

import './FormHeader.css'

const FormHeader = ({ title }) => {
    return (
        <div className='form-header'>
            <h1>{title}</h1>
        </div>
    )
}
 
export default FormHeader