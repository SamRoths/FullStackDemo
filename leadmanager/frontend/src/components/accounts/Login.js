import React, { Component } from 'react'
import { Stack, Card, TextField, Button, CardContent, Typography, Link,FormControl,FilledInput,IconButton,InputAdornment,InputLabel,FormHelperText} from '@mui/material'
import PropTypes from 'prop-types';
import { Visibility,VisibilityOff } from '@mui/icons-material';

import {connect} from 'react-redux'
import { login } from '../../actions/auth';
import { Navigate } from 'react-router-dom';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        username:'',
        password:'',
        showPassword:false,
        usernameIsInvalid:false,
        passwordIsInvalid:false,
        usernameHelperText:"",
        passwordHelperText:""
    }
}

static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    error:PropTypes.object.isRequired
}

componentDidUpdate(prevProps){
  const error  = this.props.error
  let flags = {
    usernameIsInvalid:false,
    passwordIsInvalid:false,
    usernameHelperText:"",
    passwordHelperText:""
}
  if(error !== prevProps.error){
    if(error.msg.non_field_errors){
      flags = {
        ...flags,
        usernameIsInvalid:true,
        usernameHelperText:error.msg.non_field_errors,
        passwordIsInvalid:true,
        passwordHelperText:error.msg.non_field_errors
      }
    }
    if(error.msg.username){
      flags = {
        ...flags,
        usernameIsInvalid:true,
        usernameHelperText:error.msg.username
      }
    }
    if(error.msg.password){
      flags = {
        ...flags,
        passwordIsInvalid:true,
        passwordHelperText:error.msg.password
      }
    }
    
    this.setState({
      ...this.state,
      ...flags
    })
  }
}

handleClickShowPassword = () => {
  this.setState({
    ...this.state,
    showPassword:!this.state.showPassword
  })
};

handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


onChange = e => {
    this.setState({[e.target.name]:e.target.value})
};

onSubmit = e => {

    this.props.login(this.state.username,this.state.password)

    }
    

  render() {
    if(this.props.isAuthenticated){
      return <Navigate to="/"/>
    }
    return (
      <div style={{ 
        display: 'grid', 
        placeItems: 'center', 
        height: '100vh', 
        
    }}>
      <Card sx={{minWidth:350, maxWidth:750, width:'100%'}} elevation = {3}>
        <CardContent>
          
          <form>
            <Stack spacing = {2}>
            <Typography sx={{
              fontSize:35,
              fontWeight:200,
              fontFamily:"revert"

            }} align = "center" >Login</Typography>
              <TextField 
                    error={this.state.usernameIsInvalid}
                    name="username"
                    required
                    id="filled-required"
                    label = "Username"
                    placeholder = "Enter Your Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    helperText={this.state.usernameHelperText}
                />
                <FormControl  variant="filled">
                <InputLabel required htmlFor="filled-adornment-password">Password</InputLabel>
                  <FilledInput
                    error = {this.state.passwordIsInvalid}
                    helperText = {this.state.passwordHelperText}
                    label = "Password"
                    id="filled-adornment-password"
                    name="password"
                    placeholder="Enter Your Password"
                    required = {true}
                    value = {this.state.password}
                    onChange = {this.onChange}
                    type={this.state.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            this.state.showPassword ? 'hide the password' : 'display the password'
                          }
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          onMouseUp={this.handleMouseUpPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    
                  />
                  <FormHelperText error >{this.state.passwordHelperText}</FormHelperText>
                </FormControl>
                </Stack>
                <Stack spacing={1} sx={{paddingTop:2}}>
              
                
                <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
                <Typography variant='body2'>Don't have an Account? <a href="/#/register">Register Here</a></Typography>
                </Stack>

            
          </form>
        </CardContent>
      </Card>
      </div>
    )
  }
}


const mapStateToProps = state=>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.errors
})

export default connect(mapStateToProps,{login})(Login)
