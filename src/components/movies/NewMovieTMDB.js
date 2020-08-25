import React, { useState }              from 'react'
import { useHistory}                    from 'react-router-dom'

// Custom
import { searchMovies, getCredits }     from '../../services/MoviesAPI'
import APIMovie                         from '../../components/movies/APIMovie'

const NewMovieTMDB = ({ submitMovie, cancelNewMovie }) => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    // State local con los campos del formulario
    const [ searchDone, setSearchDone ] = useState(false)
    const [ title, setTitle ] = useState('')
    const [ listOfMovies, setListOfMovies ] = useState([])

    const history  = useHistory()

    /*-----------------------------------------------------------------------------*/
    /*------------------------------- FUNCIONES -----------------------------------*/
    /*-----------------------------------------------------------------------------*/
    const handleOnChange = e => {
        setTitle(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(!title || title.trim() === ''){
            setSearchDone(true)
            return
        }

        searchMovies(title).then(response => {
            getCredits(response)
            .then(movies => {
                setListOfMovies(movies)       
                setSearchDone(true)         
            })
        })   
    }

    const submitAPIMovie = movie => {
        submitMovie(movie)
    }

    const clear = () => {
        setTitle('')
    }

    const handleCancel = () => {
        clear()
        cancelNewMovie()
    }

    const handleBack = () => {
        history.push('/new-movie')
    }

    return (
        <>
            {listOfMovies && listOfMovies.length > 0
            ?
                <>
                    <button
                        type='button'
                        className='btn btn-secondary btn-form btn-block'
                        onClick={handleBack}
                    >
                        Volver
                    </button>
                    <p className='list-of-movies-header info'>Haz clic en la película de la lista que deseas agregar...</p>
                    <ul>
                        {listOfMovies.map(movie => 
                            typeof movie.title !== 'undefined' 
                            ?
                                (<APIMovie
                                    key={movie.id}
                                    movie={movie}
                                    readonly={true}
                                    submitAPIMovie={submitAPIMovie}
                                />)
                            : null
                        )}                        
                    </ul>    
                </>            
            :
                <>
                    <div className="new-movie-wrapper">
                        <form
                            className='w-100'
                            onSubmit={handleSubmit}
                        >
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
                                <button
                                    type='submit'
                                    className='btn btn-ok btn-form'
                                >
                                    Buscar
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-cancel btn-form'
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>                       
                    </div>
                    {searchDone
                    ?
                    <p className='list-of-movies-header'>No se ha encontrado ninguna película</p>
                    : null         
                    }
                </>
            }
        </>
    )
}
 
export default NewMovieTMDB