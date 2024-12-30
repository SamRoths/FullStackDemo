import axios from "axios";
import { returnErrors,createMessage } from "./messages";
import { tokenConfig } from './auth';
import { CREATE_GROUP, CREATE_INIT_MEMBER, GET_GROUPS, GET_USERS_IN_GROUP, UPDATE_GROUP_USER, UPDATE_GROUP, INVITE_USER, ASSIGN_SS,PROMOTE_GROUP_USER, REMOVE_GROUP_USER, DELETE_GROUP } from "./types";

export const getGroups = () =>(dispatch, getState)=>{
    axios.get('/api/secretsanta/group/',tokenConfig(getState)).then(res=>{
        dispatch({
            type: GET_GROUPS,
            payload: res.data
        })
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}

export const createGroup = (group) =>(dispatch, getState)=>{
    axios.post('/api/secretsanta/group/',group,tokenConfig(getState)).then(res=>{
        dispatch({
            type: CREATE_GROUP,
            payload: res.data
        })
        
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}

export const getGroupMembers = (groupID) => (dispatch,getState) =>{
    axios.get(`/api/secretsanta/groupuser?group=${groupID}`,tokenConfig(getState)).then(res=>{
        dispatch({
            type: GET_USERS_IN_GROUP,
            payload: res.data
        })

    }).catch(err =>{dispatch(returnErrors(err.response.data, err.response.status))})
}

export const updateGroupUser = (groupID,updatedInfo)=> (dispatch,getState) =>{
    axios.patch(`/api/secretsanta/groupuser/${groupID}`,updatedInfo,tokenConfig(getState)).then(res=>{
        dispatch({
            type:UPDATE_GROUP_USER,
            payload:res.data
        })
        dispatch(createMessage({updatedGroupUser: "User Updated Successfully"}))
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}

export const updateGroup = (groupID,updatedInfo)=> (dispatch,getState) =>{
    axios.patch(`/api/secretsanta/group/${groupID}/`,updatedInfo,tokenConfig(getState)).then(res=>{
        console.log("res: ",res)
        dispatch({
            type:UPDATE_GROUP,
            payload:res.data
        })
        dispatch(createMessage({updatedGroup: "Group Updated Successfully"}))
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}

export const inviteUser = (data)=> (dispatch,getState) =>{
    axios.post('/api/secretsanta/groupuser/invite',data,tokenConfig(getState)).then(res=>{
        console.log("res: ",res)
        dispatch({
            type:INVITE_USER,
            payload:res.data
        })
        dispatch(createMessage({invitedUser: "User Added To Group"}))

    }).catch(err=>{
        console.log(err)
        dispatch(returnErrors(err.response.data,err.response.status))})
}

export const assignSecretSanta = (groupID) => (dispatch,getState) =>{
    axios.patch(`/api/secretsanta/group/${groupID}/assign`,{},tokenConfig(getState)).then(res=>{
        dispatch({
            type: ASSIGN_SS,
            payload: res.data
        })
        dispatch(createMessage({assignedSS: "Secret Santas Assigned Successfully"}))
    }).catch(err =>{dispatch(returnErrors(err.response.data, err.response.status))})
}

export const promoteGroupUser = (groupID,userID)=> (dispatch,getState) =>{
    axios.patch('/api/secretsanta/groupuser/promote',{user:userID,group:groupID},tokenConfig(getState)).then(res=>{
        dispatch({
            type:PROMOTE_GROUP_USER,
            payload:res.data
        })
        dispatch(createMessage({promotedGroupUser: "User Promoted Successfully"}))
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}

export const removeGroupUser = (groupID,userID)=> (dispatch,getState) =>{
    axios.delete(`/api/secretsanta/groupuser/${groupID}/${userID}`,tokenConfig(getState)).then(res=>{
        dispatch({
            type:REMOVE_GROUP_USER,
            payload:res.data
        })
        dispatch(createMessage({removedGroupUser: "User Removed From Group Successfully"}))
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}

export const leaveGroup = (groupID,userID)=> (dispatch,getState) =>{
    axios.delete(`/api/secretsanta/groupuser/${groupID}/${userID}`,tokenConfig(getState)).then(res=>{
        dispatch({
            type:LEAVE_GROUP,
            payload:res.data
        })
        dispatch(createMessage({leaveGroup: "User Left Group Successfully"}))
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}

export const deleteGroup = (groupID)=> (dispatch,getState) =>{
    axios.delete(`/api/secretsanta/group/${groupID}/`,tokenConfig(getState)).then(res=>{
        dispatch({
            type:DELETE_GROUP,
            payload:res.data
        })
        dispatch(createMessage({deletedGroup: "Group Deleted Successfully"}))
    }).catch(err=>{dispatch(returnErrors(err.response.data,err.response.status))})
}