const Users = require('../models/users');

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function index(ctx) {
    const template = 'index.html';
    //const data = await Users.getAllProfiles(ctx.db);
    return ctx.render(template, {user: {}})//, { profiles: data, user: ctx.state.user });
}

/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
async function about(ctx) {
    const template = 'about.html';
    return ctx.render(template, { user: ctx.state.user });
}

module.exports = {
    index,
    about,
    
}