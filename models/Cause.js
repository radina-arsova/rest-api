const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, ObjectId } = Schema.Types;

const CauseSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String
    },

    amount: {
        type: Number
    },

    author: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Cause', CauseSchema);