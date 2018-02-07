import React from 'react';
import {Form, Button, Segment, Message, Input, TextArea} from 'semantic-ui-react';
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
                // We dont want to store the password string 
                // We also dont need the user id here
                delete this.state.data.password;
                delete this.state.data.id;
                
                // get current user and user id
                const currentUser = firebase.auth().currentUser;
                const userId = currentUser.uid;
                
                // add this info to the database
                addUserInDatabase(userId, this.state.data);
                
                // need to add user profile image here. 
                console.log('input image is ' + this.state.fileInput);
                var file = this.state.fileInput.files[0];
                var uploadTask = firebase.storage().ref().child('profileImages/' + file.name).put(file);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(){
                        console.log('uploading image');
                    }, function(error){
                        console.log('error uploading image');
                    }, () => {
                        console.log('upload finished')
                        var updates = {};
                        updates['/Users/' + userId + '/' + 'profileImageUrl'] = uploadTask.snapshot.downloadURL;
                        firebase.database().ref().update(updates);
                });
                
                // loading is done at this point and user creation is successful.
                const loading = false;
                const isSuccess = true;
                
                // finally send verification email to user. 
                currentUser.sendEmailVerification().then(function() {
                    console.log('email sent!')
                  }).catch(function(error) {
                    console.log('email not sent');
                });
                
                // set state to success and redirect to home page. 
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
        if (this.state.fileInput.files.length == 0) errors.profileImage = "Please upload a profile image";
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
                    <Form.Field>
                        <label>Say a little about yourself</label>
                        <TextArea 
                            name='description' 
                            fluid 
                            placeholder='brag a little...but not too much...' 
                            value={data.description} 
                            error={!!errors.description} 
                            onChange={this.onChange}
                            style={{ minHeight: 100 }}/>
                    </Form.Field>
                    <Form.Field name='profileImage' error={!!errors.profileImage}>
                        <label>Add Profile Image </label>
                        <input
                        type='file'
                        withIcon={true}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                        ref={input => {
                            this.state.fileInput = input;}}
                        />
                    </Form.Field>
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