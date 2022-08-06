import * as ActionTypes from '../constants/getTweetsConstant';
import  axios  from 'axios'
import getData from '../hooks/getData';
import { GETALLTWEETS } from '../API/Endpoints';

export const GetTweetsAction=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:ActionTypes.GetTweets_REQUEST
        });
        const response= await getData(GETALLTWEETS);
        dispatch({
            type:ActionTypes.GetTweets_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.GetTweets_FAILURE,
            error:error.message,
            payload: null
        })
    }
}