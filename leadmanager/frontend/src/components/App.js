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

//alert options
const alertOption = {
    timeout:3000,
    position: 'top center'
}

class App extends Component{
    render() {
        return (
            <Provider store = {store}>
                <AlertProvider template={AlertTemplate} {...alertOption}>
                    <Fragment>
                        <ResponsiveAppBar/>
                        <Alerts/>
                        <div className = "container">
                            <Dashboard/>
                        </div>
                    </Fragment>
                </AlertProvider>
            </Provider>
            
        )
    }
}

const domNode = document.getElementById('app')
const root = createRoot(domNode);
root.render(<App/>)

