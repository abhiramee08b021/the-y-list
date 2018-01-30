import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router,
        Route,Link


} from 'react-router-dom';
import Home from './Component/Home';
import About from './Component/About';
import 'semantic-ui-css/semantic.min.css';
var firebase = require('firebase');
var config = {
        apiKey: " AIzaSyDfEYzrDSPGVGau1l5QP0ww6Z0P9Jv0-bE",
        authDomain: "the-y-list.firebaseapp.com",
        databaseURL: "https://the-y-list.firebaseio.com",
        storageBucket: "the-y-list.appspot.com",
      };
firebase.initializeApp(config);
export default firebase;




ReactDOM.render(
       <Router>
                <App /> 
     </Router>,
                 document.getElementById('root'));
registerServiceWorker();

