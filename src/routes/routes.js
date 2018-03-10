const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const userControllers = require('../controllers/users.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/about', indexControllers.about);


router.get('/user/login', userControllers.loginForm);
router.post('/user/login', userControllers.login);
router.get('/user/register', userControllers.registerForm);
router.post('/user/register', userControllers.register);
router.get('/user/logout', userControllers.logout);


router.get('/:id/profile', userControllers.getProfile);
router.get('/:id/profile/edit', userControllers.editProfileForm);
/*
router.get('/matches', indexControllers.getMatches);

router.post('/:username/profile/edit', userControllers.editProfile);

router.post('/:username/profile/like', userControllers.likeProfile);
*/
module.exports = router;
