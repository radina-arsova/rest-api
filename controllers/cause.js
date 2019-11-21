const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.causes.find()
            .then((causes) => res.send(causes))
            .catch(next);
    },

    post: (req, res, next) => {
        const { description } = req.body;
        const { _id } = req.user;

        models.causes.create({ description, author: _id })
            .then((createdCause) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { posts: createdCause } }),
                    models.Cause.findOne({ _id: createdCause._id })
                ]);
            })
            .then(([modifiedObj, causeObj]) => {
                res.send(causeObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { description } = req.body;
        models.Cause.updateOne({ _id: id }, { description, imageUrl, amount })
            .then((updatedCause) => res.send(updatedCause))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Cause.deleteOne({ _id: id })
            .then((removedCause) => res.send(removedCause))
            .catch(next)
    }
};