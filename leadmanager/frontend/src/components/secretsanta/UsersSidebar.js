import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getGroupMembers, getGroups } from '../../actions/secretsanta';
import { Button, Dialog, Drawer, Stack, Toolbar,Divider,List,ListItem,ListItemIcon,ListItemText,ListItemButton, ListSubheader,DialogActions } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, Navigate } from 'react-router-dom';
import { CREATE_GROUP_FORM, DISPLAY_GROUP, DISPLAY_GROUP_USER, INVITE_USER } from './states';
import InviteUser from './InviteUser';

export class UsersSidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      inviteUserDialogOpen:false
    }
  }
    static propTypes={
        getGroupMembers: PropTypes.func.isRequired,
        users:PropTypes.array.isRequired,
        groups:PropTypes.array.isRequired,
        groupIndex: PropTypes.number.isRequired,
        onSelectPage:PropTypes.func.isRequired
    }
    componentDidMount(){
      if(this.props.groups[this.props.groupIndex]){
        this.props.getGroupMembers(this.props.groups[this.props.groupIndex].id);
      }

    }

    componentDidUpdate(prevProps){
      if(this.props.groups!=prevProps.groups || this.props.groupIndex!=prevProps.groupIndex){
        if(this.props.groups[this.props.groupIndex]){
          this.props.getGroupMembers(this.props.groups[this.props.groupIndex].id);
        }
      }
      

    }

    handleOpenInviteDialog =()=>{
      this.setState({
        ...this.state,
        inviteUserDialogOpen:true
      })
    }
    handleCloseInviteDialog =()=>{
      this.setState({
        ...this.state,
        inviteUserDialogOpen:false
      })
    }

    handleSelectInvite = () =>{
        this.props.onSelectPage({
          pageState:INVITE_USER
        })
    }

    handleSelectViewUser = (index) =>{
        console.log("going to display user #",index)
        this.props.onSelectPage({
          pageState: DISPLAY_GROUP_USER,
          curr_user_index:index
        })
    }
    
  render() {
    const drawerWidth = '15%'
    return (
      <div>
      <Drawer 
      variant='permanent'
      anchor='right'
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        
      }}
      open>
        <div>
      <Toolbar />
      <Divider />
      <List >
        <ListSubheader>Group Members</ListSubheader>
        {this.props.users.map((user, index) => (
          <ListItem key={user.id} >
            <ListItemButton onClick={()=>{this.handleSelectViewUser(index)}}>
              <ListItemIcon>
                <PersonIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary={user.user.username} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem >
        <ListItemButton onClick={this.handleOpenInviteDialog}>
          <ListItemIcon>
            <AddCircleIcon color="success"/>
          </ListItemIcon>
          <ListItemText >Invite New Member</ListItemText>
        </ListItemButton>
      </ListItem>
      
    </div>
      </Drawer>
      <Dialog
                open={this.state.inviteUserDialogOpen}
                onClose={this.handleCloseInviteDialog}
                fullWidth
              >
          <DialogActions >
            <Button sx={{fontWeight:'bold'}} variant="contained" color='error' size='sm' onClick={this.handleCloseInviteDialog}><CloseIcon/></Button>
          </DialogActions>
          <InviteUser groupIndex={this.props.groupIndex}/>
      </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state=>({
    users: state.ssgroups.users
})

export default connect(mapStateToProps,{getGroupMembers})(UsersSidebar);

