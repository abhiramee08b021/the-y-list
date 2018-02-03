import React from 'react';
import {Form, Button, Segment, Message, Input} from 'semantic-ui-react';
import User, {genderDropdownOptions, 
        yaleAffiliationDropdownOptions, 
        yaleGraduationDropdownOptions,
        yaleInterestedJobsDropdownOptions} from '../Model/User';
import {firebase} from '../index';
import Validator from 'validator';
import { addUserInDatabase, uploadProfileImage } from "../Model/UserFunctions";

var HaveQuestions = () => {
    return (
        <Message>
            <p class="ui center aligned grid"> Have any questions? <a href="mailto:abhi.moturi@yale.edu?Subject=[Giggly]Heythere!"> Email us! </a> We don't bite.
            </p>
        </Message>
    );
}
class SignupForm extends React.Component {
    state = {
        data: User,
        loading: false,
        errors: {},
        isSuccess: false,
        fileInput:{},
    }

    onChange = e =>  
        this.setState({
            data: { ...this.state.data, [e.target.name]:e.target.value}
        });

    onDropdownChange = (e, { name, value }) => this.setState({
        data: { ...this.state.data, [name]:value}});

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.state.loading = true;
            console.log('no errors');  
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.data.email, this.state.data.password)
            .then(()=>{
                delete this.state.data.password;
                delete this.state.data.id;
                const currentUser = firebase.auth().currentUser;
                const userId = currentUser.uid;
                addUserInDatabase(userId, this.state.data);
                const loading = false;
                const isSuccess = true;
                currentUser.sendEmailVerification().then(function() {
                    console.log('email sent!')
                  }).catch(function(error) {
                    console.log('email not sent');
                });
                this.setState({loading, isSuccess});
                setTimeout(()=>{window.location = '/'}, 4000);
            })
            .catch((errors)=>{
                console.log('error creating user');
                const loading = false;
                const isSuccess = false;
                this.setState({errors, loading, isSuccess});
        });
        }   
    };

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.name)) errors.name = "Name should not be empty";
        if (Validator.isEmpty(data.gender)) errors.gender = "Please pick a gender";
        if (Validator.isEmpty(data.preferGender)) errors.gender = "Please pick a gender you are interested in";
        if (!Validator.isEmail(data.email)) errors.email = "Should be an email";
        if (Validator.isEmpty(data.yaleAffiliation)) errors.yaleAffiliation = "Please pick a yaleAffiliation";
        if (!Validator.isLength(data.password, {min:6})) errors.password = "Password should be atleast 6 chars long";
        return errors;
    };

    render(){
        const { data, errors, loading, isSuccess } = this.state;
        return(
            <div class="ui column stackable centered page grid">
            <div class="column twelve wide">
            <Segment className='SignupSegment'>
                <Form onSubmit={this.onSubmit} loading={loading}>
                    {(isSuccess) && <Message positive list={['Successfully Signed up! Redirecting to home page...']} />}
                    <Form.Input name='name' type='text' fluid label='I am..' placeholder='Name' value={data.name} error={!!errors.name} onChange={this.onChange}/>
                    <Form.Dropdown name='gender' label="Gender" placeholder='Select Gender' value={data.gender} fluid selection options={genderDropdownOptions} error={!!errors.gender} onChange={this.onDropdownChange}/>
                    <Form.Dropdown name='preferGender' label="I am interested in.." placeholder='Select Prefered Gender' value={data.preferGender} fluid selection options={genderDropdownOptions} error={!!errors.preferGender} onChange={this.onDropdownChange}/>
                    <Form.Input name='email' type='email' fluid label='Email' placeholder='Jane.Yalie@Yale.edu' value={data.email} error={!!errors.email} onChange={this.onChange}/>
                    <Form.Dropdown name='yaleAffiliation' label="Yale Affiliation" fluid selection value={data.yaleAffiliation} options={yaleAffiliationDropdownOptions} error={!!errors.yaleAffiliation} onChange={this.onDropdownChange}/>
                    {false && <Form.Field name='profileImageUrl' onChange={this.onChange} value={data.profileImageUrl}>
                        <label>Add Profile Image </label>
                        <input
                        type='file'
                        withIcon={true}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                        ref={input => {
                            this.state.fileInput = input;}}
                        />
                    </Form.Field>}
                    <Form.Input name='password' onChange={this.onChange} type='password' fluid label='Password' value={data.password} placeholder='Password' error={!!errors.password}/>
                    <Button type='submit' fluid positive>Sign Up!</Button>
                    {!(Object.keys(errors).length === 0) && <Message negative list={Object.values(errors)} />}
                </Form>
                <HaveQuestions/>
            </Segment>
            </div>
            </div> 
        );
    }
}

export default SignupForm;