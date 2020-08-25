import React, { useEffect }             from 'react'

// Custom
import Filter                           from '../components/filters/Filter'
import Menu                             from '../components/menu/Menu'
import Header                           from '../components/header/Header'
import ListOfMovies                     from '../components/movies/ListOfMovies'
import Pagination                       from '../components/pagination/Pagination'

// Redux
import { useDispatch, useSelector }     from 'react-redux'
import { setCurrentMovie }              from '../actions/movieAction'

const Main = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const currentMovie = useSelector(state => state.movieData.currentMovie)
    const totalMovies = useSelector(state => state.movieData.totalMovies)

    const dispatch = useDispatch()

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    useEffect(() => {
        if(!currentMovie) return

        dispatch( setCurrentMovie(null) )        
    }, [currentMovie, dispatch])

    /*-----------------------------------------------------------------------------*/
    /*--------------------------------- RENDERIZADO -------------------------------*/
    /*-----------------------------------------------------------------------------*/
    return (
        <>
            <div className="main-container">
                <Header />
                <main className='main'>
                    <Menu />
                    <div className='content'>
                        <Filter />
                        <ListOfMovies />
                        {totalMovies > 0 
                        ?
                            <Pagination
                                source='movies'
                            />
                        : null}                    
                    </div>                
                </main>
            </div>
            <div className="main-container-sm">
                <Header />
                <Menu />
                <main className='main'>
                    <div className='content'>
                        <Filter />
                        <ListOfMovies />
                        {totalMovies > 0 
                        ?
                            <Pagination
                                source='movies'
                            />
                        : null}                    
                    </div>                
                </main>
            </div>
        </>
    )
}
 
export default Main