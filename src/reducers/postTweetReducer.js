import * as  ActionTypes from '../constants/postTweetConstant';

export const PostTweetReducer=(state={},action)=>{
    switch (action.type) {
        case ActionTypes.POST_TWEET_REQUEST:
            return{
                loading: true,
                data:null
            }
            break;
        case ActionTypes.POST_TWEET_SUCCESS:
            return {
                loading:false,
                data:action.payload
            }
        case ActionTypes.POST_TWEET_FAILURE:
            return {
                loading:false,
                data:null,
                error:action.error
            }
    
        default:
            return state;
    }
}