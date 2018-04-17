import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from './Page/Login/Login'
import HomePage from './Page/HomePage/index'

class App extends Component {
    render() {



        return (
            <Router>
                <Switch>
                    <Route exact name={'Login'} path={'/'} component={Login}/>
                    <Route name={'HomePage'} path={'/homePage'} component={HomePage}/>
                    <Redirect from="/login" to="/"/>
                </Switch>
            </Router>
        );
    }
}

export default App;