import React, {Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'

import ResponsiveAppBar from './layout/header'
import Dashboard from './leads/Dashboard';

import { Provider } from 'react-redux';
import store from '../store';

import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';
import Login from "./accounts/Login";
import Register from './accounts/Register';

import {HashRouter as Router, Route,Routes, Redirect} from "react-router-dom"

import PrivateRoute from './common/PrivateRoute';

import { loadUser } from '../actions/auth';


//alert options
const alertOption = {
    timeout:10000,
    position: 'top center'
}



class App extends Component{
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store = {store}>
                <AlertProvider template={AlertTemplate} {...alertOption}>
                    <Router>
                    <Fragment>
                        <ResponsiveAppBar/>
                        <Alerts/>
                        <div className = "container">
                            <Routes>
                                <Route exact path ="/" element = {<PrivateRoute><Dashboard/></PrivateRoute>}/>
                                <Route exact path="/register" element={<Register/>}/>
                                <Route exact path="/login" element={<Login/>}/>
                            </Routes>
                        </div>
                    </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
            
        )
    }
}

const domNode = document.getElementById('app')
const root = createRoot(domNode);
root.render(<App/>)

