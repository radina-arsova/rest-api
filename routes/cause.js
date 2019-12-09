const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.cause.get);

router.get('/user', auth(), controllers.cause.getUsersCauses);

router.get('/:id', controllers.cause.find);

router.post('/create', auth(), controllers.cause.post);

router.put('/donate/:id', auth(), controllers.cause.donate);

router.put('/:id', auth(), controllers.cause.put);

router.delete('/delete/:id', auth(), controllers.cause.delete);

module.exports = router;