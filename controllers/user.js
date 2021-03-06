const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    get: (req, res, next) => {
        res.send(req.user)
    },

    post: {
        register: (req, res, next) => {
            const { username, password, balance, imageUrl } = req.body;
            models.User.create({ username, password, balance, imageUrl })
                .then((createdUser) => res.send(createdUser))
                .catch(next)
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            models.User.findOne({ username })
                .then((user) => !!user ? Promise.all([user, user.matchPassword(password)]) : [null, false])
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid username or password');
                        return;
                    }

                    const token = utils.jwt.createToken({ id: user._id });
                    res.cookie(config.authCookieName, token).send(user);
                })
                .catch(next);
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                })
                .catch(next);
        }
    },

    updateUser: (req, res, next) => {
        const id = req.user.id;
        const { username } = req.body;
        let { password } = req.body;

        if (password === '') {
            models.User.updateOne({ _id: id }, { username })
                .then((updatedUser) => res.send(updatedUser))
                .catch(next)
        }
        else {
            bcrypt.hash(password, saltRounds).then(function(hash) {
                password = hash;
            }).then(()=>{
                models.User.updateOne({ _id: id }, { username, password })
                .then((updatedUser) => res.send(updatedUser))
                .catch(next)
            });
        }
    },

    updatebalance: (req, res, next) => {
        const id = req.user.id;
        const { balance } = req.body;
        models.User.updateOne({ _id: id }, { balance })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.user.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};