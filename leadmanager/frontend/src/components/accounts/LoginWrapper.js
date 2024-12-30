import React from 'react'
import Login from './Login'
import { useLocation } from 'react-router-dom'


export default function LoginWrapper(props) {
    const location = useLocation()
    return <Login location={location} {...props}/>
}
