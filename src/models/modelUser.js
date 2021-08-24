const mongoose = require('mongoose');
const { Schema } = mongoose;

const managerNotas = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true },
    type: { type: String, required: true },
}, { collection: 'users' }, { versionKey: false });

module.exports = mongoose.model('scUser', managerNotas, 'users');