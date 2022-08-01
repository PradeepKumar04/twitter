import * as ActionTypes from '../constants/loginConstant';
import  axios  from 'axios'

export const LoginUserAction=()=>async(dispatch)=>{
    try {
        dispatch({
            type:ActionTypes.LOGIN_REQUEST
        });
        const response= await axios.get(`https://api.escuelajs.co/api/v1/products`);
        dispatch({
            type:ActionTypes.LOGIN_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.LOGIN_FAILURE,
            error:error.message
        })
    }
}