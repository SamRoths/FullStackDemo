import axios from "axios";
import { returnErrors,createMessage } from "./messages";
import { USER_LOADED,USER_LOADING,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, REGISTER_USER,REGISTER_FAILED } from "./types";

//CHECK TOKEN AND LOAD USER

export const loadUser = () =>(dispatch,getState)=>{
    // User Loading
    dispatch({
        type: USER_LOADING
    })
    //Get token from state
    const token = getState().auth.token;

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    axios.get('/api/auth/user',config).then(res=>{
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    }).catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type:AUTH_ERROR
        })
    })
}

//login user
export const login = (username,password) =>(dispatch)=>{

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //Request Body
    const body = JSON.stringify({'username':username,'password':password})

    axios.post('/api/auth/signin',body,config).then(res=>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
    }).catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type:LOGIN_FAILED
        })
    })
}

//logout user

export const logout = () =>(dispatch,getState)=>{
  
    //Get token from state
    const token = getState().auth.token;
    console.log("logging out")
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    axios.post('/api/auth/logout',null,config).then(res=>{
        dispatch({
            type:LOGOUT_SUCCESS,
            payload:res.data
        });
        window.location.reload();
    }).catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const registerUser = (user)=> dispatch =>{
    axios.post('/api/auth/register',user).then( res=>{
        dispatch(createMessage({registerUser: "User Successfully Registered"}))
        console.log("res:")
        console.log(res)
        dispatch({
            type: REGISTER_USER,
            payload: res.data
        })
    }).catch(err=> {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type:REGISTER_FAILED
        })
    });
};

//get token config helper function

export const tokenConfig = getState=>{
    //Get token from state
    const token = getState().auth.token;
    console.log("logging out")
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}