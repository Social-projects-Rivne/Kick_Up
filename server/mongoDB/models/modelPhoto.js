const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema (
    {
        _id: mongoose.Schema.Types.ObjectId,
        src: String,
        user_id: Number,
        created_at: {
            type: Date,
            default: Date.now,
        },
        is_banned: Boolean,
        tags: Array,
    }
);

module.exports = mongoose.model('Photo', photoSchema);