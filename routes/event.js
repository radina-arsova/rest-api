const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.event.get);

router.post('/create', controllers.event.post);

router.put('/:id', auth(), controllers.event.put);

router.delete('/:id', auth(), controllers.event.delete);

module.exports = router;