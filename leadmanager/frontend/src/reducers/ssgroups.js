import { getGroupMembers } from '../actions/secretsanta.js';
import {CREATE_GROUP, GET_GROUPS, GET_USERS_IN_GROUP, UPDATE_GROUP_USER, UPDATE_GROUP, INVITE_USER, ASSIGN_SS, PROMOTE_GROUP_USER, REMOVE_GROUP_USER} from '../actions/types.js'

const initialState = {
    groups:[],
    users:[]
}

export default function(state = initialState,action){
    switch(action.type){
        case GET_GROUPS:
            return{
                ...state,
                groups: action.payload
            };
        case CREATE_GROUP:
            return{
                ...state,
                groups: [ action.payload, ...state.groups]
            }
        case GET_USERS_IN_GROUP:
            return{
                ...state,
                users:[...action.payload]
            }
        case PROMOTE_GROUP_USER:
        case UPDATE_GROUP_USER:

            let temp_users = state.users
            //console.log("temp_users:",temp_users)
            for (let i=0;i<temp_users.length;i++){
                if(temp_users[i].user.id === action.payload.user.id){
                    //console.log("updating temp users at index: ",i)
                    //console.log("action.payload: ",action.payload)
                    temp_users[i] = action.payload
                }
            }
            //console.log("temp_users ",temp_users)

            return{
                ...state,
                users:temp_users
            }
        case UPDATE_GROUP:

            let temp_groups = state.groups
            //npconsole.log("temp_users:",temp_users)
            for (let i=0;i<temp_groups.length;i++){
                if(temp_groups[i].id == action.payload.id){
                    //console.log("updating temp users at index: ",i)
                    //console.log("action.payload: ",action.payload)
                    temp_groups[i] = action.payload
                }
            }
            //console.log("temp_users ",temp_users)

            return{
                ...state,
                groups:temp_groups
            }
        case INVITE_USER:
            return{
                ...state,
                users:[...state.users,action.payload]
            }
        case ASSIGN_SS:
            return{
                ...state,
            }

        default:
            return state;
    }
}