import React from 'react';
import {Form, Divider, Button, Segment, Message, Header, Embed} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import LandingPage from './LandingPage';
import VerifyEmailPage from './VerifyEmailPage';
import AfterSubmissionPage from './AfterSubmissionPage';
import WaitingPage from './WaitingPage';
import firebase from 'firebase';
import Profile from './Profile';
import HowItWorks from './HowItWorks';

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
                   const preferedGender = usersRef.child(user.uid).child('preferGender').once('value').then((snap) => {
                        let newState = []
                        usersRef.on('value', (snapshot) => {
                            const profiles = snapshot.val();
                            for (let profile in profiles){
                                let p = profiles[profile]
                                console.log(snap.val())
                                if (p.gender == snap.val() && p.id != user.uid){
                                    p.id = profile
                                    newState.push(p)
                                }
                            }
                            console.log(newState)
                            this.setState({
                                profiles: newState,
                            })
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
        console.log(this.state)
        this.setState({likedProfiles: newLikedProfiles})
        console.log(this.state.likedProfiles)
    }

    
    onSubmitClick = () => {
        const currentUserId = firebase.auth().currentUser.uid;
        var usersRef = firebase.database().ref().child('Users')
        for (var i=0; i<this.state.likedProfiles.length;i++){
            usersRef.child(currentUserId).child('likedProfiles').child(this.state.likedProfiles[i].id).set(true)
            usersRef.child(this.state.likedProfiles[i].id).child('whoLikesMe').child(currentUserId).set(true);
            
            usersRef.child(currentUserId).child('whoLikesMe').once("value", (snapshot) => {
                if (snapshot!=null){
                    const profiles = Object.keys(snapshot.val())
                    for (var i=0;i<profiles.length;i++){
                        if (profiles[i] == this.state.likedProfiles[i].id){
                            usersRef.child(currentUserId).child('matches').child(this.state.likedProfiles[i].id).set(true)
                            usersRef.child(this.state.likedProfiles[i].id).child('matches').child(currentUserId).set(true);
                        }
                    }
                }
            })
              
        }
        usersRef.child(currentUserId).child('didSubmitLikes').set(true);
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
        if (profiles.length < 20){
            var remaining = 20-profiles.length
            return (
                <WaitingPage rem={remaining}/>
            );
        }

        else{
            return(
                    <div style={{padding:'2em'}}>
                    <HowItWorks />
                    <div class="ui grid">
                    {profiles.map((profile) => {
                        return (
                            <Profile 
                                addToListOfLikedProfiles={this.addToListOfLikedProfiles}
                                removeFromListOfLikedProfiles={this.removeFromListOfLikedProfiles}
                                profile={profile}/>
                                )
                    })}
                    </div>
                    <div class="ui centered grid">
                    <div class="column">
                    <Button disabled={(this.state.likedProfiles.length>10)} style={{width: '100%'}} positive content='submit' onClick={this.onSubmitClick}/>
                    <div style={{'text-align':'center', 'margin': '1em'}}>
                    you liked {this.state.likedProfiles.length} profiles
                    </div>
                    {(this.state.likedProfiles.length>10) && <div style={{'text-align':'center', 'margin': '1em'}}>
                    You can only like up to 10 profiles
                    </div>}
                    </div>
                    </div>
                    </div>
            );
        }
        return(
            <div> Hmm nothing is here... <a href="mailto:abhi.moturi@yale.edu?Subject=[The Y List]Heythere!">email us</a> and we'll take a look at whats going on
            </div>
            );
        
    }
}

export default HomePage;
