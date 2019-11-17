const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now,required: true },
    updatedAt: { type: Date, default: Date.now,required: true },
    description: {type: String, default:''},
    title: {type: String, default:''},
    externalId: {type: String, default:'', unique:true},
    ports: {type: Number, default:0}
},{
    versionKey: false
});

module.exports = mongoose.model('Module', moduleSchema);