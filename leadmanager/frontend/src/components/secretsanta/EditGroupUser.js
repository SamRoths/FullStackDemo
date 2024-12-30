import { Paper,Typography,Card,CardContent,TextField,Button,Stack } from '@mui/material'
import React, { Component } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateGroupUser } from '../../actions/secretsanta';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

export class EditGroupUser extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            gift_preferences : '',
            error_gift_preferences: false,
            helperText_gift_preferences:''
        }
    }
    static propTypes = {
        userID:PropTypes.number.isRequired,
        error:PropTypes.object.isRequired,
        groups:PropTypes.array.isRequired,
        users:PropTypes.array.isRequired,
        updateGroupUser:PropTypes.func.isRequired,
        groupIndex:PropTypes.number.isRequired
    }

    componentDidMount(){
        let init_preferences = ''
        this.props.users.forEach(user => {
            if(user.user.id ==this.props.userID){
                init_preferences = user.gift_preferences
            }
        });
        this.setState({
            ...this.state,
            gift_preferences:init_preferences
        })
    }

    onChange = e => {
        if(e.target.value.length<=500){
            this.setState({
                [e.target.name]:e.target.value,
                error_gift_preferences: false,
                helperText_gift_preferences:`Character Limit: ${e.target.value.length}/500`
            })
        } else{
            this.setState({
                error_gift_preferences: true,
                helperText_gift_preferences:`Character Limit: 500/500`
            })
        }
    };


    onSubmit = e => {
        this.props.updateGroupUser(this.props.groups[this.props.groupIndex].id,
            {
                gift_preferences:this.state.gift_preferences
            }
        )
        
    }


  render() {
    return (
      <div>
        <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:25
          }} >Edit Gift Preferences for: {this.props.groups[this.props.groupIndex].name}</Typography>
        <Card>
            <CardContent>
                <Stack spacing ={3}>
            <Typography sx={{
                  fontSize:35,
                  fontFamily:"revert-layer",
                  fontWeight:200
    
                }} align = "center" >{this.props.user.username}</Typography>

                <form>
                    <Stack spacing={1}>
                    <TextField 
                            error={this.state.error_gift_preferences}
                            helperText={this.state.helperText_gift_preferences}
                            name="gift_preferences"
                            id="standard-multiline-flexible"
                            multiline
                            rows = {4}
                            label = "Gift Preferences"
                            placeholder = "No Preferences Given"
                            onChange={this.onChange}
                            value={this.state.gift_preferences}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                                },
                            }}
                        />
                    <Button startIcon={<CheckCircleIcon/>} variant="contained" onClick={this.onSubmit}>Confirm Edits</Button>
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

export default connect(mapStateToProps,{updateGroupUser}) (EditGroupUser)
