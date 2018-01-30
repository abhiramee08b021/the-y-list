import React, {Component} from 'react';
import {Form, Button, Container, Header, Icon} from 'semantic-ui-react';
import Validator from 'validator';
import firebase from '../index'

class LoginForm extends Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e =>  
        this.setState({
            data: { ...this.state.data, [e.target.name]:e.target.value}
        });

    onSubmit = () => {
        //const errors = this.validate(this.state.data);
        //this.setState({errors});
        firebase.auth()
            .signInWithEmailAndPassword(this.state.data.email, this.state.data.password)
            .then(function(){
                window.location = '/';
            })
            .catch(function(errors){
                console.log('error logging in');
            });
    };
        
    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Should be an email";
        if (!Validator.isEmpty(data.password)) errors.password = "Password should not be empty";
        return errors;
    };

    render(){
        const {data, errors} = this.state;
        var styleContainer={
            "margin-top":"30px",
            "height": "300px",
            "margin-bottom":"30px"
        }
        var stylePadding={
            "padding":"20px"
        }
        var styleRegister={
            "margin-top":"20px",
            "float": "right"
        }
        return(
            <Container style={styleContainer}>
                <Header className={'teal-text'} huge>
                    <Icon name='sign in' />
                    Sign In 
                </Header>
            <div className={'card-pannel z-depth-5 deep-purple'} style={stylePadding}>
            <div className={'container white-text'} >
            <Form onSubmit={this.onSubmit}>
                <Form.Input 
                    error={!!errors.email}
                    label="Email"
                    name="email" 
                    id="email" 
                    type="email" 
                    value={data.email}
                    onChange={this.onChange}/>
                <Form.Input 
                    error={!!errors.password}
                    label="Password"
                    name="password" 
                    id="password" 
                    type="password" 
                    value={data.password}
                    onChange={this.onChange}/>
                <Button positive>
                    Login
                </Button>
            </Form>
            </div>
            </div>
            
            <Button primary style={styleRegister}> 
                Register 
            </Button>
            </Container>
        );
    }
}

export default LoginForm;