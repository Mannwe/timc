import { createStore, applyMiddleware, compose }    from 'redux'
import thunk                                        from 'redux-thunk'
// Importamos los reducers al store, combinados en el combineReducers
import reducer                                      from './reducers'

const store = createStore(
    reducer,
    compose( applyMiddleware(thunk),  // Para despachar asíncronamente las acciones
        // Para agregar la funcionalidad de las redux developer tools
        typeof window === 'object' &&
               window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
               window.__REDUX_DEVTOOLS_EXTENSION__() :
               f => f
    )
)

export default store