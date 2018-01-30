import React from 'react';
import {Container, Header, Icon} from 'semantic-ui-react';


export default class About extends React.Component {

    render(){
        var styleContainer={
            "margin-top":"30px",
            "height": "300px",
            "margin-bottom":"30px"
        }
        var stylePadding={
            "padding":"20px"
        }
        return (
            <Container style={styleContainer}>
                <Header className={'teal-text'} huge>
                    <Icon name='info circle' />
                    About 
                </Header>
            <div className={'card-pannel z-depth-5 deep-purple'} style={stylePadding}>
            <div className={'container white-text'} >
                <Header as='h2' className={'white-text'}>
                    The Y List connects people in the Yale community :) 
                </Header>
            </div>
            </div>
            </Container>
        );
    }
}