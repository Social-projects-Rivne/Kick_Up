const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema (
    {
        _id: mongoose.Schema.Types.ObjectId,
        user_id: Number,
        rating: Number,
    }
);

module.exports = mongoose.model('Rating', ratingSchema);