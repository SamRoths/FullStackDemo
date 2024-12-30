import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getGroups } from '../../actions/secretsanta';
import { Card, CardActionArea, Drawer, Stack, Toolbar,Divider,List,ListItem,ListItemIcon,ListItemText,ListItemButton, ListSubheader } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, Navigate } from 'react-router-dom';
import { CREATE_GROUP_FORM, DISPLAY_GROUP } from './states';

export class Sidebar extends Component {
    static propTypes={
        getGroups: PropTypes.func.isRequired,
        groups:PropTypes.array.isRequired,
        onSelectPage:PropTypes.func.isRequired
    }
    componentDidMount(){
        this.props.getGroups();
    }

    handleSelectCreateGroup = () =>{
        this.props.onSelectPage({pageState: CREATE_GROUP_FORM})
    }

    handleSelectViewGroup = (index) =>{
        console.log("going to display group #",index)
        this.props.onSelectPage({
          pageState: DISPLAY_GROUP,
          curr_group_index:index
        })
    }
    
  render() {
    const drawerWidth = '15%'
    return (
      <Drawer 
      variant='permanent'
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        
      }}
      open>
        <div>
      <Toolbar />
      <Divider />
      <List >
        <ListSubheader>Secret Santa Groups</ListSubheader>
        {this.props.groups.map((group, index) => (
          <ListItem key={group.id} >
            <ListItemButton onClick={()=>{this.handleSelectViewGroup(index)}}>
              <ListItemIcon>
                <Diversity3Icon color="primary"/>
              </ListItemIcon>
              <ListItemText primary={group.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem >
        <ListItemButton onClick={this.handleSelectCreateGroup}>
          <ListItemIcon>
            <AddCircleIcon color="success"/>
          </ListItemIcon>
          <ListItemText >Create New Group</ListItemText>
        </ListItemButton>
      </ListItem>
      
    </div>
      </Drawer>
    )
  }
}

const mapStateToProps = state=>({
    groups: state.ssgroups.groups
})

export default connect(mapStateToProps,{getGroups})(Sidebar);

