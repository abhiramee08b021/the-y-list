import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

var AboutPost = () => {
    return (
        <div class="ui column stackable centered page grid">
            <div class="column wide">
                <Segment>
                    <Header>
                        Home Page is still under construction. We are working round the clock.
                    </Header>
                    <Divider/>
                    <Embed
                        defaultActive
                        url='https://giphy.com/embed/JIX9t2j0ZTN9S'/>
                    <Divider/>
                    <p> Please <a href="/signup"> sign up </a> in the meantime </p>
                    <p> For more info please <a href="mailto:abhi.moturi@yale.edu?Subject=[The Y List]Heythere!"> contact us </a></p>
                </Segment>
            </div>
        </div>
    )
}

class HomePage extends React.Component {
    render(){
        return(
            <AboutPost/>
        )
    }
}

export default HomePage;