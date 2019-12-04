const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Event.find()
            .then((events) => res.send(events))
            .catch(next);
    },

    post: (req, res, next) => {
        const { title, description, imageUrl } = req.body;

        models.Event.create({ title, description, imageUrl, guests: 0 })
            .then((createdCause) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { causes: createdCause } }),
                    models.Cause.findOne({ _id: createdCause._id })
                ]);
            }).then(([modifiedObj, eventObj]) => {
                res.send(eventObj);
            })
            .catch(next)
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