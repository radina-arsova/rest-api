const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.event.get);

router.get('/check-guests/:id', auth(), controllers.event.checkGuests)

router.get('/user', auth(), controllers.event.getUsersEvents)

router.post('/create', auth(), controllers.event.post);

router.put('/will-come/:id', auth(), controllers.event.come);

router.put('/:id', auth(), controllers.event.put);

router.delete('/:id', auth(), controllers.event.delete);

module.exports = router;