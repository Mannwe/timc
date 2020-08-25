import React, { useEffect }             from 'react'

// Redux
import { useDispatch, useSelector }     from 'react-redux'
import { countLoans, getListOfLoans,
         setCurrentLoanPage }           from '../actions/loanAction'

// Custom
import Menu                             from '../components/menu/Menu'
import Header                           from '../components/header/Header'
import ListOfLoans                      from '../components/loans/ListOfLoans'
import Pagination                       from '../components/pagination/Pagination'

const Loans = () => {

    /*-----------------------------------------------------------------------------*/
    /*------------------------ STATES LOCALES Y DECLARACIONES ---------------------*/
    /*-----------------------------------------------------------------------------*/
    const totalLoans = useSelector(state => state.loanData.totalLoans)
    const currentMovie = useSelector(state => state.movieData.currentMovie)
    const currentPage = useSelector(state => state.loanData.currentPage)
    const filters = useSelector(state => state.loanData.filters)

    // Parametrizamos la página que queremos mostrar - en este caso la primera
    const queryParams = { limit: process.env.REACT_APP_LOANS_PER_PAGE, skip: 0}

    const dispatch = useDispatch()

    /*-----------------------------------------------------------------------------*/
    /*------------------------- USE EFFECTS DEL COMPONENTE ------------------------*/
    /*-----------------------------------------------------------------------------*/
    // En el primer renderizado calculamos el total de préstamos e inicializamos la paginación
    useEffect(() => {
        dispatch( setCurrentLoanPage(1) )
        if(currentMovie){
            dispatch( countLoans({ movieId: currentMovie._id }) )
        }else{
            dispatch( countLoans({}) )
        }
    }, [currentMovie, dispatch])

    useEffect(() => {
        if(!totalLoans || totalLoans === 0) return

        // Inicializamos la paginación
        if(currentPage !== 1) dispatch( setCurrentLoanPage(1) )

        // Concatenamos los parámetros de consulta con los filtros
        const params = {...queryParams, ...filters }
        dispatch( getListOfLoans(params) ) 
        
    }, [totalLoans, currentPage, queryParams, filters, dispatch])

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
                        <ListOfLoans />
                        {totalLoans > 0 
                        ?
                            <Pagination
                                source='loans'
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
                        <ListOfLoans />
                        {totalLoans > 0 
                        ?
                            <Pagination
                                source='loans'
                            />
                        : null}
                    </div>                
                </main>
            </div>           
        </>
    )
}
 
export default Loans