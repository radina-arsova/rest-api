const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.cause.get);

router.put('/:id', auth(), controllers.cause.put);

router.delete('/:id', auth(), controllers.cause.delete);

module.exports = router;