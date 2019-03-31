const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require('./modelRoomComment');
require('./modelPhoto');
require('./modelRating');

const roomsSchema = new Schema (
    {
        room_id: Number,
        comments: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Room_comment'
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
        room_information: String,
        ratings: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Rating'
            },
        ]
    }
);

module.exports = mongoose.model('Rooms', roomsSchema);