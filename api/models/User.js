const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, required: false, unique: false},
    pob: {type: String, required: false, unique: false},
    occupation: {type: String, required: false, unique: false},
    alignment: {type: String, required: false, unique: false},
    intelligence: {type: String, default: "Unknown",  required: false, unique: false},
    speed: {type: Number, required: false, unique: false},
    favourites: {type: Array, default: []},

},
{timestamps: true}
)

module.exports = mongoose.model('User', UserSchema)