import { applyMiddleware, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from "redux-logger"
import thunk from 'redux-thunk'
import promise from "redux-promise-middleware"


import reducers from "./reducers"

export const history = createHistory()
const middleware = applyMiddleware(
    promise(), 
    routerMiddleware(history),
    thunk, 
    logger)
const store = createStore(
    connectRouter(history)(reducers),
    middleware
)

export default store;
