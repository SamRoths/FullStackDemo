import React, {Component,Fragment} from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'

import ResponsiveAppBar from './layout/header'
import Dashboard from './leads/Dashboard';

class App extends Component{
    render() {
        return (
            <Fragment>
                <ResponsiveAppBar/>
                <div className = "container">
                    <Dashboard/>
                </div>
            </Fragment>
            
        )
    }
}

const domNode = document.getElementById('app')
const root = createRoot(domNode);
root.render(<App/>)

