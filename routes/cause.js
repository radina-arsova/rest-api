const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/user', auth(), controllers.cause.getUsersCauses)

router.get('/:id', controllers.cause.find);

router.post('/create', auth(), controllers.cause.post);

router.put('/donate/:id', auth(), controllers.cause.donate);

router.put('/edit/:id', auth(), controllers.cause.edit);

router.delete('/delete/:id', auth(), controllers.cause.delete);

router.get('/', controllers.cause.get);

module.exports = router;