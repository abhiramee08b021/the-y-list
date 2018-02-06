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
        <div className="AppContent">
        <Route exact={true} path={'/login'} component={LoginForm} />
        <Route exact={true} path={'/signup'} component={SignupForm} />
        <Route exact={true} path={'/about'} component={AboutPage} />
        <Route exact={true} path={'/home'} component={HomePage} />
        <Route exact={true} path={'/'} component={LandingPage} />
        <Route exact={true} path={'/submitted'} component={AfterSubmissionPage} />        
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
