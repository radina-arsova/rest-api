const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/check-guests/:id', auth(), controllers.event.checkGuests)

router.get('/getGuests/:id', controllers.event.getGuests)

router.delete('/delete/:id', auth(), controllers.event.delete);

router.put('/will-come/:id', auth(), controllers.event.come);

router.put('/edit/:id', auth(), controllers.event.edit);

router.get('/user', auth(), controllers.event.getUsersEvents)

router.post('/create', auth(), controllers.event.post);

router.get('/:id', controllers.event.find);

router.get('/', controllers.event.get);

module.exports = router;