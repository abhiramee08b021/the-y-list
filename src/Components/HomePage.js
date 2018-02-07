import React from 'react';
import {Form, Divider, Button, Image, Card, Message, Header, Embed, Icon, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {firebase} from '../index';
import AfterSubmissionPage from './AfterSubmissionPage';

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
            <Card>
                <Image src={profile.profileImageUrl} />
                <Card.Content>
                <Card.Header>{profile.name}</Card.Header>
                <Card.Meta>{profile.yaleAffiliation}</Card.Meta>
                <Card.Description>{profile.desc}</Card.Description>
                </Card.Content>

                <Card.Content extra>
                    {liked && <Button content='Liked' positive onClick={this.handleUnlikeButton}/>}
                    {!liked && <Button content='Unliked' negative onClick={this.handleLikeButton}/>}
                </Card.Content>
            </Card>
        )      
    }
}

class ProfilesContainer extends React.Component {
    state = {
        likedProfiles: [],
        profiles: [],
        didSubmitLikes: false,
    }

    handleLikeButton(){
        
    }

    componentDidMount(){
        const usersRef = firebase.database().ref().child('Users');
        let newState = []
        usersRef.on('value', (snapshot) => {
            const profiles = snapshot.val();
            for (let profile in profiles){
                newState.push({
                    id: profile,
                    name: profiles[profile].name,
                    desc: profiles[profile].description,
                    yaleAffiliation: profiles[profile].yaleAffiliation,
                    profileImageUrl: profiles[profile].profileImageUrl,                 
                });
            }
            console.log(newState)
            this.setState({
                profiles: newState,
            })
        })
    }

    removeFromListOfLikedProfiles = (profile) => {
        let newLikedProfiles = this.state.likedProfiles
        newLikedProfiles.splice(newLikedProfiles.indexOf(profile),1)
        this.setState({likedProfiles: newLikedProfiles})
        console.log(this.state.likedProfiles)
    }

    addToListOfLikedProfiles = (profile) => {
        if (this.state.likedProfiles.length == 10){
            console.log('you already liked 10 profiles.');
            return;
        }
        let newLikedProfiles = this.state.likedProfiles
        newLikedProfiles.push(profile)
        this.setState({likedProfiles: newLikedProfiles})
        console.log(this.state.likedProfiles)
    }

    onSubmitClick = () => {
        const currentUserId = firebase.auth().currentUser.uid;
        var userRef = firebase.database().ref().child('Users').child(currentUserId)
        userRef.child('likes').set(true);
        for (var i=0; i<this.state.likedProfiles.length;i++){
            console.log(this.state.likedProfiles[i])
            userRef.child('likes').child(this.state.likedProfiles[i].id).set(true)
        }
        userRef.child('didSubmitLikes').set(true);
        alert('Done submitting likes!');
        this.setState({
            didSubmitLikes: true,
        })
    }

    render(){
        const profiles = this.state.profiles
        console.log(profiles)
        if (profiles.length > 0 && !this.state.didSubmitLikes) {
        return (
            <div>
            {profiles.map((profile) => {
                return (
                    <Profile 
            addToListOfLikedProfiles={this.addToListOfLikedProfiles}
            removeFromListOfLikedProfiles={this.removeFromListOfLikedProfiles}
            profile={profile}/>
                )
            })}
            <Button positive content='submit' onClick={this.onSubmitClick}/>
            </div>
            
            );
    }
    else if (this.state.didSubmitLikes){
        return(<AfterSubmissionPage/>);
    }
    else {
        return(<div></div>)
    }
    }
}


export default ProfilesContainer;