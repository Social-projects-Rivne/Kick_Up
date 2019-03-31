const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema (
    {
        _id: mongoose.Schema.Types.ObjectId,
    }
);

module.exports = mongoose.model('Logs', logSchema);