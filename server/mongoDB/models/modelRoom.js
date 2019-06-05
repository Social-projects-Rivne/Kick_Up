const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema (
    {
        room_id: Number,
        posts: [
            {
                authorId: Number,
                title: String,
                text: Object,
                created_at: {
                    type: Date,
                    default: Date.now,
                },
                updated_at: {
                    type: Date,
                    default: Date.now,
                },
                isPinned: {
                    type: Boolean,
                    default: false
                },
                comments: [
                    {
                        author_id: Number,
                        text: String,
                        created_at: {
                            type: Date,
                            default: Date.now,
                        },
                        updated_at: {
                            type: Date,
                            default: Date.now,
                        },
                        is_banned: Boolean,
                        child_comments: Array,
                    }
                ]
            }
        ],
        moderators_list: Array,
        gallery: [
            {
                src: String,
                user_id: Number,
                created_at: {
                    type: Date,
                    default: Date.now,
                },
                is_banned: Boolean,
                tags: Array,
            }
        ],
        tags: Array,
        members: Array,
        ratings: [
            {
                user_id: Number,
                rating: Number,
            }
        ]
    }
);

module.exports = mongoose.model('MongoDbRoom', roomsSchema);
