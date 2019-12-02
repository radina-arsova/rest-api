const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.events.find()
            .then((events) => res.send(events))
            .catch(next);
    },

    post: (req, res, next) => {
        const { description } = req.body;
        const { _id } = req.user;

        models.events.create({ description, author: _id })
            .then((createdEvent) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { posts: createdEvent } }),
                    models.Event.findOne({ _id: createdEvent._id })
                ]);
            })
            .then(([modifiedObj, eventObj]) => {
                res.send(eventObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { description } = req.body;
        models.Event.updateOne({ _id: id }, { description, imageUrl, amount })
            .then((updatedEvent) => res.send(updatedEvent))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Event.deleteOne({ _id: id })
            .then((removedEvent) => res.send(removedEvent))
            .catch(next)
    }
};