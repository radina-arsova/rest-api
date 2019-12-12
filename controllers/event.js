const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Event.find()
            .then((events) => res.send(events))
            .catch(next);
    },

    getUsersEvents: (req, res, next) => {
        const userId = req.user.id;
        models.Event.find({ author: userId }).then(events => {
            res.send(events);
        })
    },

    find: (req, res, next) => {
        const id = req.params.id;
        models.Event.findById(id)
            .then((event) => res.send(event))
            .catch(next);
    },


    post: (req, res, next) => {
        const { title, description, imageUrl } = req.body;
        const { _id } = req.user;

        models.Event.create({ title, description, imageUrl, guests: [], author: _id })
            .then((createdEvent) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { events: createdEvent } }),
                    models.Event.findOne({ _id: createdEvent._id })
                ]);
            }).then(([modifiedObj, eventObj]) => {
                res.send(eventObj);
            })
            .catch(next)
    },

    come: (req, res, next) => {
        const id = req.params.id;
        const { _id } = req.user;
        models.Event.findById(id).then(event => {
            const eventGuests = event.guests;
            eventGuests.push(_id);
            models.Event.updateOne({ _id: id }, { guests: eventGuests })
                .then((updatedEvent) => res.send(updatedEvent))
                .catch(next)
        })
    },

    checkGuests: (req, res, next) => {
        const { id } = req.params;
        const { _id } = req.user;

        models.Event.findById(id).then((event) => {
            res.send(event.guests.find(id => id = _id));
        })
    },

    edit: (req, res, next) => {
        const id = req.params.id;
        const { title, description, imageUrl } = req.body;
        models.Event.updateOne({ _id: id }, { title, description, imageUrl })
            .then((updatedEvent) => res.send(updatedEvent))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Event.deleteOne({ _id: id })
            .then((removedEvent) => res.send(removedEvent))
            .catch(next)
    },

    getGuests: (req, res, next) => {
        const { id } = req.params;
        models.Event.findById(id).then((event)=>{
            res.send(event.guests);
        })
    }
};