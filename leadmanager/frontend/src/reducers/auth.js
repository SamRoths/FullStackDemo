import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILED, REGISTER_USER } from "../actions/types"

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}
export default function(state = initialState, action){
    switch (action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user: action.payload
            }
        case AUTH_ERROR:
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS:
        case REGISTER_FAILED:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        case REGISTER_USER:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false
            }

        default:
            return state
    }
}