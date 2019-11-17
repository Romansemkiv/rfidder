const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now,required: true },
    updatedAt: { type: Date, default: Date.now,required: true },
    description: {type: String, default:''},
    title: {type: String, default:''},
    externalId: {type: String, default:'', unique:true},
    allowed: {type: Boolean, default:false}
},{
    versionKey: false
});

module.exports = mongoose.model('Device', deviceSchema);