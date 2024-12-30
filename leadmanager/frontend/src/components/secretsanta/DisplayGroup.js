import React, { Component } from 'react'
import { Stack, Card, TextField, Button, CardContent, Typography, IconButton,InputAdornment,InputLabel,OutlinedInput,FilledInput, FormControl, FormHelperText, Input, Paper} from '@mui/material'
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/auth';
import {connect} from 'react-redux'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { createMessage } from '../../actions/messages';
import { Navigate } from 'react-router-dom';
import { createGroup, getGroupMembers, getGroups } from '../../actions/secretsanta';
import { DISPLAY_GROUP, EDIT_GROUP } from './states';
import UsersSidebar from './UsersSidebar';
import AdminPanel from './AdminPanel';
import DisplayUser from './DisplayUser';

export class DisplayGroup extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            name:'',
            description: '',
            minPrice: 0,
            maxPrice: 0,
            displayMode:true,
            isAdmin:false
        }

    }
    
    static propTypes = {
        createMessage:PropTypes.func.isRequired,
        error:PropTypes.object.isRequired,
        groups:PropTypes.array.isRequired,
        groupIndex:PropTypes.number.isRequired,
        users:PropTypes.array.isRequired,
        userID: PropTypes.number.isRequired,

    }


    
    componentDidUpdate(prevProps){
      const error  = this.props.error
      let flags = {
        nameIsInvalid:false,
        descriptionIsInvalid:false,
        minPriceIsInvalid:false,
        maxPrice2IsInvalid:false,
        nameHelperText:"",
        descriptionHelperText:"",
        minPriceHelperText:"",
        maxPrice2HelperText:"",
      }
      if(prevProps.error!==error){
      if(error.msg.name){
        flags = {
          ...flags,
          nameIsInvalid:true,
          nameHelperText:error.msg.name
        }
      }
      if(error.msg.description){
        flags = {
          ...flags,
          descriptionIsInvalid:true,
          descriptionHelperText:error.msg.description
        }
      }
      if(error.msg.minPrice){
        flags = {
          ...flags,
          minPriceIsInvalid:true,
          minPriceHelperText:error.msg.minPrice,
        }
      }
      if(error.msg.maxPrice){
        flags = {
          ...flags,
          maxPriceIsInvalid:true,
          maxPriceHelperText:error.msg.maxPrice,
        }
      }
      this.setState({
        ...this.state,
        ...flags
      })
      }
      if(prevProps.users!=this.props.users){
        let userIsAdmin = false
          this.props.users.forEach((groupUser)=>{
              if(groupUser.user.id == this.props.userID){
                console.log("user found")
                  userIsAdmin = groupUser.is_admin
              }
          })
          console.log('user is admin',userIsAdmin)
        this.setState({
          ...this.state,
          isAdmin:userIsAdmin
        })
    }
    }
    
    
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    };
    
    onSubmit = e => {
        if(this.state.minPrice <= this.state.maxPrice){
            const group = {
              name:this.state.name,
              description:this.state.description,
              recommended_price_min:this.state.minPrice*100,
              recommended_price_max:this.state.maxPrice*100
          } 
          this.props.createGroup(group)
    
        } else{
          this.props.createMessage({
            inconsistentPriceRange:"Max Price Must Be Greater than or equal to Min Price"
          })
          this.setState({
            ...this.state,
            minPriceIsInvalid:true,
            minPriceHelperText:"Max Price Must Be Greater than or equal to Min Price",
            maxPriceIsInvalid:true,
            maxPriceHelperText:"Max Price Must Be Greater than or equal to Min Price"
          })
        }
        
    }

    handleClick = ()=>{
      this.setState({
        ...this.state,
        maxPriceIsInvalid:true,
        maxPriceHelperText:"why you click on me"
      })
    }

    displayGiftee(){
      let selfUser = null
      for(let i=0;i<this.props.users.length;i++){
        const groupUser = this.props.users[i]
        if(groupUser.user.id == this.props.userID){
          console.log("user found: ", groupUser)
            selfUser = groupUser
        }
      }
      
      if (selfUser){
          if(selfUser.giftee){
            let giftee_index=-1
            console.log("entered display giftee")
            for(let i=0;i<this.props.users.length;i++){
              const groupUser = this.props.users[i]
              if(groupUser.user.id == selfUser.giftee.id){
                console.log("giftee found: ", i)
                  giftee_index = i
              }
            }
            return (
              <div>
                <Typography sx={{"fontFamily":"inherit"}}>Information about the person you must get a present for.</Typography>
                <DisplayUser onSelectEdit={()=>{}} userIndex={giftee_index}/>
              </div>
            )
          }
          else{
            return(
              <Typography sx={{"fontFamily":"inherit"}}>Your secret santa giftee has not yet been assigned </Typography>
            )
          }
      }
      else{
        return(<Typography sx={{"fontFamily":"inherit"}}>Error: Your Group Profile could not be found</Typography>)
      }
    }

    

    
      render() {

        if(this.props.groupIndex<0){
            return(<h1>Display Groups</h1>)
        }

        

        return (
        <div>

          <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:30
          }} >Group Info:</Typography>
          <Typography sx={{"fontFamily":"inherit"}}>Find logistical information about your secret santa group </Typography>
          <Card 
            sx={{
                minWidth:350,
                maxWidth:750,
                margin:'auto',
                marginTop:5
            }}
            
            elevation = {0}>
            <CardContent>
              
              <form>
                <Stack spacing = {2}>
                <Typography sx={{
                  fontSize:35,
                  fontFamily:"revert-layer",
                  fontWeight:200
    
                }} align = "center" >{this.props.groups[this.props.groupIndex].name}</Typography>

                    <TextField 
                        error={this.state.descriptionIsInvalid}
                        helperText={this.state.descriptionHelperText}
                        name="description"
                        id="standard-multiline-flexible"
                        multiline
                        rows = {4}
                        label = "Description"
                        placeholder = "No Description Found"
                        onChange={this.onChange}
                        value={this.props.groups[this.props.groupIndex].description}
                        disabled={this.state.displayMode}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                    />
                    <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel  htmlFor="standard-adornment-min-price">Minimum Gift Price</InputLabel>
                      <Input
                        error = {this.state.minPriceIsInvalid}
                        helperText = {this.state.minPriceHelperText}
                        label = "Minimum Gift Price"
                        id="standard-adornment-min-price"
                        name="minPrice"
                        placeholder="Unspecified"
                        required = {false}
                        value = {this.props.groups[this.props.groupIndex].recommended_price_min/100}
                        type="number"
                        inputProps={{
                        step: 0.01,
                        }}
                        onChange = {this.onChange}
                        startAdornment={
                          <InputAdornment position="start">
                            $
                          </InputAdornment>
                        }
                        disabled={this.state.displayMode}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                        
                      />
                      <FormHelperText error >{this.state.minPriceHelperText}</FormHelperText>
                    </FormControl>
                    
                    <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel  htmlFor="standard-adornment-max-price">Maximum Gift Price</InputLabel>
                      <Input
                        error = {this.state.maxPriceIsInvalid}
                        helperText = {this.state.maxPriceHelperText}
                        label = "Maximum Gift Price"
                        id="standard-adornment-max-price"
                        name="maxPrice"
                        placeholder="Unspecified"
                        required = {false}
                        value = {this.props.groups[this.props.groupIndex].recommended_price_max/100}
                        type="number"
                        inputProps={{
                        step: 0.01,
                        }}
                        onChange = {this.onChange}
                        startAdornment={
                          <InputAdornment position="start">
                            $
                          </InputAdornment>
                        }
                        
                        disabled={this.state.displayMode}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                        
                      />
                      <FormHelperText error >{this.state.maxPriceHelperText}</FormHelperText>
                    </FormControl>
                 
                    </Stack>
                    
                          
                
              </form>
            </CardContent>
          </Card>
          <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:30
          }} >Giftee:</Typography>
          
          {this.displayGiftee()}
          </div>
        )
      }
    }
    
    const mapStateToProps = state=>({
      userID:state.auth.user.id,
      error:state.errors,
      groups:state.ssgroups.groups,
      users: state.ssgroups.users
    })
    
    export default connect(mapStateToProps,{ createMessage})(DisplayGroup)
    