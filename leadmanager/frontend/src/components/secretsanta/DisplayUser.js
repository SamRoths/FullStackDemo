import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMessage } from '../../actions/messages'
import { Typography,Card, CardContent, Stack, TextField, Button } from '@mui/material'
import { EDIT_GROUP_USER } from './states'
import { promoteGroupUser, removeGroupUser } from '../../actions/secretsanta'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export class DisplayUser extends Component {
    constructor(props){
        super(props);

        this.state = {
          groupUser: {
            group: {
              id: '',
              name: '',
              description: '',
              created_at: '2024-12-03T00:21:03.222752Z',
              recommended_price_min: 0,
              recommended_price_max: 0,
              members: []
            },
            user: {
              id: 0,
              username: '',
              email: '',
              first_name: '',
              last_name: ''
            },
            is_admin: true,
            join_date: '',
            giftee: null,
            gift_preferences: ''
          },
          selfUser:{
            group: {
              id: '',
              name: '',
              description: '',
              created_at: '2024-12-03T00:21:03.222752Z',
              recommended_price_min: 0,
              recommended_price_max: 0,
              members: []
            },
            user: {
              id: 0,
              username: '',
              email: '',
              first_name: '',
              last_name: ''
            },
            is_admin: true,
            join_date: '',
            giftee: null,
            gift_preferences: ''
          },
          displayMode:true,
          removeUserDialogOpen:false,
          promoteUserDialogOpen:false
        }
    }

    static propTypes = {
        createMessage:PropTypes.func.isRequired,
        error:PropTypes.object.isRequired,
        users:PropTypes.array.isRequired,
        selfUserID: PropTypes.number.isRequired,
        userIndex:PropTypes.number.isRequired,
        onSelectEdit:PropTypes.func.isRequired,
        groupIndex:PropTypes.number.isRequired

    }
    
    getSelfUser(){
      let selfUser = null
      this.props.users.forEach(groupUser => {
        if(groupUser.user.id ===this.props.selfUserID){
          selfUser = groupUser
        }
      });
      return selfUser
    }

    componentDidMount(){

        this.setState({
          ...this.state,
          groupUser: this.props.users[this.props.userIndex],
          selfUser:this.getSelfUser()
        })

    }

    componentDidUpdate(prevProps){
      if (prevProps.users!==this.props.users || prevProps.userIndex!== this.props.userIndex){
        this.setState({
          ...this.state,
          groupUser: this.props.users[this.props.userIndex],
          selfUser:this.getSelfUser()
        })
      }

    }

    handleEditPreferences = ()=>{
      this.props.onSelectEdit({
        pageState: EDIT_GROUP_USER
      })
    }

    editButton=()=>{
      if(this.state.groupUser.user.id == this.props.selfUserID){
        return(
          <Button variant="contained" onClick={this.handleEditPreferences}>Edit Gift Preferences</Button>
        )
      }
      return(<div></div>)
    }

    handleClickClosePromote=()=>{
      this.setState({
        ...this.state,
        promoteUserDialogOpen:false
      })
    }
    handleClickOpenPromote=()=>{
      this.setState({
        ...this.state,
        promoteUserDialogOpen:true
      })
    }
    handleClickCloseRemove=()=>{
      this.setState({
        ...this.state,
        removeUserDialogOpen:false
      })
    }
    handleClickOpenRemove=()=>{
      this.setState({
        ...this.state,
        removeUserDialogOpen:true
      })
    }
    handlePromoteUser=()=>{
      this.props.promoteGroupUser(
        this.props.groups[this.props.groupIndex].id,
        this.state.groupUser.user.id
      )
      this.handleClickClosePromote()
    }
    handleRemoveUser=()=>{
      this.props.removeGroupUser(
        this.props.groups[this.props.groupIndex].id,
        this.state.groupUser.user.id
      )
      this.handleClickCloseRemove()
    }

    adminOptions=()=>{
      console.log("group index: ",this.props.groupIndex)
      console.log("selfUser is admin: ", this.state.selfUser.is_admin)
      console.log("groupUser is admin: ",this.state.groupUser.is_admin)
      if(this.props.groupIndex !== undefined&&this.state.selfUser.is_admin&& !this.state.groupUser.is_admin){
        return(
        <div>
          <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:25
          }} >Management Options:</Typography>
          <Typography sx={{"fontFamily":"inherit"}} fontSize={16}>Manage User's status in the group </Typography>
          <Stack sx={{marginTop:3}} direction='row' spacing={3}>
            <Button fullWidth variant='contained' onClick={this.handleClickOpenPromote}>Promote to Admin</Button>
            <Button fullWidth variant = 'contained' color='error' onClick={this.handleClickOpenRemove}>Kick From Group</Button> 
          </Stack>
        </div>)
      }

    }

  render() {
    return (
        <div>
          <Card elevation={0}>
            <CardContent>
            <form>
                <Stack spacing = {2}>
                  <div>
                    <Typography sx={{
                    fontSize:35,
                    fontFamily:"revert-layer",
                    fontWeight:200
        
                    }} align = "center" >{this.state.groupUser.user.username}</Typography>
                    <Typography sx={{
                    fontSize:14,
                    color:'GrayText'
        
                    }} align = "center" >Joined Group: {new Date(this.state.groupUser.join_date).toDateString()}</Typography>
                  </div>
                  
                    <TextField 
                        name="fullname"
                        label = "Name"
                        placeholder = "Name"
                        onChange={this.onChange}
                        value={this.state.groupUser.user.first_name.concat(" ",this.state.groupUser.user.last_name)}
                        disabled={this.state.displayMode}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                    />
                    <TextField 
                        name="email"
                        label = "Email"
                        placeholder = "Email"
                        onChange={this.onChange}
                        value={this.state.groupUser.user.email}
                        disabled={this.state.displayMode}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                    />
                    <TextField 
                        name="giftpreferences"
                        id="standard-multiline-flexible"
                        multiline
                        rows = {4}
                        label = "Gift Preferences"
                        placeholder = "No Preferences Given"
                        onChange={this.onChange}
                        value={this.state.groupUser.gift_preferences}
                        disabled={this.state.displayMode}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                    />
                    {this.editButton()}
                    {this.adminOptions()}
                </Stack>
            </form>
            </CardContent>
          </Card>
          <Dialog
                open={this.state.promoteUserDialogOpen}
                onClose={this.handleClickClosePromote}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Are you sure you want to promote this User to Admin?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Promoting a user to be an admin grants them the ability to reassign Secret Santas, Kick Users, and modify the group information. This Action cannot be reversed.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color='error' onClick={this.handleClickClosePromote}>Decline</Button>
                  <Button variant="contained" onClick={this.handlePromoteUser}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={this.state.removeUserDialogOpen}
                onClose={this.handleClickCloseRemove}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Are you sure you want to kick this user from the group?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Kicking a user will remove them from the group and leave their secret santa with no one to gift.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button sx={{fontWeight:'bold'}} variant="contained" color='error' onClick={this.handleClickCloseRemove}>Decline</Button>
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
    users: state.ssgroups.users,
    groups: state.ssgroups.groups
  })

export default connect(mapStateToProps,{createMessage,removeGroupUser,promoteGroupUser}) (DisplayUser)
