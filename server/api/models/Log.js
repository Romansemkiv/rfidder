const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now,required: true },
    data: {type: String, default:'', required:true},
    module: {type: mongoose.Schema.Types.ObjectId, ref: 'Module', required:true}
},{
    versionKey: false
});

module.exports = mongoose.model('Log', logSchema);