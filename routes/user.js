const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.put('/add', auth(), controllers.user.updatebalance);

router.put('/edit', auth(), controllers.user.updateUser);

router.delete('/delete', auth(), controllers.user.delete);

router.post('/register', controllers.user.post.register);

router.post('/login', controllers.user.post.login);

router.post('/logout', controllers.user.post.logout);

router.get('/', auth(), controllers.user.get);

module.exports = router;