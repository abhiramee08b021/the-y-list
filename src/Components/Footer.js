import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Menu, Button, Segment} from 'semantic-ui-react';

class Footer extends React.Component {
    render(){
        return(
                <div className="footer">
                    <p>
                    &copy; 2018 The Y List
                    </p>
                    <p>
                        <a href=''> Terms and Conditions </a>
                    </p>
                </div>
        )
    }
}

export default Footer;