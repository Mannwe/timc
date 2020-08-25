import React, { useState }      from 'react'

import './Movies.css'

// Custom
import ConfirmSave              from '../modal/ConfirmSave'
import ModalOverlay             from '../modal/ModalOverlay'

const APIMovie = ({ movie, submitAPIMovie }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const [ confirm, setConfirm ] = useState(false)

    // Extraemos las variables de la película
    const { title, director, cast, plot, year } = movie

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const closeModal = () => {
        setConfirm(false)
    }

    const confirmSave = opinion => {
        setConfirm(false)
        movie.opinion = opinion
        submitAPIMovie(movie)
    }   

    const handleSelectMovie = () => {
        setConfirm(true)
    }    

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <>
            <li className='movie-wrapper'>
                <ConfirmSave
                    show={confirm}
                    closeModal={closeModal}
                    confirmSave={confirmSave}
                />
                <div 
                    className='movie-container cursor-pointer'
                    onClick={handleSelectMovie}
                >
                    <div className="image-wrapper">
                        {movie.image !== ''
                        ? <img 
                            src={movie.image} 
                            alt={movie.title} 
                            className='movie-image'
                        />
                        : null}
                    </div>
                    <div className='movie-data'>
                        <div className='movie-line'>
                            <label>Título: </label>
                            <div className='title-line'>
                                <span>{title}</span>
                            </div>
                        </div>
                        <div className='movie-line'><label>Director: </label><span className='movie-line-text'>{director}</span></div>
                        <div className='movie-line'><label>Año: </label><span className='movie-line-text'>{year}</span></div>
                        <div className='movie-line'><label>Reparto: </label><span className='movie-line-text'>{cast}</span></div>
                        <div className='movie-line'><label>Argumento</label></div>      
                        <div className='plot'>{plot}</div>                            
                    </div>                        
                </div>
                {confirm 
                ?
                    <ModalOverlay
                        className='modal-overlay'
                    />
                : null}
            </li>
        </>
    )
}
 
export default APIMovie