import { Button, Stack,Typography,Card,CardContent } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PropTypes from 'prop-types';

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { assignSecretSanta, deleteGroup } from '../../actions/secretsanta';

export class AdminPanel extends Component {

  constructor(props){
    super(props);
    this.state = {
      assignSSDialogOpen:false,
      deleteGroupDialogOpen:false
    }
  }

static propTypes = {
    onSelectEditGroup:PropTypes.func.isRequired,
    groupID:PropTypes.string.isRequired,
    assignSecretSanta:PropTypes.func.isRequired,
    deleteGroup:PropTypes.func.isRequired
}




  handleClickOpenSSDialog = () => {
    this.setState({
      ...this.state,
      assignSSDialogOpen:true
    });
  };

  handleClickCloseSSDialog = () => {
    this.setState({
      ...this.state,
      assignSSDialogOpen:false
    });
  };

  handleAssignSS = () =>{
    this.props.assignSecretSanta(this.props.groupID)
    this.handleClickCloseSSDialog()
  }

  handleClickOpenDeleteDialog = () => {
    this.setState({
      ...this.state,
      deleteGroupDialogOpen:true
    });
  };

  handleClickCloseDeleteDialog = () => {
    this.setState({
      ...this.state,
      deleteGroupDialogOpen:false
    });
  };

  handleDeleteGroup = () =>{
    this.props.deleteGroup(this.props.groupID)
    this.handleClickCloseDeleteDialog()
  }


selectEdit = ()=>{
  this.props.onSelectEditGroup()
}

  render() {
    return (
        <div >
            
  
            <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:30
            }} >Admin Panel:</Typography>
            <Typography sx={{"fontFamily":"inherit"}}>
                Make administrative decisions like assigning secret santas or 
                modifying group information. This is only accessable to group admins.
                </Typography>
            <Card 
              sx={{
                  minWidth:350,
                  maxWidth:750,
                  margin:'auto',
                  marginTop:5
              }}
              
              elevation = {0}>
              <CardContent>
                <Stack spacing={4}>
                    <div>
                        
                        <Button fullWidth onClick={this.handleClickOpenSSDialog}variant="contained" color='success' startIcon={<Diversity2Icon/>}>Assign New Secret Santas</Button>
                        <Typography color="textSecondary" fontSize={14}>Assign a new secret santa for every group memeber. This will override all previous pairings.</Typography>
                    </div>
                    <div>
                        
                        <Button fullWidth onClick={this.selectEdit} variant="contained" startIcon={<EditNoteIcon/>}>Edit Group Information</Button>
                        <Typography fontSize={14} color="textSecondary">Edit group information like recommended gift prices and description</Typography>
                    </div>
                    <div>
                        
                        <Button fullWidth color='error' onClick={this.handleClickOpenDeleteDialog} variant="contained" startIcon={<DeleteIcon/>}>Disband Group</Button>
                        <Typography fontSize={14} color="textSecondary">Delete Group for all member, cannot be recovered</Typography>
                    </div>
                </Stack>
              </CardContent>
            </Card>
            <Dialog
                open={this.state.assignSSDialogOpen}
                onClose={this.handleClickCloseSSDialog}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Are you sure you want to assign new secret santas?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Assigning new secret santas will change the assignments for everyone in the group and cannot be reversed.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button sx={{fontWeight:'bold'}} variant="contained" color='error' onClick={this.handleClickCloseSSDialog}>Decline</Button>
                  <Button sx={{fontWeight:'bold'}} variant="contained" onClick={this.handleAssignSS}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={this.state.deleteGroupDialogOpen}
                onClose={this.handleClickCloseDeleteDialog}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Are you sure you want to delete this secret santa group?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    This will delete the group for all members and cannot be recovered.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button sx={{fontWeight:'bold'}} variant="contained" color='error' onClick={this.handleClickCloseDeleteDialog}>Decline</Button>
                  <Button sx={{fontWeight:'bold'}} variant="contained" onClick={this.handleDeleteGroup}>Confirm</Button>
                </DialogActions>
            </Dialog>
            </div>
    )
  }
}

const mapStateToProps = state=>({


})

export default connect(mapStateToProps,{assignSecretSanta,deleteGroup})(AdminPanel)
