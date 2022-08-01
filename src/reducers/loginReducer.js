import * as  ActionTypes from '../constants/loginConstant';

export const LoginUserReducer=(state={},action)=>{
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return{
                loading: true,
                data:null
            }
            break;
        case ActionTypes.LOGIN_SUCCESS:
            return {
                loading:false,
                data:action.payload
            }
        case ActionTypes.LOGIN_FAILURE:
            return {
                loading:false,
                data:null,
                error:action.error
            }
    
        default:
            return state;
    }
}