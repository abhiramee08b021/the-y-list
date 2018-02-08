import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../Images/the-y-list.png';

var VerifyEmailSegment = () => {
    return (
        <div class="ui column stackable centered page grid">
            <div class="column wide">
                <Segment className='LandingPageSegment'>
                    <p>
                        <Image src={logo} size='medium' centered/>
                    </p>
                    <p>
                        Just want to check you are real. 
                        Open the email we sent and click the verification link. 
                    
                    </p>
                    <Divider/>
                    <p> Come oooon...quickly </p>
                    <Embed
                        defaultActive
                        url='https://giphy.com/embed/ypekwIgsna5dC'/>
                </Segment>
            </div>
        </div>
    )
}

class VerifyEmailPage extends React.Component {
    render(){
        return(
            <VerifyEmailSegment/>
        )
    }
}

export default VerifyEmailPage;