import React from 'react';
import {Form, Button, Container, Header, Icon,Image, TextArea,Input} from 'semantic-ui-react';
import firebase from '../index';
import { updateUserInDatabase, genderChoices } from './Users';
import ImageUploader from 'react-images-upload';

function logoutAccount(){
    firebase.auth().signOut().then(function() {
        window.location = '/';
    }).catch(function(error) {
        console.log('error loggingout user');
        console.log(error.message);
      });
}

function deleteAccount(){
    const user = firebase.auth().currentUser;
    user.delete().then(function() {
        updateUserInDatabase({isActive: false});
        window.location = '/';
      }).catch(function(error) {
        console.log('error deleting user');
        console.log(error.message);
      });      
}

function clickCancel(){
    window.location = '/';
}

export default class Settings extends React.Component {
    componentDidMount() {
        var data = {};
        if (firebase.auth().currentUser != null ){
        console.log('user detected');
        var currentUserId = firebase.auth().currentUser.uid;
        const userData = firebase.database().ref().child('Users').child(currentUserId).once('value', snapshot => {
            data = snapshot.val();
            this.setState({data: snapshot.val()});
        });
    }
}

    state = {
        data: {
            name: "",
            gender: "",
            preferGender: "",
            about:"",
            profileUrl:"",
        },
        loading: false,
        errors: {}
    };
    
    onChange = e =>  
        this.setState({
            data: { ...this.state.data, [e.target.name]:e.target.value}
        });
    
    handleChange = (e, { name, value }) => this.setState({
        data: { ...this.state.data, [name]:value}});


    onSubmit = () => {
        //const errors = this.validate(this.state.data);
        if (this.state.fileInput.files.length != 0){
            const file = this.state.fileInput.files[0];
            var downloadURL;
            const storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child('profileImages/' + file.name).put(file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(){
                console.log('uploading image');
            }, function(error){
                console.log('error uploading image');
            }, () => {
                console.log('upload finished')
                downloadURL = uploadTask.snapshot.downloadURL;
                this.setState({
                    data: { ...this.state.data, ['profileUrl']:downloadURL}
                });
                const data = this.state.data;
                console.log(data);
                updateUserInDatabase(data);
                window.location = '/';
            });
        }
        else {
            const data = this.state.data;
            updateUserInDatabase(data);
            window.location = '/';
        }
    };

    render() {
        var genderOptions = [
            {key: "male",
            value: "male",
            icon: "man",
            text: "Male"}, 
            {key: "female",
            value: "female",
            icon: "woman",
            text: "Female"},
            {key: "other",
            value: "other",
            icon: "other gender",
            text: "Other"},]
        const {data, errors} = this.state;
        var styleContainer={
            "margin-top":"30px",
            "margin-bottom":"30px"
        }
        var stylePadding={
            "padding":"20px",
            "border-radius": "5px"
        }
        var styleLogout={
            "margin-top":"20px",
            "float": "right"
        }
        return (
            <Container style={styleContainer}>
                <Header className={'teal-text'} huge>
                    <Icon name='settings' />
                    Settings 
                </Header>
            <div className={'card-pannel z-depth-5 deep-purple'} style={stylePadding}>
            <div className={'container white-text'} >
            <Form onSubmit={this.onSubmit}>
                <Form.Field
                    control={Image}
                    label="Profile Image"
                    id="profileImage"
                    name="profileImage"
                    size='medium'
                    src={data.profileUrl}
                    rounded
                    onChange={this.onChange}>
                </Form.Field>
                <label>Change Profile Image
                <input
                    type='file'
                    withIcon={true}
                    ref={input => {
                        this.state.fileInput = input;
                      }}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                </label>
                <Form.Input 
                    label="Name"
                    name="name" 
                    id="name" 
                    type="text" 
                    value={data.name}
                    onChange={this.onChange} />
                <Form.Field 
                    control={TextArea} 
                    label='About'
                    name="about" 
                    value={data.about}
                    style={{ minHeight: 100 }}
                    onChange={this.onChange}
                    placeholder='Tell us more about you...' />
                <Form.Dropdown 
                    label="Gender"
                    name="gender" 
                    placeholder={data.gender}
                    fluid selection options={genderOptions}
                    onChange={this.handleChange}  />
                <Form.Dropdown 
                    label="Prefer Gender" 
                    name="preferGender"
                    placeholder={data.preferGender}
                    fluid selection options={genderOptions}
                    onChange={this.handleChange} />
                <Button positive>
                    Save Changes
                </Button>
                <Button type='cancel' onClick={clickCancel}>
                    Cancel
                </Button>
            </Form>
                    </div>
                </div>
            <Button onClick={deleteAccount} negative style={styleLogout}> 
                Delete Account 
            </Button>
            <Button onClick={logoutAccount} negative style={styleLogout}> 
                Logout 
            </Button>
            </Container>
        );
    }
}