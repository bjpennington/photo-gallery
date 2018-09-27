const mongoose = require ('mongoose');
let Schema = mongoose.Schema;

let photoSchema = new Schema ({
    path: {type: String, required: true},
    description: {type: String},
    alt_text: {type: String, default: 'some bunny'},
    likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Photo', photoSchema);