import {combineReducers,createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { LoginUserReducer } from '../reducers/loginReducer';
import { SignupReducer } from '../reducers/signupReducer';


const reducer=combineReducers({
    login: LoginUserReducer,
    signup: SignupReducer
})

const middlewares=[thunk];

const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middlewares)));

export default store;