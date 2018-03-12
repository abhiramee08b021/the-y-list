const Users = require('../models/users');
const firebase = require('firebase');
const config = require('../config');
const AWS = require('aws-sdk');
const awsConfig = require('aws-config');

//Initialize AWS for storage 
AWS.config = awsConfig(config.aws_config);

// Initialize firebase
firebase.initializeApp(config.firebase_config);

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
function loginForm(ctx) {
    const template = 'login.html';
    return ctx.render(template);
}

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
function registerForm(ctx) {
    const template = 'register.html';
    return ctx.render(template);
}

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function login(ctx) {
    const data = {};
    try {
        const {
            email,
            password,
        } = ctx.request.body;
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        return ctx.redirect('/');
    }
    catch (err) {
        console.log(err);
        data.errors = [err.message];
        return ctx.render('login.html', data);
    }
    
}

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function register(ctx) {
    const data = {};
    try{
        const {
            name,
            age,
            gender,
            prefer_gender,
            email,
            school,
            about,
            profile_image,
            password,
            passwordConfirmation,
        } = ctx.request.body;
        console.log(ctx.request.body);
        if (email.toLowerCase().indexOf("@yale.edu") == -1) {
            data.errors = ['Email should be a yale email'];
            return ctx.render('register.html', data)
        }
        if(password.length < 8) {
            data.errors = ['Password should be atleast 8 chars long'];
            return ctx.render('register.html', data);
        }
        if (password !== passwordConfirmation) {
            data.errors = ['Passwords have to match'];
            return ctx.render('register.html', data);
        }
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const currentUser = firebase.auth().currentUser
        const userId = currentUser.uid;
        var storageRef = firebase.storage().ref();
        //var uploadTask = firebase.storage().ref().child('profileImages/')
        const userData = {
            user_id: userId,
            email: email,
            name: name,
            age: parseInt(age),
            gender: gender,
            prefer_gender: prefer_gender,
            school: school,
            about: about,
            profile_img_url: 'https://raw.githubusercontent.com/Infernus101/ProfileUI/0690f5e61a9f7af02c30342d4d6414a630de47fc/icon.png',
        };
        
        
        console.log(userData);
        //const user = await Users.insert(ctx.db, userData);
        currentUser.sendEmailVerification();
        return ctx.redirect('/');
    }  
    catch(err){
        console.log(err);
        data.errors = [err.message];
        return ctx.render('register.html', data);
    }
}

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function logout(ctx) {
    
}

async function editProfileForm(ctx) {
    var user = {};
    const user_id = ctx.params.id;
    user = Users.getProfileByUserId(user_id);
    console.log(user);
    user = {
        name: 'sample name',
        age: 18,
        gender: 'male',
        school: 'school of management',
        prefer_gender: 'female',
        about: 'hello this is a sample text. sample sample text',
        profile_img_url: '/public/static/images/abhi_profile.png',
        updated_at: '12 jan 2018',
    }
    return ctx.render('editProfile.html', {user: user});
}

async function editProfile(ctx) {
    
}

async function getProfile(ctx) {
    var user = {};
    const user_id = ctx.params.id;
    user = Users.getProfileByUserId(user_id);
    console.log(user);
    user = {
        user_id:"u12214nksdvdsa",
        name: 'sample name',
        age: 18,
        gender: 'male',
        school: 'school of management',
        prefer_gender: 'female',
        about: 'hello this is a sample text. sample sample text',
        profile_img_url: '/public/static/images/abhi_profile.png',
        updated_at: '12 jan 2018',
    }
    return ctx.render('profile.html', {user: user});
}

module.exports = {
    registerForm,
    register,
    loginForm,
    login,
    logout,
    getProfile,
    editProfile,
    editProfileForm,
}