import React, { useState, useEffect }                  from 'react'
import { useHistory }                       from 'react-router-dom'

import './Movies.css'

// Redux
import { useDispatch, useSelector }         from 'react-redux'
import { setCurrentMovie, deleteMovie }     from '../../actions/movieAction'

// Custom
import ConfirmDelete                        from '../modal/ConfirmDelete'
import ModalOverlay                         from '../modal/ModalOverlay'

const Movie = ({ movie }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const [ confirm, setConfirm ] = useState(false)

    // Extraemos las variables de la película
    const { title, cast, plot, year } = movie
    const transactionDone = useSelector(state => state.movieData.transactionDone)

    const history = useHistory()

    // Guardamos la película actual en el state
    const dispatch = useDispatch()
    const currentMovie = () => dispatch( setCurrentMovie(movie) )

    useEffect(() => {
        if(!transactionDone) return

        history.push('/main')
        
    }, [history, transactionDone])

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleEdit = () => {

        if(!movie) return

        currentMovie()
        history.push('/edit-movie')
    }

    const handleDelete = () => {
        setConfirm(true)        
    }

    const closeModal = () => {
        setConfirm(false)
    }

    const confirmDelete = () => {
        setConfirm(false)
        dispatch( deleteMovie(movie._id) )
    }   

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <>
            <li className='movie-wrapper'>
                <ConfirmDelete
                    show={confirm}
                    closeModal={closeModal}
                    confirmDelete={confirmDelete}
                />
                <div 
                    className='movie-container'
                >
                    <div className='movie-data'>
                        <table className='movie-table'>
                            <tbody>
                                <tr>
                                    <td className='image-cell'
                                        rowSpan={5}>
                                        {movie.image !== ''
                                        ? <img 
                                            src={movie.image} 
                                            alt={movie.title} 
                                            className='movie-image'
                                        />
                                        : null}
                                    </td>
                                    <th className='label-cell'>Título:</th>
                                    <td className='description-cell'>{title}</td>
                                    <td 
                                        className='btn-dismiss'
                                        onClick={handleDelete}
                                    >
                                        &times;
                                    </td>
                                </tr>
                                <tr>
                                    <th className='label-cell'>Año:</th>
                                    <td className='description-cell'>{year}</td>
                                </tr>
                                <tr>
                                    <th className='label-cell'>Reparto:</th>
                                    <td className='description-cell'>{cast}</td>
                                </tr>
                                <tr>
                                    <th className='label-cell'>Argumento</th>
                                </tr>
                                <tr>
                                <td colSpan={3} className='plot description-cell'>{plot}</td>
                                </tr>
                            </tbody>                        
                        </table>
                    </div>
                    <div className='movie-data-sm'>
                        <table className='movie-table'>
                            <tbody>
                                <tr>
                                    <td rowSpan={6}>
                                        {movie.image !== ''
                                        ? <img 
                                            src={movie.image} 
                                            alt={movie.title} 
                                            className='movie-image'
                                        />
                                        : null}
                                    </td>
                                    <th className='label-cell'>Título:</th>
                                    <td 
                                        className='btn-dismiss'
                                        onClick={handleDelete}
                                    >
                                        &times;
                                    </td>
                                </tr>
                                <tr><td className='description-cell'>{title}</td></tr>
                                <tr><th className='label-cell'>Año:</th></tr>
                                <tr><td className='description-cell'>{year}</td></tr>
                                <tr><th className='label-cell'>Reparto:</th></tr>
                                <tr><td className='description-cell cast'>{cast}</td></tr>
                                <tr><th className='label-cell'>Argumento</th></tr>
                                <tr><td colSpan={3} className='plot description-cell'>{plot}</td></tr>
                            </tbody>                        
                        </table>
                    </div>
                    <div className='movie-data-ssm'>
                        <table className='movie-table'>
                            <tbody>
                                <tr>
                                    <td>
                                        {movie.image !== ''
                                        ? <img 
                                            src={movie.image} 
                                            alt={movie.title} 
                                            className='movie-image'
                                        />
                                        : null}
                                    </td>
                                    <td 
                                        className='btn-dismiss'
                                        onClick={handleDelete}
                                    >
                                        &times;
                                    </td>
                                </tr>
                                <tr><th colSpan={2} className='label-cell'>Título:</th></tr>
                                <tr><td colSpan={2} className='description-cell'>{title}</td></tr>
                                <tr><th colSpan={2} className='label-cell'>Año:</th></tr>
                                <tr><td colSpan={2} className='description-cell'>{year}</td></tr>
                                <tr><th colSpan={2} className='label-cell'>Reparto:</th></tr>
                                <tr><td colSpan={2} className='description-cell cast'>{cast}</td></tr>
                                <tr><th colSpan={2} className='label-cell'>Argumento</th></tr>
                                <tr><td colSpan={2} className='plot description-cell'>{plot}</td></tr>
                            </tbody>                        
                        </table>
                    </div>
                </div>
                <button 
                    type='button'
                    className='btn btn-secondary btn-block'
                    onClick={handleEdit}
                >
                    Ver más...
                </button>
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
 
export default Movie