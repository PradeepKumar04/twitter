import * as ActionTypes from '../constants/signupConstant';
import axios from 'axios';
import postData from '../hooks/postData';
import { REGISTER_USER } from '../API/Endpoints';

export const signupAction=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:ActionTypes.SIGNUP_REQUEST
        });
        const response=await postData(REGISTER_USER,data);
        dispatch({
            type: ActionTypes.SIGNUP_SUCCESS,
            payload:response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SIGNUP_FAILURE,
            error:error.message
        })
    }
}