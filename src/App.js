import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Navigation from './Components/Navigation';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import AboutPage from './Components/AboutPage';
import Footer from './Components/Footer';
import {firebase} from './index'
import HomePage from './Components/HomePage';
import LandingPage from './Components/LandingPage';
import AfterSubmissionPage from './Components/AfterSubmissionPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <div className="AppContent" class="ui middle aligned center aligned grid">
        <Route exact={true} path={'/login'} component={LoginForm} />
        <Route exact={true} path={'/signup'} component={SignupForm} />
        <Route exact={true} path={'/'} component={HomePage} />
        </div>
      </div>
    );
  }
}

export default App;
