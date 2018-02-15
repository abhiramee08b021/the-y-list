import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../Images/the-y-list.png';

function WaitingPageSegment(props) {
    return (
            <div class="waitingpagecolumn">
                <Segment className='LandingPageSegment'>
                    <p>
                        <Image src={logo} size='medium' centered/>
                    </p>
                    <p>
                        Come back in an hour or so. We are filling the lookbook with more people. {props.rem} more people to go!
                    </p>
                    <Divider/>
                    <Embed
                        defaultActive
                        url='https://giphy.com/embed/tyqcJoNjNv0Fq'/>
                </Segment>
            </div>
    )
}

class WaitingPage extends React.Component {
    render(){
        return(
            <WaitingPageSegment rem={this.props.rem}/>
        )
    }
}

export default WaitingPage;