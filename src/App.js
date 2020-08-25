import React                                        from 'react';
import { BrowserRouter as Router, Route, Switch }   from 'react-router-dom'

// Redux
import { Provider }                                 from 'react-redux'
import store                                        from './store'

// Custom
import NewAccount                                   from './pages/NewAccount'
import Login                                        from './pages/Login'
import Main                                         from './pages/Main'
import NewMovie                                     from './pages/NewMovie'
import EditMovie                                    from './pages/EditMovie'
import Loans                                        from './pages/Loans'
import NewLoan                                      from './pages/NewLoan'
import EditLoan                                     from './pages/EditLoan'
import authToken                                    from './config/token'

function App() {

    /* Recuperamos el token del local storage para que al refrescar o cambiar
       de página no pierda la autenticación */
    const token = localStorage.getItem('timcToken')
    if(token){
        authToken(token)
    }

    return (
        <>
            <Provider store={store}> { /* Las acciones que agreguemos a través del store estarán disponibles en toda la aplicación */ }
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/new-account' component={NewAccount} />
                        <Route exact path='/main' component={Main} />
                        <Route exact path='/new-movie' component={NewMovie} />
                        <Route exact path='/edit-movie' component={EditMovie} />
                        <Route exact path='/loans' component={Loans} />
                        <Route exact path='/new-loan' component={NewLoan} />
                        <Route exact path='/edit-loan' component={EditLoan} />
                    </Switch>
                </Router>
            </Provider>            
        </>
    );
}

export default App;
