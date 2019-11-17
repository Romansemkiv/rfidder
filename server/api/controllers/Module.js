const mongoose = require('mongoose');
const Module = require('../models/Module');

// Handle index actions
exports.all = async function (req, res) {
    Module.find()
        .exec()
        .then(modules => {
            res.status(200).json({
                modules
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
    const device = new Module(req.body);
    device.save()
        .then(result => {
            return res.status(201).json({
                message: "Module saved",
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
    Module.findById(req.params.id)
        .exec()
        .then(result => {
            return res.status(201).json({
                message: "Module founded",
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
    const updateOps = req.body;
    updateOps.updatedAt=new mongoose.now();
    Module.findByIdAndUpdate(req.params.id, {$set: updateOps}, {new: true})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Module updated",
                updated: result
            });
        })
        .catch(err => {
            res.status(409).json({
                error: err
            });
        });
};

exports.getID = async function (id, mod) {
    Module.findOne({externalId:id})
    .exec()
    .then(module => {
        mod(module);
    })
    .catch(err => {
    });
};

// Handle delete contact
exports.delete = async function (req, res) {
    Module.findByIdAndRemove(req.params.id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Module deleted",
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