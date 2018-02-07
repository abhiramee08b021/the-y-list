import React from 'react';
import {Form, Button, Segment, Message} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Validator from 'validator';
import {firebase} from '../index';

var SignUpDiv = () => {
    return (
        <Message>
            <p class="ui center aligned grid"> New to The Y List? <Link to={'/signup'}> SignUp! </Link>
            </p>
        </Message>
    );
}

class LoginForm extends React.Component {
    state = {
        data: {
            email:"",
            password:"",
        },
        errors: {},
        isSuccess: false,
    }

    onChange = e =>  
        this.setState({
            data: { ...this.state.data, [e.target.name]:e.target.value}
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
        firebase.auth()
            .signInWithEmailAndPassword(this.state.data.email, this.state.data.password)
            .then(()=>{
                const isSuccess = true;
                this.setState({isSuccess})
                setTimeout(()=>{window.location = '/'}, 3000);
            })
            .catch((e)=> {
                const errors = e;
                this.setState({errors});
            });
    }   
    };

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Not a Valid Email";
        if (!Validator.isLength(data.password, {min:6})) errors.password = "Password should be atleast 6 chars long";
        return errors;
    };

    render(){
        const { data, errors, isSuccess } = this.state;
        return(
            <div class="ui column stackable centered page grid">
            <div class="column twelve wide">
            <Segment className='LoginSegment'>
                <Form onSubmit={this.onSubmit}>
                    {(isSuccess) && <Message positive list={['Successfully Logged in! Redirecting to home page...']} />}
                    <Form.Input name="email" type='email' fluid label='Email' placeholder='Email' value={data.email}
                    onChange={this.onChange}/>
                    <Form.Input name="password" type='password' fluid label='Password' placeholder='Password' value={data.password}
                    onChange={this.onChange}/>
                    <Button type='submit' fluid positive>Login</Button>
                    {!(Object.keys(errors).length === 0) && <Message negative list={Object.values(errors)} />}
                </Form>
                <SignUpDiv/>
            </Segment>
            </div>
            </div>
        );
    }
}

export default LoginForm;