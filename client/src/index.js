import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import App from './components/App'
import reduxThunk from 'redux-thunk'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
    )

console.log(process.env.NODE_ENV)
console.log(process.env.REACT_APP_PUB_KEY)