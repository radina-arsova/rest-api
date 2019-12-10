const models = require('../models');
const { auth } = require('../utils');
const {ObjectId} = require('mongodb');

module.exports = {
    get: (req, res, next) => {
        models.Cause.find()
            .then((causes) => res.send(causes))
            .catch(next);
    },

    getUsersCauses: (req, res, next) => {
        const userId=req.user.id;
        models.Cause.find({author: userId}).then(causes => {
            res.send(causes);
        })
    },

    find: (req, res, next) => {
        const id = req.params.id;
        models.Cause.findById(id)
            .then((cause) => res.send(cause))
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
        const { amount, value } = req.body;
        const userId = req.user.id;
        models.Cause.updateOne({ _id: id }, { amount })
            .then((updatedCause) => res.send(updatedCause))
            .then(() => {
                models.User.findById(userId).then((user)=>{
                    let bal=user.balance-value;
                    models.User.updateOne({_id: userId}, {balance: bal})
                    .then(updatedUser=>console.log(updatedUser))
                })
            })
            .catch(next)
    },


    edit: (req, res, next) => {
        const id = req.params.id;
        const { name, title, description, imageUrl } = req.body;
        models.Cause.updateOne({ _id: id }, { name, title, description, imageUrl })
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