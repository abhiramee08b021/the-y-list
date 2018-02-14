import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../Images/the-y-list.png';

var WaitingPageSegment = () => {
    return (
        <div class="ui column stackable centered page grid">
            <div class="column wide">
                <Segment className='LandingPageSegment'>
                    <p>
                        <Image src={logo} size='medium' centered/>
                    </p>
                    <p>
                        Come back at 6pm. We are filling the lookbook with more people.
                    </p>
                    <Divider/>
                    <Embed
                        defaultActive
                        url='https://giphy.com/embed/tyqcJoNjNv0Fq'/>
                </Segment>
            </div>
        </div>
    )
}

class WaitingPage extends React.Component {
    render(){
        return(
            <WaitingPageSegment/>
        )
    }
}

export default WaitingPage;