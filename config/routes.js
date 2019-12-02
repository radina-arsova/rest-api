const router = require('../routes/');

module.exports = (app) => {

    app.use('/api/user', router.user);

    app.use('/api/causes', router.causes);

    app.use('/api/events', router.events);

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};