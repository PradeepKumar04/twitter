import * as  ActionTypes from '../constants/getTweetsConstant';

export const GetTweetsReducer=(state={},action)=>{
    switch (action.type) {
        case ActionTypes.GetTweets_REQUEST:
            return{
                loading: true,
                data:null
            }
            break;
        case ActionTypes.GetTweets_SUCCESS:
            return {
                loading:false,
                data:action.payload
            }
        case ActionTypes.GetTweets_FAILURE:
            return {
                loading:false,
                data:null,
                error:action.error
            }
    
        default:
            return state;
    }
}