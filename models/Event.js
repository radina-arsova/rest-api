const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const EventSchema = new Schema({

    title:{
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

    guests: [{
        type: ObjectId,
        ref: "User"
    }],

    author: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Event', EventSchema);