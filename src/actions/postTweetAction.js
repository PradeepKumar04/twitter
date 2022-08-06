import * as ActionTypes from '../constants/postTweetConstant';
import  axios  from 'axios'
import postData from '../hooks/postData';
import { POST_TWEET } from '../API/Endpoints';

export const postTweetAction=(data)=>async(dispatch)=>{
    
    try {
        dispatch({
            type:ActionTypes.POST_TWEET_REQUEST
        });
        const response= await postData(POST_TWEET,data);
        dispatch({
            type:ActionTypes.POST_TWEET_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.POST_TWEET_FAILURE,
            error:error.message,
            payload: null
        })
    }
}