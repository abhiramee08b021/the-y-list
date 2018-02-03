import {firebase} from '../index';

function addUserInDatabase(userId, data) {
    firebase.database().ref().child('Users').child(userId).set(data);
    console.log('done adding user to db');
    return;
};

function uploadProfileImage(userId, image) {
    console.log('profile image log ' + image);
    const storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('profileImages/' + image.name).put(image);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(){
        console.log('uploading image');
    }, function(error){
        console.log('error uploading image');
    }, () => {
        console.log('upload finished')
        var updates = {};
        updates['/Users/' + userId + '/' + 'profileImageUrl'] = uploadTask.snapshot.downloadURL;
        firebase.database().ref().update(updates);
     });
     return;
}

export {addUserInDatabase, uploadProfileImage};