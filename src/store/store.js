import {combineReducers,createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { LoginUserReducer } from '../reducers/loginReducer';


const reducer=combineReducers({
    login: LoginUserReducer
})

const middlewares=[thunk];

const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middlewares)));

export default store;