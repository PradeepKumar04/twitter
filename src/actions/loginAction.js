import * as ActionTypes from '../constants/loginConstant';
import  axios  from 'axios'

export const LoginUserAction=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:ActionTypes.LOGIN_REQUEST
        });
        const response= await axios.post(`https://localhost:44387/api/Authentication/login`, data);
        dispatch({
            type:ActionTypes.LOGIN_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.LOGIN_FAILURE,
            error:error.message,
            payload: null
        })
    }
}