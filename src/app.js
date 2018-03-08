const Koa = require('koa');
const router = require('./routes/routes.js');
const pgp = require('pg-promise')();
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const passport = require('koa-passport');
const session = require('koa-session');
const serve = require('koa-static-server');
const nunjucks = require('nunjucks');

passport.serializeUser((user, done) => {
    done(null, { username: user.username });
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

/**
 * createApp - returns a Koa application given a config
 * @param  {object} config - the config for the app
 * @returns {app} A Koa application
 */
function createApp(config) {

    // Create our app
    const app = new Koa();

    app.use(bodyParser());

    app.keys = [config.secret];
    app.use(session({}, app));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(serve({
        rootDir: path.join(__dirname, 'public'),
        rootPath: '/public/static',
    }));

    // Add the database to the app's context prototype.
    // This will make the db available in all controllers.
    app.context.db = pgp(config.cn);

    // Set the port for the app
    app.context.port = config.port;

    // Add view/template engine
    const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(__dirname, 'views')));
    app.use(views(path.join(__dirname, 'views'), {
        options: {
            nunjucksEnv: env,
        },
        map: { html: 'nunjucks' },
    }));

    // Attach our routes.
    app.use(router.routes());
    return app;
}

// This module exports a function that must
// be called to get an app. It is passed a
// configuration object, as indicated above.
module.exports = createApp;
