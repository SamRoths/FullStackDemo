import React, { Component } from 'react'
import UsersSidebar from './UsersSidebar'
import DisplayGroup from './DisplayGroup'
import { Paper, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import {connect} from  'react-redux'
import { createMessage } from '../../actions/messages'
import { getGroupMembers, getGroups, leaveGroup, removeGroupUser } from '../../actions/secretsanta'
import { DISPLAY_GROUP, DISPLAY_GROUP_USER, EDIT_GROUP, EDIT_GROUP_USER, INVITE_USER } from './states'
import DisplayUser from './DisplayUser'
import EditGroupUser from './EditGroupUser'
import EditGroup from './EditGroup'
import AdminPanel from './AdminPanel'
import InviteUser from './InviteUser'
import {Button} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export class GroupPage extends Component {
constructor(props){
    super(props);
    this.state = {
        display_state:DISPLAY_GROUP,
        isAdmin:false,
        leaveGroupDialogOpen:false
    }
}
    static propTypes = {
        error:PropTypes.object.isRequired,
        groups:PropTypes.array.isRequired,
        groupIndex:PropTypes.number.isRequired,
        userIndex:PropTypes.number.isRequired,
        users:PropTypes.array.isRequired,
        selfUserID: PropTypes.number.isRequired,
        initialState:PropTypes.string.isRequired,
        onSelectPage:PropTypes.func.isRequired,
        leaveGroup:PropTypes.func.isRequired


    }

    componentDidMount(){
        let tempIsAdmin = false
        this.props.users.forEach(groupUser => {
            if(groupUser.user.id === this.props.selfUserID){
                tempIsAdmin = groupUser.is_admin
            }
        });
        this.setState({
            ...this.state,
            isAdmin:tempIsAdmin
        })
    }

    switchToEditState = ()=>{
        this.props.onSelectPage({
          pageState : EDIT_GROUP,
          curr_group_index : this.props.groupIndex,
        })
    }

    

componentDidUpdate(prevProps){
    console.log("group page updated")
    if(this.state.display_state!=this.props.initialState){
        this.setState({
            ...this.state,
            display_state:this.props.initialState
        })
    }
    if(prevProps.users !=this.props.users){
        let tempIsAdmin = false
        this.props.users.forEach((groupUser) => {
            if(groupUser.user.id === this.props.selfUserID){
                //console.log("user found in group page")
                //console.log(groupUser)
                tempIsAdmin = groupUser.is_admin
            }
        });
        //console.log("tempIsAdmin: ",tempIsAdmin)
        this.setState({
            ...this.state,
            isAdmin:tempIsAdmin
        })
    }

    
}

handleClickOpenLeave=()=>{
    this.setState({
      ...this.state,
      leaveGroupDialogOpen:true
    })
  }
  handleClickCloseLeave=()=>{
    this.setState({
      ...this.state,
      leaveGroupDialogOpen:false
    })
  }
  handleRemoveUser=()=>{
    this.props.leaveGroup(
      this.props.groups[this.props.groupIndex].id,
      this.props.selfUserID
    )
    this.handleClickCloseLeave()
  }


displayPage(){
    switch(this.state.display_state){
        case(DISPLAY_GROUP):
            return <DisplayGroup groupIndex={this.props.groupIndex}/>
        case(DISPLAY_GROUP_USER):
            return (<div>
                        <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:30
                        }} >User Info:</Typography>
                        <Typography sx={{"fontFamily":"inherit"}}>Learn more information about a group member </Typography>
                        <DisplayUser onSelectEdit={this.handleState} userIndex={this.props.userIndex} groupIndex={this.props.groupIndex}/>
                    </div>)
        case(EDIT_GROUP_USER):
            return <EditGroupUser groupIndex={this.props.groupIndex}/>
        case(EDIT_GROUP):
            return <EditGroup groupIndex={this.props.groupIndex}/>
        case(INVITE_USER):
            return <InviteUser groupIndex={this.props.groupIndex}/>
        }

}

handleState = (newState)=>{
    this.props.onSelectPage(newState)
}

  render() {
    if(this.props.groupIndex<0){
        return(<h1>Display Groups</h1>)
    }
    return (
        <div>
        <Paper style={{padding:70,
            width:'80%',
            margin:'auto'
          }}>
            
          
          {this.displayPage()}
          {this.state.isAdmin?<AdminPanel groupID={this.props.groups[this.props.groupIndex].id} onSelectEditGroup = {this.switchToEditState}/>:
          
          <div>
            <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:40
            }} >Admin Panel:</Typography>
            <Typography sx={{"fontFamily":"inherit"}}>
                User Must be a group admin to modify group information.
            </Typography>
          </div>}
          <div style={{display: 'flex', 'justifyContent': 'flex-end'}}>
            <Button onClick={this.handleClickOpenLeave}sx={{fontWeight:'bold', alignSelf:'right'}} color='error' variant='outlined' >Leave Group</Button>
          </div>
        </Paper>
        <Dialog
            open={this.state.leaveGroupDialogOpen}
            onClose={this.handleClickCloseLeave}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle>{`Are you sure you want to leave ${this.props.groups[this.props.groupIndex].name}?`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                After leaving a group you must be invited again to rejoin.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{fontWeight:'bold'}} variant="contained" color='error' onClick={this.handleClickCloseLeave}>Decline</Button>
                <Button sx={{fontWeight:'bold'}} variant="contained" onClick={this.handleRemoveUser}>Confirm</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
  }
}

const mapStateToProps = state=>({
    selfUserID:state.auth.user.id,
    error:state.errors,
    groups:state.ssgroups.groups,
    users: state.ssgroups.users,


  })
  
  export default connect(mapStateToProps,{getGroups, createMessage,leaveGroup})(GroupPage)