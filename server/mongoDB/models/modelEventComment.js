const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventCommentSchema = new Schema (
    {
        _id: mongoose.Schema.Types.ObjectId,
        author_id: Number,
        text: String,
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: Date,
        is_banned: Boolean,
        child_comments: Array,
    }
);

module.exports = mongoose.model('Event_comment', eventCommentSchema);