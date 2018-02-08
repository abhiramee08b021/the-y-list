import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import LandingPage from './LandingPage';
import VerifyEmailPage from './VerifyEmailPage';
import AfterSubmissionPage from './AfterSubmissionPage';
import firebase from 'firebase';
import Profile from './Profile';

class HomePage extends React.Component {
    state = {
        currentUser: null,
        isUserVerified: false,
        profiles: [],
        likedProfiles:[],
        didSubmitLikes: false,
    }
    
    componentDidMount(){
        // Making sure that the user is signed in and is verified
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               this.setState({currentUser: user});
               if (user.emailVerified){
                   console.log('email is verified')
                   this.setState({isUserVerified: true})
                   
                   // now user is logged in check if user already submitted
                   const userRef = firebase.database().ref().child('Users').child(user.uid).once('value').then((snapshot) => {
                      const didSubmitLikes = (snapshot.val() && snapshot.val().didSubmitLikes) || false;
                      if (didSubmitLikes) {
                          this.setState({didSubmitLikes: true})
                      }
                   });
                   
                   if (this.state.didSubmitLikes) return;
                   
                   // now user is logged in and verified and has not already submitted likes 
                   // load profiles
                   const usersRef = firebase.database().ref().child('Users');
                   let newState = []
                   usersRef.on('value', (snapshot) => {
                        const profiles = snapshot.val();
                        for (let profile in profiles){
                            let p = profiles[profile]
                            p.id = profile
                            newState.push(p)
                        }
                        console.log(newState)
                        this.setState({
                            profiles: newState,
                        })
                    })
        
               }
            } else {
                console.log('user not logged in')
            }
        });
        
    }
    
    removeFromListOfLikedProfiles = (profile) => {
        let newLikedProfiles = this.state.likedProfiles
        newLikedProfiles.splice(newLikedProfiles.indexOf(profile),1)
        this.setState({likedProfiles: newLikedProfiles})
        console.log(this.state.likedProfiles)
    }

    addToListOfLikedProfiles = (profile) => {
        let newLikedProfiles = this.state.likedProfiles
        newLikedProfiles.push(profile)
        this.setState({likedProfiles: newLikedProfiles})
        console.log(this.state.likedProfiles)
    }

    
    onSubmitClick = () => {
        const currentUserId = firebase.auth().currentUser.uid;
        var userRef = firebase.database().ref().child('Users').child(currentUserId)
        for (var i=0; i<this.state.likedProfiles.length;i++){
            userRef.child('likedProfiles').child(this.state.likedProfiles[i].id).set(true)
        }
        userRef.child('didSubmitLikes').set(true);
        alert('Done submitting likes!');
        this.setState({
            didSubmitLikes: true,
        })
    }

    render(){
        if (!this.state.currentUser){
            return (<LandingPage/>);
        }
        else if (!this.state.isUserVerified){
            return (
               <VerifyEmailPage/> 
            );
        }
        else if(this.state.didSubmitLikes){
            return (
                <AfterSubmissionPage/>
            );
        }
        const profiles = this.state.profiles;
        console.log(profiles);
        if (profiles.length >0){
            return(
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
        return(
            <div> Hmm nothing is here....
            </div>
            );
        
    }
}

export default HomePage;