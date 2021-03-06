import React from 'react';
import {Card, Image} from 'semantic-ui-react';

class Profile extends React.Component {
    state = {
        liked: false,
    }
    
    handleLikeButton = () => {
        this.setState({liked: true});
        this.props.addToListOfLikedProfiles(this.props.profile)
    }

    handleUnlikeButton = () => {
        this.setState({liked: false});
        this.props.removeFromListOfLikedProfiles(this.props.profile)
    }

    render(){
        const {liked} = this.state
        const profile = this.props.profile
        return(
            <div class="four wide column">
            <Card>
                <Image src={profile.profileImageUrl} />
                <Card.Content>
                <Card.Header>{profile.name}</Card.Header>
                <Card.Meta>{profile.age}, {profile.yaleAffiliation}</Card.Meta>
                <Card.Description>{profile.description}</Card.Description>
                </Card.Content>

                <Card.Content extra>
                    {liked && <button class="ui icon button" onClick={this.handleUnlikeButton}>
                                <i class="redred big heart icon"></i>
                              </button>}
                    {!liked && <button class="ui icon button" onClick={this.handleLikeButton}>
                                <i class="blueblue large heart icon"></i>
                               </button>}
                </Card.Content>
            </Card>
            </div>
        )      
    }
}

export default Profile