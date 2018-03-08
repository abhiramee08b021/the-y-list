const Users = require('../models/users');
const firebase = require('firebase');
const config = require('../config');

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

module.exports = {
    registerForm,
    register,
    loginForm,
    login,
    logout,
}