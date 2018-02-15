import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../Images/the-y-list.png';

var VerifyEmailSegment = () => {
    return (
            <div class="verifyemailcolumn">
                <Segment className='LandingPageSegment'>
                    <p>
                        <Image src={logo} size='medium' centered/>
                    </p>
                    <p>
                        Just want to check you are real. 
                        Open the email we sent and click the verification link. 
                        Might take 5-10 mins for the email to reach you..its coming 
                        all the way from google's office. 
                    </p>
                    <Divider/>
                    <p> Come oooon...quickly </p>
                    <Embed
                        defaultActive
                        url='https://giphy.com/embed/ypekwIgsna5dC'/>
                </Segment>
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