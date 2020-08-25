import React, { useState } from 'react'

import './Modal.css'

const ConfirmSave = ({ show, closeModal, confirmSave }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const [ opinion, setOpinion ] = useState('')
    const handleClose = () => closeModal()
    const handleConfirm = () => confirmSave(opinion)

    if(!show) return null

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleOnChange = e => {
        setOpinion(e.target.value)
    }

    return(
        <div className='modal-container modal-container-save'>
            <div className="modal-body modal-body-save">
                <div className="form-line modal-form-line">
                    <label className='form-label w-100' htmlFor="opinion">Opinión:</label>
                </div>
                <div className="form-line modal-form-line">
                    <textarea
                        name='opinion'
                        id='opinion'
                        className='form-field w-100'
                        value={opinion}
                        rows={7}
                        onChange={handleOnChange}
                    ></textarea>
                </div>
            </div>
            <button
                type='button'
                className='btn btn-cancel btn-modal'
                onClick={handleClose}
            >
                Cancelar
            </button>
            <button
                type='button'
                className='btn btn-ok btn-modal'
                onClick={handleConfirm}
            >
                Guardar
            </button>     
        </div>
    )
}
 
export default ConfirmSave