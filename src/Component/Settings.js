import React from 'react';
import {Form, Button, Container, Header, Icon} from 'semantic-ui-react';

function logoutAccount(){

}

function deleteAccount(){

}

export default class Settings extends React.Component {
    state = {
        data: {
            name: '',
        },
        loading: false,
        errors: {}
    };

    render(){
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
            "padding":"20px"
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
                <Form.Input 
                    error={!!errors.name}
                    label="Name"
                    name="name" 
                    id="name" 
                    type="text" 
                    value={data.name}
                    onChange={this.onChange}/>
                <Form.Dropdown label="Gender" placeholder='Select Gender' fluid selection options={genderOptions} />
                <Form.Dropdown label="Prefer Gender" placeholder='Select Gender of who you are interested in' fluid selection options={genderOptions} />
                <Button positive>
                    Save Changes
                </Button>
                <Button>
                    Cancel
                </Button>
            </Form>
                    </div>
                </div>
            <Button negative style={styleLogout}> 
                Delete Account 
            </Button>
            <Button negative style={styleLogout}> 
                Logout 
            </Button>
            </Container>
        );
    }
}