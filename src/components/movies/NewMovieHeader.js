import React            from 'react'
import { Link }         from 'react-router-dom'

const NewMovieHeader = ({ selection, handleLink }) => {

    return (
        <>
            <ul className='new-movie-header'>
                <li className='new-movie-header-label'>
                    {selection === 'imported'
                    ?  (<Link 
                            to='#'
                            name='imported'
                            className='selected'
                            onClick={handleLink}
                        >
                            Importar de TMDB
                        </Link>)
                    :
                    (<Link 
                        to='#'
                        name='imported'
                        onClick={handleLink}
                    >
                        Importar de TMDB
                    </Link>)
                    }
                </li>
                <li>&frasl;</li>
                <li className='new-movie-header-label'>
                    {selection === 'manual'
                    ?  (<Link 
                            to='#'
                            name='manual'
                            className='selected'
                            onClick={handleLink}
                        >
                            Añadir Manualmente
                        </Link>)
                    :
                    (<Link 
                        to='#'
                        name='manual'
                        onClick={handleLink}
                    >
                        Añadir Manualmente
                    </Link>)
                    }
                </li>
            </ul>
        </>
    )
}
 
export default NewMovieHeader