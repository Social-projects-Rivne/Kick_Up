const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema (
    {
        entity_type: String,
        entity_id: Number,
        author_id: Number,
        text: String,
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: Date,
        is_banned: {
            type: Boolean,
            default: false
        },
        child_comments: Array,
    }
);

module.exports = mongoose.model('mongodbcomments', CommentSchema);