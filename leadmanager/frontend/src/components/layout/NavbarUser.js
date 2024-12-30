import { Box, Stack } from '@mui/material';
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Tooltip,IconButton,Avatar,Menu,MenuItem,Link,Button,Typography} from '@mui/material';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

export class NavbarUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            anchorElUser:null
        }
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout:PropTypes.func.isRequired
    }
    settings = [
        {
            name:"View Profile",
            link: "/"
        },
        {
            name:"Settings",
            link: "/"
        },

        
    ]
    handleOpenUserMenu=(event)=>{
        this.setState({
            ...this.state,
            anchorElUser : event.currentTarget
        })
    }

    handleCloseUserMenu=()=>{
        this.setState({
            ...this.state,
            anchorElUser : null
        })
    }

    handleClickLogin = ()=>{
        document.location.href = '/#/login'
    }

    handleClickRegister = ()=>{
        document.location.href = '/#/register'
    }

  render() {
    if(this.props.auth.isAuthenticated){
        return(
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={this.props.auth.user.username} src="http://localhost:8000/media/images/IMG_6876.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(this.state.anchorElUser)}
              onClose={this.handleCloseUserMenu}
            >
              {this.settings.map((setting) => (
                <MenuItem key={setting.name} onClick={this.handleCloseUserMenu}>
                  <Link className="nav-link" color="inherit" underline="none" to={setting.link} sx={{ textAlign: 'center' }}>{setting.name}</Link>
                </MenuItem>
              ))}
              <MenuItem onClick = {this.props.logout}>
                <Typography variant="inherit">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )
    }else{
        return(
            <Box sx={{flexGrow:0}}>
                <Stack direction='row' spacing={1}>
                <Button variant="contained" sx={{ boxShadow: 0 }} onClick={this.handleClickLogin}><Link to="/#/login"  underline="none" color ="inherit">Login</Link></Button>
                <Button variant="contained" sx={{ boxShadow: 0 }} onClick={this.handleClickRegister}><Link to="/#/register"  underline="none" color="inherit">Register</Link></Button>
                </Stack>
            </Box>
        );
    }
    
  }
}
const mapStateToProps = state=>({
    auth:state.auth
  })
  
  export default connect(mapStateToProps,{logout})(NavbarUser)