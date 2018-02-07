import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Menu, Button} from 'semantic-ui-react';
import { firebase } from '../index';
import logo from '../Images/the-y-list.png'

var LoginMenuItem = () => {
    return(
        <Menu.Item>
            <Button onClick={()=>window.location = '/login'}> Login </Button>
        </Menu.Item> 
    )
}

var SignupMenuItem = ()=> {
    return (
        <Menu.Item>
            <Button positive onClick={()=>window.location = '/signup'}> Sign up </Button>   
        </Menu.Item>
    )
}

var LogoutMenuItem = ()=> {
    return (
        <Menu.Item>
            <Button negative onClick={()=> firebase.auth().signOut().then(()=> {window.location = '/'}).catch((e)=>{console.log('error logging out')})}> Signout </Button>   
        </Menu.Item>
    )
}

class Navigation extends React.Component {
    state = {
        data: {
            isLoggedin: false
        }
    };

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            var data = {isLoggedin: true};
            this.setState({data})
        } else {
            var data = {isLoggedin: false}
            this.setState({data})
        }
        });
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        window.location = '/' + name}

    render(){
        const { activeItem } = this.state;
        return(
            <Menu>
            <Menu.Item>
                <a href='/'>
                <img class='ui mini image' src={logo}/>
                    </a>
            </Menu.Item>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}>
             Home
            </Menu.Item>
            {false && <Menu.Item
              name='about'
              active={activeItem === 'about'}
              onClick={this.handleItemClick}
            >
               About
            </Menu.Item>}
            <Menu.Menu position='right'>
            { !this.state.data.isLoggedin && <LoginMenuItem/>}
            { !this.state.data.isLoggedin && <SignupMenuItem/>}
            { this.state.data.isLoggedin && <LogoutMenuItem/>}
        </Menu.Menu>
          </Menu>
        );
    }
}

export default Navigation;
