import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';
import Stack from '@mui/material/Stack';

export class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            message:''
        }
    }

    static propTypes = {
        addLead: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    };

    onSubmit = e => {
        
        const lead = {
            name:this.state.name,
            email:this.state.email,
            message:this.state.message
        } 
        //console.log("submitting lead",lead)
        this.props.addLead(lead)
        this.setState({
            name:'',
            email:'',
            message:''
        })
    }

  render() {

    return (
      <div className= "card card-body mt-4 mb-4">
        <h1>Add Form</h1>
        <form onSubmit={this.onSubmit}>
            <Stack spacing={2}>

            <TextField 
                name="name"
                required
                id="outlined-required"
                label = "Name"
                placeholder = "Enter Your Name"
                onChange={this.onChange}
                value={this.state.name}
            />

            <TextField 
                name="email"
                required
                id="outlined-required"
                label = "Email"
                placeholder = "Enter Your Email"
                onChange = {this.onChange}
                value={this.state.email}
            />

            <TextField 
                name="message"
                id="outlined-required"
                label = "Message"
                placeholder = "Write a message here"
                multiline
                onChange = {this.onChange}
                value={this.state.message}
            />
            <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
            </Stack>
        </form>
      </div>
    )
  }
}

export default connect(null,{addLead})(Form)
