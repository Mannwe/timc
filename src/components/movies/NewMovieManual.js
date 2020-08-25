import React, { useState, useEffect }      from 'react'

import './Movies.css'

const NewMovieManual = ({ submitMovie, cancelNewMovie }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    // State local con los campos del formulario
    const [ movie, setMovie ] = useState({
        title: '',
        year: 0,
        cast: '',
        director: '',
        plot: '',
        opinion: '',
        image: ''
    })    

    // Extraemos variables del formulario
    const { title, year, cast, director, plot, opinion } = movie
    const [ years, setYears ] = useState([])

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    // En el primer renderizado generamos el array de años
    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const yearsList = []
        for(let year = currentYear; year >= 1900; year--){
            yearsList.push(year)            
        }
        setYears(yearsList)
    }, [])

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleOnChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.name === 'year' ? Number(e.target.value) : e.target.value
        })
    }

    const handleCancel = () => {
        clear()
        cancelNewMovie()
    }

    const handleSubmit = e => {
        e.preventDefault()

        submitMovie(movie)
    }

    const clear = () => {
        setMovie({
            title: '',
            year: 0,
            cast: '',
            director: '',
            plot: '',
            opinion: '',
            image: ''
        })
    }

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <div className="new-movie-wrapper">
            <form
                className='w-100'
                onSubmit={handleSubmit}
            >
                <div className='new-movie'>
                    <div className="form-line">
                        <label className='form-label w-75' htmlFor="title">Título:</label>
                        <label className='form-label w-20' htmlFor="year">Año:</label>
                    </div>
                    <div className="form-line">
                        <input
                            type='text'
                            name='title'
                            id='title'
                            className='form-field w-75'
                            value={title}
                            onChange={handleOnChange}
                        />
                        <select 
                            name='year'
                            id='year'
                            className='form-field w-20'
                            value={year}
                            onChange={handleOnChange}
                        >
                            {years ? years.map(year => (
                                <option 
                                    value={year}
                                    key={year}
                                >{year}</option>
                            ) ) : null}
                        </select>
                    </div>
                    <div className="form-line">
                        <label className='form-label' htmlFor="year">Reparto:</label>
                    </div>
                    <div className="form-line">
                        <input
                            type='text'
                            name='cast'
                            id='cast'
                            className='form-field w-100'
                            value={cast}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-line">
                        <label className='form-label' htmlFor="director">Director:</label>
                    </div>
                    <div className="form-line">
                        <input
                            type='text'
                            name='director'
                            id='director'
                            className='form-field w-100'
                            value={director}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-line">
                        <label className='form-label w-48' htmlFor="plot">Argumento:</label>
                        <label className='form-label w-48' htmlFor="opinion">Opinión:</label>
                    </div>
                    <div className="form-line">
                        <textarea
                            name='plot'
                            id='plot'
                            className='form-field w-48'
                            value={plot}
                            rows={7}
                            onChange={handleOnChange}
                        ></textarea>
                        <textarea
                            name='opinion'
                            id='opinion'
                            className='form-field w-48'
                            value={opinion}
                            rows={7}
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                    <div className="form-line">
                        <button
                            type='submit'
                            className='btn btn-ok btn-form'
                        >
                            Guardar
                        </button>
                        <button
                            type='button'
                            className='btn btn-cancel btn-form'
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                <div className='new-movie-sm'>
                    <div className="form-line">
                        <label className='form-label w-100' htmlFor="title">Título:</label>
                    </div>
                    <div className="form-line">                        
                        <input
                            type='text'
                            name='title'
                            id='title'
                            className='form-field w-100'
                            value={title}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-line">
                        <label className='form-label w-48' htmlFor="year">Año:</label>
                    </div>
                    <div className="form-line">
                        <select 
                            name='year'
                            id='year'
                            className='form-field w-48'
                            value={year}
                            onChange={handleOnChange}
                        >
                            {years ? years.map(year => (
                                <option 
                                    value={year}
                                    key={year}
                                >{year}</option>
                            ) ) : null}
                        </select>
                    </div>
                    <div className="form-line">
                        <label className='form-label' htmlFor="year">Reparto:</label>
                    </div>
                    <div className="form-line">
                        <input
                            type='text'
                            name='cast'
                            id='cast'
                            className='form-field w-100'
                            value={cast}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-line">
                        <label className='form-label' htmlFor="director">Director:</label>
                    </div>
                    <div className="form-line">
                        <input
                            type='text'
                            name='director'
                            id='director'
                            className='form-field w-100'
                            value={director}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-line">
                        <label className='form-label w-100' htmlFor="plot">Argumento:</label>
                    </div>
                    <div className="form-line">
                        <textarea
                            name='plot'
                            id='plot'
                            className='form-field w-100'
                            value={plot}
                            rows={7}
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                    <div className="form-line">
                        <label className='form-label w-100' htmlFor="opinion">Opinión:</label>    
                    </div>
                    <div className="form-line">
                        <textarea
                            name='opinion'
                            id='opinion'
                            className='form-field w-100'
                            value={opinion}
                            rows={7}
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                    <div className="form-line">
                        <button
                            type='submit'
                            className='btn btn-ok btn-form'
                        >
                            Guardar
                        </button>
                        <button
                            type='button'
                            className='btn btn-cancel btn-form'
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>  
    )
}
 
export default NewMovieManual