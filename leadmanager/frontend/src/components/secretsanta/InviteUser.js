import { Paper,Typography,Card,CardContent,TextField,Button,Stack } from '@mui/material'
import React, { Component } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { inviteUser, updateGroupUser } from '../../actions/secretsanta';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

export class InviteUser extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            username : '',
            error_username: false,
            helperText_username:''
        }
    }
    static propTypes = {
        userID:PropTypes.number.isRequired,
        error:PropTypes.object.isRequired,
        groups:PropTypes.array.isRequired,
        users:PropTypes.array.isRequired,
        inviteUser:PropTypes.func.isRequired,
        groupIndex:PropTypes.number.isRequired
    }


    onChange = e => {
        if(e.target.value.length<=100){
            this.setState({
                [e.target.name]:e.target.value,
                error_username: false,
                helperText_username:`Character Limit: ${e.target.value.length}/100`
            })
        } else{
            this.setState({
                error_username: true,
                helperText_username:`Character Limit: 100/100`
            })
        }
    };


    onSubmit = e => {
        this.props.inviteUser(
            {
                group:this.props.groups[this.props.groupIndex].id,
                username:this.state.username
            }
        )
        
    }

    componentDidUpdate(prevProps){
        const error  = this.props.error
        let flags = {
            error_username: false,
            helperText_username:'',

        }
        if(error !== prevProps.error){
          if(error.msg.non_field_errors){
            flags = {
                ...flags,
                error_username: true,
                helperText_username:error.msg.non_field_errors,
            }
          }
          if(error.msg.username){
            flags = {
              ...flags,
              error_username:true,
              helperText_username:error.msg.username
            }
          }
          
          this.setState({
            ...this.state,
            ...flags
          })
        }
      }


  render() {
    return (
      <div >

        <Card >
            <CardContent>
                <Stack spacing ={3}>
            <Typography sx={{
                  fontSize:35,
                  fontFamily:"revert-layer",
                  fontWeight:200
    
                }} align = "center" >Invite User</Typography>

                <form>
                    <Stack spacing={1}>
                    <TextField 
                            error={this.state.error_username}
                            helperText={this.state.helperText_username}
                            name="username"
                            id="standard-multiline-flexible"
                            label = "Username"
                            placeholder = "Enter their username"
                            onChange={this.onChange}
                            value={this.state.username}
                            
                        />
                    <Button startIcon={<PersonAddIcon/>} variant="contained" onClick={this.onSubmit}>Add User to Group</Button>
                    </Stack>
                </form>
                </Stack>
            </CardContent>
        </Card>
        
      </div>
    )
  }
}

const mapStateToProps= state=>({
    userID:state.auth.user.id,
    error:state.errors,
    groups:state.ssgroups.groups,
    users:state.ssgroups.users,
    user:state.auth.user
})

export default connect(mapStateToProps,{inviteUser}) (InviteUser)
