import React from 'react'

import './Modal.css'

const ConfirmDelete = ({ show, closeModal, confirmDelete }) => {

    const handleClose = () => closeModal()
    const handleConfirm = () => confirmDelete()

    if(!show) return null

    return(
        <div className='modal-container'>
            <div className='modal-header'>
                <h1>Mensaje de Confirmación</h1>
            </div>
            <div className="modal-body">
                ¿Está seguro de que desea eliminar este registro?
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
                Sí, eliminar
            </button>            
        </div>
    )
    
}
 
export default ConfirmDelete