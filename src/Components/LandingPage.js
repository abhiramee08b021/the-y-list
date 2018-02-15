import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../Images/the-y-list.png';

var LandingPageSegment = () => {
    return (
            <div class="landingcolumn">
                <Segment className='LandingPageSegment'>
                    <p>
                        <Image src={logo} size='medium' centered/>
                    </p>
                    <p>
                        Why be on Tinder, CMB, Hinge, Bumble, League, Match, OkCupid, 
                        Tastebuds, Happn, Zoosk when the people you wanna date are around you?
                    </p>
                    <p>Sign up for a chance to match with someone on campus for Valentine’s Day!
                       You can enter up to 10 people you’d be willing to go on a date with and 
                       find out if they feel the same! Your name will only be revealed to the 
                       people who put you on their list as well.
                    </p>
                    <p><Button positive onClick={()=>(window.location='/signup')}> Sign up </Button> or <Button onClick={()=>(window.location='/login')}> Login </Button> </p>
                    <Divider/>
                    <p> Here's wishing you a good luck here </p>
                    <Embed
                        defaultActive
                        url='https://giphy.com/embed/100QWMdxQJzQC4'/>
                </Segment>
        </div>
    )
}

class LandingPage extends React.Component {
    render(){
        return(
            <LandingPageSegment/>
        )
    }
}

export default LandingPage;