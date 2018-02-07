import React from 'react';
import {Form, Divider, Button, Segment, Message, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

var AboutPost = () => {
    return (
        <div class="ui column stackable centered page grid">
            <div class="column wide">
                <Segment>
                    <Header>
                        What are we about?
                    </Header>
                    <Divider/>
                    <p> The Y List connects Yale students. More info upcoming</p>
                </Segment>
            </div>
        </div>
    )
}

class AboutPage extends React.Component {
    render(){
        return(
            <AboutPost/>
        )
    }
}

export default AboutPage;