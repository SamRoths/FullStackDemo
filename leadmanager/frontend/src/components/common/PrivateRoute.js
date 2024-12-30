import React from 'react'
import {Route, Navigate,redirect} from "react-router-dom"
import {connect} from "react-redux"
import PropTypes from 'prop-types'

const PrivateRoute = ({children, auth, afterLogin='/',...rest}) => {
    if(auth.isLoading){
        return <h2>Loading ...</h2>
    }else if(!auth.isAuthenticated){
        console.log("page after login: ",afterLogin)
        return <Navigate to="/login" state={{'nextPage':afterLogin}}/>
    }
    else{
        return children
    }
}
   


const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)