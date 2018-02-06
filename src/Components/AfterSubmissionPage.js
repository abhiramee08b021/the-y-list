import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

var AboutPost = () => {
    return (
        <div class="ui column stackable centered page grid">
            <div class="column wide">
                <Segment>
                    <Header>
                    Thank you for your submission! We will send an email when you match soon!
                    </Header>
                    <Divider/>
                    <p> We are waiting right there with you </p>
                    <Embed
                        defaultActive
                        url='https://giphy.com/embed/o5oLImoQgGsKY'/>
                </Segment>
            </div>
        </div>
    )
}

class AfterSubmissionPage extends React.Component {
    render(){
        return(
            <AboutPost/>
        )
    }
}

export default AfterSubmissionPage;