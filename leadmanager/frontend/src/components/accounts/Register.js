import React, { Component } from 'react'
import { Stack, Card, TextField, Button, CardContent, Typography, IconButton,InputAdornment,InputLabel,OutlinedInput,FilledInput, FormControl, FormHelperText, ThemeProvider, createTheme} from '@mui/material'
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/auth';
import {connect} from 'react-redux'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createMessage } from '../../actions/messages';
import { Navigate } from 'react-router-dom';



export class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
        username:'',
        email:'',
        password:'',
        password2:'',
        showPassword:false,
        usernameIsInvalid:false,
        emailIsInvalid:false,
        passwordIsInvalid:false,
        password2IsInvalid:false,
        usernameHelperText:"",
        emailHelperText:"",
        passwordHelperText:"",
        password2HelperText:"",
    }
}

static propTypes = {
    registerUser: PropTypes.func.isRequired,
    createMessage:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired
}


componentDidUpdate(prevProps){
  const error  = this.props.error
  let flags = {
    usernameIsInvalid:false,
    emailIsInvalid:false,
    passwordIsInvalid:false,
    password2IsInvalid:false,
    usernameHelperText:"",
    emailHelperText:"",
    passwordHelperText:"",
    password2HelperText:"",
  }
  if(prevProps.error!==error){
  if(error.msg.username){
    flags = {
      ...flags,
      usernameIsInvalid:true,
      usernameHelperText:error.msg.username
    }
  }
  if(error.msg.email){
    flags = {
      ...flags,
      emailIsInvalid:true,
      emailHelperText:error.msg.email
    }
  }
  if(error.msg.password){
    flags = {
      ...flags,
      passwordIsInvalid:true,
      passwordHelperText:error.msg.password,
      password2IsInvalid:true,
      password2HelperText:error.msg.password
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
    if(this.state.password == this.state.password2){
        const user = {
          username:this.state.username,
          email:this.state.email,
          password:this.state.password
      } 
      this.props.registerUser(user)

    } else{
      this.props.createMessage({
        passwordsNotMatch:"Passwords Do Not Match"
      })
      this.setState({
        ...this.state,
        passwordIsInvalid:true,
        passwordHelperText:"Passwords Must Match",
        password2IsInvalid:true,
        password2HelperText:"Passwords Must Match"
      })
    }
    
}

  render() {
    if(this.props.isAuthenticated){
      return(<Navigate to='/'/>)
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
              fontFamily:"revert-layer",
              fontWeight:200

            }} align = "center" >Register</Typography>
              <TextField 
                    error={this.state.usernameIsInvalid}
                    helperText={this.state.usernameHelperText}
                    name="username"
                    required
                    id="filled-required"
                    label = "Username"
                    placeholder = "Enter Your Username"
                    onChange={this.onChange}
                    value={this.state.username}
                />
                <TextField 
                    error={this.state.emailIsInvalid}
                    helperText={this.state.emailHelperText}
                    name="email"
                    id="filled-required"
                    label = "Email"
                    placeholder = "Enter Your Email"
                    onChange={this.onChange}
                    value={this.state.email}
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
                <FormControl  variant="filled">
                <InputLabel required htmlFor="filled-adornment-password2">Confirm Password</InputLabel>
                  <FilledInput
                    error = {this.state.password2IsInvalid}
                    helperText = {this.state.password2HelperText}
                    label = "Confirm Password"
                    id="filled-adornment-password2"
                    name="password2"
                    placeholder="Confirm Your Password"
                    required = {true}
                    value = {this.state.password2}
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
                  <FormHelperText error >{this.state.password2HelperText}</FormHelperText>
                </FormControl>
                </Stack>
                <Stack spacing={1}>
              
                
                <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
                <Typography variant='body2'>Already have an Account? <a href="/#/login">Login Here</a></Typography>
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

export default connect(mapStateToProps,{registerUser, createMessage})(Register)
