const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require('./modelEventComment');
require('./modelPhoto');
require('./modelRating');

const eventSchema = new Schema (
    {
        event_id: Number,
        comments: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Event_comment'
            },
        ],
        moderators_list: Array,
        gallery: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Photo'
            },
        ],
        tags: Array,
        members: Array,
        ratings: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Rating'
            },
        ]
    }
);

module.exports = mongoose.model('Events', eventSchema);