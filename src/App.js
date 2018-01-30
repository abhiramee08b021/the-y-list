import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import Home from './Component/Home';
import About from './Component/About';
import Settings from './Component/Settings';
import RegistrationForm from './Component/Registration';
import LoginForm from './Component/Login';
import Navigation from './Component/Navigation'


class App extends Component {
  render() {
    return (
      <div>
          <Navigation/>
           {/**
                 *  route to diffrent component 
                 */}
         <Route exact={true} path={'/'} component={Home} />
         <Route exact={true} path={'/about'} component={About}/>
         <Route exact={true} path={'/settings'} component={Settings}/>
         <Route exact={true} path={'/login'} component={LoginForm}/>
         <Route exact={true} path={'/registration'} component={RegistrationForm}/>
      </div>
    );
  }
}

export default App;
