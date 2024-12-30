import React, { Component } from 'react'
import { Stack, Card, TextField, Button, CardContent, Typography, IconButton,InputAdornment,InputLabel,OutlinedInput,FilledInput, FormControl, FormHelperText, ThemeProvider, createTheme} from '@mui/material'
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/auth';
import {connect} from 'react-redux'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createMessage } from '../../actions/messages';
import { Navigate } from 'react-router-dom';
import { createGroup } from '../../actions/secretsanta';
import { DISPLAY_GROUP } from './states';

export class CreateGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            description: '',
            minPrice: 0,
            maxPrice: 0
        }
    }
    
    static propTypes = {
        createGroup: PropTypes.func.isRequired,
        createMessage:PropTypes.func.isRequired,
        error:PropTypes.object.isRequired,
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
    }
    
    
    
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    };
    
    onSubmit = e => {
      console.log(this.state)
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

    
      render() {

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
    
                }} align = "center" >Create A Group</Typography>
                  <TextField 
                        error={this.state.nameIsInvalid}
                        helperText={this.state.nameHelperText}
                        name="name"
                        required
                        id="filled-required"
                        label = "Group Name"
                        placeholder = "Enter Your Group's Name"
                        onChange={this.onChange}
                        value={this.state.name}
                    />
                    <TextField 
                        error={this.state.descriptionIsInvalid}
                        helperText={this.state.descriptionHelperText}
                        name="description"
                        id="standard-multiline-flexible"
                        multiline
                        rows = {4}
                        label = "Description"
                        placeholder = "Describe your Group"
                        onChange={this.onChange}
                        value={this.state.description}
                    />
                    <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel required htmlFor="standard-adornment-min-price">Minimum Gift Price</InputLabel>
                      <FilledInput
                        error = {this.state.minPriceIsInvalid}
                        helperText = {this.state.minPriceHelperText}
                        label = "Minimum Gift Price"
                        id="standard-adornment-min-price"
                        name="minPrice"
                        placeholder="Enter an Amount"
                        required = {false}
                        value = {this.state.minPrice}
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
                        
                      />
                      <FormHelperText error >{this.state.minPriceHelperText}</FormHelperText>
                    </FormControl>
                    <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel required htmlFor="standard-adornment-max-price">Maximum Gift Price</InputLabel>
                      <FilledInput
                        error = {this.state.maxPriceIsInvalid}
                        helperText = {this.state.maxPriceHelperText}
                        label = "Maximum Gift Price"
                        id="standard-adornment-max-price"
                        name="maxPrice"
                        placeholder="Enter an Amount"
                        required = {false}
                        value = {this.state.maxPrice}
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
                        
                      />
                      <FormHelperText error >{this.state.maxPriceHelperText}</FormHelperText>
                    </FormControl>
                    </Stack>
                    <Stack spacing={1}>
                    <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
                    </Stack>
              </form>
            </CardContent>
          </Card>
          </div>
        )
      }
    }
    
    const mapStateToProps = state=>({
      error:state.errors
    })
    
    export default connect(mapStateToProps,{createGroup, createMessage})(CreateGroup)
    