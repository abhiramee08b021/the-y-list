import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed, Image, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../Images/the-y-list.png';

var HowItWorksSegment = () => {
    return (
            <div class="howitworkscolumn">
                <Segment className='LandingPageSegment'>
                    <p>
                        <Image src={logo} size='small' centered/>
                    </p>
                    <p>
                        <Icon name ="help circle"/>
                        How it works 
                    </p>
                    <Divider/>
                    <p>
                    <Icon name ="heart"/> Like upto 10 profiles
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon name="arrow circle down"/>  Click Submit
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon name ="mail"/>  We'll send you and your match an email when you match!
                    </p>
                </Segment>
        </div>
    )
}

class HowItWorks extends React.Component {
    render(){
        return(
            <HowItWorksSegment/>
        )
    }
}

export default HowItWorks;