const mongoose = require('mongoose');
const { Schema } = mongoose;

const managerNotas = new Schema({
    userid: { type: String, required: true },
    name: { type: String, required: true },
    text: { type: String, required: true },
    namefile: { type: Boolean, required: true },
    type: { type: String, required: true },
}, { collection: 'notes' }, { versionKey: false });

module.exports = mongoose.model('scNote', managerNotas, 'notes');