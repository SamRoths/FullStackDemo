import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getGroupMembers, getGroups } from '../../actions/secretsanta';
import { Card, CardActionArea, Stack, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { Routes,Route } from 'react-router-dom';
import CreateGroup from './CreateGroup';
import PrivateRoute from '../common/PrivateRoute'
import { CREATE_GROUP_FORM,  DISPLAY_GROUP,DISPLAY_GROUP_USER,EDIT_GROUP,EDIT_GROUP_USER, INVITE_USER } from './states';
import DisplayGroup from './DisplayGroup';
import GroupPage from './GroupPage';
import UsersSidebar from './UsersSidebar';

export class SSHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageState : DISPLAY_GROUP,
            curr_group_index : -1,
            curr_user_index:0
        }
        
    }

    static propTypes={
        getGroups: PropTypes.func.isRequired,
        groups:PropTypes.array.isRequired,
        message:PropTypes.object.isRequired,
        getGroupMembers:PropTypes.object.isRequired
    }
    componentDidMount(){
        this.props.getGroups();
        
    }

    componentDidUpdate(prevProps){
        if(prevProps.groups.length != this.props.groups.length){
            this.setState({
                ... this.state,
                pageState:DISPLAY_GROUP,
                curr_group_index:0
            })
        }
        if(prevProps.message!=this.props.message){
            if(this.props.message.assignedSS||this.props.message.invitedUser||this.props.promotedGroupUser){
                this.props.getGroupMembers(this.props.groups[this.state.curr_group_index].id)
            }
            if(this.props.message.invitedUser){
                this.props.getGroupMembers(this.props.groups[this.state.curr_group_index].id)
            }
            if(this.props.message.updatedGroupUser){
                this.setState({
                    ...this.state,
                    pageState:DISPLAY_GROUP_USER
                })
            }
            if(this.props.message.updatedGroup){
                this.setState({
                    ...this.state,
                    pageState:DISPLAY_GROUP
                })
            }
            if(this.props.message.removedGroupUser){
                this.setState({
                    ...this.state,
                    curr_user_index:0
                })
                this.props.getGroupMembers(this.props.groups[this.state.curr_group_index].id)
            }
            if(this.props.message.leaveGroup || this.props.message.deletedGroup){
                this.props.getGroups()
                this.setState({
                    ...this.state,
                    pageState:DISPLAY_GROUP,
                    curr_group_index:0
                })
            }
        }
    }

    choosePage = () =>{
        switch(this.state.pageState) {
            case CREATE_GROUP_FORM:
              return (<CreateGroup />)
            case INVITE_USER:
            case EDIT_GROUP:  
            case DISPLAY_GROUP_USER:
            case EDIT_GROUP_USER:
            case DISPLAY_GROUP:
                console.log(this.props.groups)
              return (
              <div>
                <UsersSidebar onSelectPage={this.handleState} groups={this.props.groups} groupIndex = {this.state.curr_group_index}/>
                <GroupPage 
                    initialState = {this.state.pageState} 
                    groupIndex={this.state.curr_group_index}
                    userIndex={this.state.curr_user_index}
                    onSelectPage={this.handleState}
                />
              </div>
            )
            
            default:
              return <h1>State Not Recognized</h1>
          }

    }

    handleState = (newState)=>{
        this.setState({
            ...this.state,
            ...newState
        })
    }

    render(){
        return(
            <Fragment>
                <Sidebar onSelectPage={this.handleState}/>
                <div className = "container" >
                {this.choosePage()}
                </div>
            </Fragment>
            
        )
    }
}
const mapStateToProps = state=>({
    groups: state.ssgroups.groups,
    message:state.messages
})

export default connect(mapStateToProps,{getGroups,getGroupMembers})(SSHome);
