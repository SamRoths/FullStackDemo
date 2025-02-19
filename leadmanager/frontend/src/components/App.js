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
import Biography from './portfolio/Biography'
import {HashRouter as Router, Route,Routes, Redirect} from "react-router-dom"

import PrivateRoute from './common/PrivateRoute';
import ProjectsHome from './portfolio/ProjectsHome';

import { loadUser } from '../actions/auth';
import SSHome from './secretsanta/SSHome';
import LoginWrapper from './accounts/LoginWrapper';
import Climbingdetection from './portfolio/projectpages/Climbingdetection';
import Comfi from './portfolio/projectpages/Comfi';
import Imagegen from './portfolio/projectpages/Imagegen';
import Impulse from './portfolio/projectpages/Impulse';
import Kilterboard from './portfolio/projectpages/Kilterboard';
import Leadmanager from './portfolio/projectpages/Leadmanager';
import Seamline from './portfolio/projectpages/Seamline';
import Secretsanta from './portfolio/projectpages/Secretsanta';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssVarsProvider, extendTheme } from '@mui/joy';

//alert options
const alertOption = {
    timeout:10000,
    position: 'bottom center',
}

  // Custom Theme with Roboto Flex
const theme = extendTheme({
    fontFamily: {
      body: "Roboto Flex, sans-serif",
      display: "Roboto Flex, sans-serif",
      code: "monospace",
    },
  });


class App extends Component{
    componentDidMount(){
        store.dispatch(loadUser());
    }

    render() {
        return (
            <div >

            <Provider store = {store}>
                <AlertProvider  template={AlertTemplate} {...alertOption}>
                    <Router>
                    <Fragment>
                        <ResponsiveAppBar/>
                        <Alerts/>
                        <div>
                            <Routes>
                                <Route exact path ="/leads" element = {<PrivateRoute afterLogin='/leads'><Dashboard/></PrivateRoute>}/>
                                <Route exact path="/secretsanta" element={<PrivateRoute afterLogin='/secretsanta'><SSHome/></PrivateRoute>}/>
                                <Route exact path ='/projects' element = {<ProjectsHome/>}/>
                                <Route exact path="/register" element={<Register/>}/>
                                <Route exact path="/login" element={<LoginWrapper/>}/>

                                <Route exact path="/" element={<Biography/>}/>

                                <Route exact path ='/projects/climbing-detection' element = {<Climbingdetection/>}/>
                                <Route exact path ='/projects/comfi' element = {<Comfi/>}/>
                                <Route exact path ='/projects/image-gen' element = {<Imagegen/>}/>
                                <Route exact path ='/projects/impulse' element = {<Impulse/>}/>
                                <Route exact path ='/projects/kilterboard' element = {<Kilterboard/>}/>
                                <Route exact path ='/projects/leadmanager' element = {<Leadmanager/>}/>
                                <Route exact path ='/projects/seamline' element = {<Seamline/>}/>
                                <Route exact path ='/projects/secret-santa' element = {<Secretsanta/>}/>
                            </Routes>
                        </div>
                        
                    </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>

            </div>
            
        )
    }
}

const domNode = document.getElementById('app')
const root = createRoot(domNode);
root.render(<App/>)

