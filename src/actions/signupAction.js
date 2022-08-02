import * as ActionTypes from '../constants/signupConstant';
import axios from 'axios';

export const signupAction=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:ActionTypes.SIGNUP_REQUEST
        });
        const response=await axios.post(`https://localhost:44387/api/Authentication/signup`, data);
        dispatch({
            type: ActionTypes.SIGNUP_SUCCESS,
            data:response
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SIGNUP_FAILURE,
            error:error.message
        })
    }
}