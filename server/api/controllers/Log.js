const mongoose = require('mongoose');
const Log = require('../models/Log');
const Module = require('../models/Module');

// Handle index actions
exports.all = async function (req, res) {
    Log.find().sort({createdAt: -1}).populate('module')
        .exec()
        .then(logs=> {
            res.status(200).json({
                logs
            });
        })
        .catch(err => {
            res.status(409).json({
                error: err
            });
        });
};

exports.getLast = async function (req, res) {

    Log.find().sort({createdAt: -1}).limit(1).populate("module")
    .exec()
    .then(logs => {
        res.status(200).json({
            logs
        });
    })
    .catch(err => {
        res.status(409).json({
            error: err
        });
    });

};

exports.getLastLogforConfig = async function (id, l) {

    Log.findOne({module:id}).sort({createdAt: -1})
    .exec()
    .then(log => {
        console.log('LOG',JSON.parse(log.data));
        l(JSON.parse(log.data));
    })
    .catch(err => {
        res.status(409).json({
            error: err
        });
    });

};

exports.getTen = async function (req, res) {

    Log.find().sort({createdAt: -1}).limit(10)
    .exec()
    .then(logs => {
        res.status(200).json({
            logs
        });
    })
    .catch(err => {
        res.status(409).json({
            error: err
        });
    });

};

// Handle create contact actions
exports.new = async function (req, res) {
    const log = new Log(req.body);
    log.save()
        .then(result => {
            return res.status(201).json({
                message: "Log saved",
                document: result
            });
        })
        .catch(err => {
            return res.status(409).json({
                errors: err.toString()
            });
        });
};

// Handle view contact info
exports.view = async function (req, res) {
    Log.findById(req.params.id)
        .exec()
        .then(result => {
            return res.status(201).json({
                message: "Log founded",
                document: result
            });
        })
        .catch(err => {
            return res.status(409).json({
                errors: err.toString()
            });
        });
};

// Handle update contact info
exports.update = async function (req, res) {
    const updateOps = {};
    for (const ops of req.body.updateData) {
        updateOps[ops.propName] = ops.value;
    }
    updateOps.updatedAt=new mongoose.now();
    Log.findByIdAndUpdate(req.params.id, {$set: updateOps}, {new: true})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Log updated",
                updated: result
            });
        })
        .catch(err => {
            res.status(409).json({
                error: err
            });
        });
};

// Handle delete contact
exports.delete = async function (req, res) {
    Log.findByIdAndRemove(req.params.id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Log deleted",
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.NewFromMQTT = async function (ID, data) {

    Module.findOne({externalId: ID})
        .exec()
        .then(module => {
            const log = new Log({
                module: module._id,
                data:data
            });
            log.save()
        .then(result => {
            return true
        })
        .catch(err => {
            return false
        });

        })
        .catch(err => {
            return false
        });

};