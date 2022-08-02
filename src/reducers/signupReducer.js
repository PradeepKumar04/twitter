import * as ActionTypes from '../constants/signupConstant';
export const SignupReducer=(state={},action)=>{
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return {
                loading: true,
                data:null
            }
        case ActionTypes.SIGNUP_SUCCESS:
            return{
                loading:false,
                data:action.payload
            }
        case ActionTypes.SIGNUP_FAILURE:
            return {
                loading: false,
                error:action.error
            }
        default:
            return state
    }
}