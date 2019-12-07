const models = require('../models');
const { auth } = require('../utils');

module.exports = {
    get: (req, res, next) => {
        models.Cause.find()
            .then((causes) => res.send(causes))
            .catch(next);
    },

    post: (req, res, next) => {
        const { title, description, imageUrl, name } = req.body;
        const { _id } = req.user;

        models.Cause.create({ title, description, imageUrl, name, amount: 0, author: _id })
            .then((createdCause) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { causes: createdCause } }),
                    models.Cause.findOne({ _id: createdCause._id })
                ]);
            }).then(([modifiedObj, causeObj]) => {
                res.send(causeObj);
            })
            .catch(next)
    },

    donate: (req, res, next) => {
        const id = req.params.id;
        const { amount } = req.body;
        models.Cause.updateOne({ _id: id }, { amount })
            .then((updatedCause) => res.send(updatedCause))
            .catch(next)
    },


    put: (req, res, next) => {
        const id = req.params.id;
        const { description } = req.body;
        models.Cause.updateOne({ _id: id }, { description, imageUrl })
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