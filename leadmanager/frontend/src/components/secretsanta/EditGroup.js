import { Paper,Typography,Card,CardContent,TextField,Button,Stack,FormControl,InputLabel,FilledInput,InputAdornment,FormHelperText } from '@mui/material'
import React, { Component } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateGroup } from '../../actions/secretsanta';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';


export class EditGroup extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            description : '',
            recommended_price_min:0,
            recommended_price_max:0,
            error_description: false,
            helperText_description:'',
            error_name: false,
            helperText_name:'',
            error_recommended_price_max: false,
            helperText_recommended_price_max:'',
            error_recommended_price_min: false,
            helperText_recommended_price_min:'',
        }
    }
    static propTypes = {
        userID:PropTypes.number.isRequired,
        error:PropTypes.object.isRequired,
        groups:PropTypes.array.isRequired,
        updateGroup:PropTypes.func.isRequired,
        groupIndex:PropTypes.number.isRequired
    }

    componentDidUpdate(prevProps){
        const error  = this.props.error
        let flags = {
            error_description: false,
            helperText_description:'',
            error_name: false,
            helperText_name:'',
            error_recommended_price_max: false,
            helperText_recommended_price_max:'',
            error_recommended_price_min: false,
            helperText_recommended_price_min:'',
        }
        if(error !== prevProps.error){
          if(error.msg.non_field_errors){
            flags = {
                ...flags,
                error_description: true,
                helperText_description:error.msg.non_field_errors,
                error_name: true,
                helperText_name:error.msg.non_field_errors,
                error_recommended_price_max: true,
                helperText_recommended_price_max:error.msg.non_field_errors,
                error_recommended_price_min: true,
                helperText_recommended_price_min:error.msg.non_field_errors,
            }
          }
          if(error.msg.name){
            flags = {
              ...flags,
              error_name:true,
              helperText_name:error.msg.name
            }
          }
          if(error.msg.description){
            flags = {
              ...flags,
              error_description:true,
              helperText_description:error.msg.description
            }
          }
          if(error.msg.recommended_price_min){
            flags = {
              ...flags,
              error_recommended_price_min:true,
              helperText_recommended_price_min:error.msg.recommended_price_min
            }
          }
          if(error.msg.recommended_price_max){
            flags = {
              ...flags,
              error_recommended_price_max:true,
              helperText_recommended_price_max:error.msg.recommended_price_max
            }
          }
          
          this.setState({
            ...this.state,
            ...flags
          })
        }
      }

    componentDidMount(){
        const group = this.props.groups[this.props.groupIndex]
        let init_values = {
            description: group.description,
            name: group.name,
            recommended_price_min:group.recommended_price_min/100,
            recommended_price_max:group.recommended_price_max/100
        }
        
        this.setState({
            ...this.state,
            ...init_values
        })
    }

    onChange = e => {
        if(e.target.name === 'name'){
            if(e.target.value.length<=100){
                this.setState({
                    ... this.state,
                    [e.target.name]:e.target.value,
                    error_name: false,
                    helperText_name:`Character Limit: ${e.target.value.length}/500`
                })
            } else{
                this.setState({
                    ... this.state,
                    error_name: true,
                    helperText_name:`Character Limit: 100/100`
                })
            }
        }
        else if(e.target.name == 'description'){
            if(e.target.value.length<=500){
                this.setState({
                    ... this.state,
                    [e.target.name]:e.target.value,
                    error_description: false,
                    helperText_description:`Character Limit: ${e.target.value.length}/500`
                })
            } else{
                this.setState({
                    ... this.state,
                    error_description: true,
                    helperText_description:`Character Limit: 500/500`
                })
            }
        }
        else{
            this.setState({
                ...this.state,
                [e.target.name]:e.target.value
            })
        }
    };


    onSubmit = e => {
        if(this.state.recommended_price_min>this.state.recommended_price_max){
            this.setState({
                error_recommended_price_max:true,
                error_recommended_price_min:true,
                helperText_recommended_price_max: "Min Price must be less than Max",
                helperText_recommended_price_min: "Min Price must be less than Max"
            })
        }
        else{
            this.props.updateGroup(this.props.groups[this.props.groupIndex].id,
                {
                    description: this.state.description,
                    name: this.state.name,
                    recommended_price_min:this.state.recommended_price_min*100,
                    recommended_price_max:this.state.recommended_price_max*100
                }
            )
        }
        
    }

    


  render() {
    return (
      <div>
        <Typography sx ={{"fontFamily":'inherit', fontStyle:'inherit', fontWeight:'bold',fontSize:25
          }} >Edit Info: {this.props.groups[this.props.groupIndex].name}</Typography>
          <Typography sx={{"fontFamily":"inherit"}}>Update information about your secret santa group </Typography>
        <Card elevation={0}>
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
                        error={this.state.error_name}
                        helperText={this.state.helperText_name}
                        name="name"
                        required
                        id="filled-required"
                        label = "Group Name"
                        placeholder = "Enter Your Group's Name"
                        onChange={this.onChange}
                        value={this.state.name}
                    />
                    <TextField 
                            error={this.state.error_description}
                            helperText={this.state.helperText_description}
                            name="description"
                            id="standard-multiline-flexible"
                            multiline
                            rows = {4}
                            label = "Description"
                            placeholder = "Write a Description"
                            onChange={this.onChange}
                            value={this.state.description}
                            
                        />
                        <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel required htmlFor="standard-adornment-min-price">Minimum Gift Price</InputLabel>
                      <FilledInput
                        error = {this.state.error_recommended_price_min}
                        helperText = {this.state.helperText_recommended_price_min}
                        label = "Minimum Gift Price"
                        id="standard-adornment-min-price"
                        name="recommended_price_min"
                        placeholder="Enter an Amount"
                        required = {false}
                        value = {this.state.recommended_price_min}
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
                      <FormHelperText error >{this.state.helperText_recommended_price_min}</FormHelperText>
                    </FormControl>
                    <FormControl  fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel required htmlFor="standard-adornment-max-price">Maximum Gift Price</InputLabel>
                      <FilledInput
                        error = {this.state.error_recommended_price_max}
                        helperText = {this.state.helperText_recommended_price_max}
                        label = "Maximum Gift Price"
                        id="standard-adornment-max-price"
                        name="recommended_price_max"
                        placeholder="Enter an Amount"
                        required = {false}
                        value = {this.state.recommended_price_max}
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
                      <FormHelperText error >{this.state.helperText_recommended_price_max}</FormHelperText>
                    </FormControl>
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
    user:state.auth.user
})

export default connect(mapStateToProps,{updateGroup}) (EditGroup)
