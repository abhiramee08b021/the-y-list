import firebase from '../index';

const User = {
    userId: "",
    name: "",
    email: "",
    gender: "",
    preferGender: "",
    about:"",
    profileUrl:"",
    connections: "",
    whoILiked: "",
    whoLikedMe: "",
    isActive: false,
};

const genderChoices = [
    "male", "female", "other"
];

export default function addUserInDatabase(data) {
    var currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref().child('Users').child(currentUserId).set({
        name: data.name,
        email: data.email,
        gender: data.gender,
        preferGender: data.preferGender
    });
    console.log('done adding user to db');
    return;
};

export function updateUserInDatabase(data) {
    var currerntUserId = firebase.auth().currentUser.uid;
    console.log(data);
    firebase.database().ref().child('Users').child(currerntUserId).set(data);
    console.log('done updating user info in db');
    return;
};

export {User, genderChoices};