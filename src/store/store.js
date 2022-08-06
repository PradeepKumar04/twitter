import {combineReducers,createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { GetTweetsAction } from '../actions/getTweets';
import { GetTweetsReducer } from '../reducers/getTweetsReducer';
import { LoginUserReducer } from '../reducers/loginReducer';
import { PostTweetReducer } from '../reducers/postTweetReducer';
import { SignupReducer } from '../reducers/signupReducer';


const reducer=combineReducers({
    login: LoginUserReducer,
    signup: SignupReducer,
    postTweet:PostTweetReducer,
    getTweets:GetTweetsReducer
})

const middlewares=[thunk];

const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middlewares)));

export default store;