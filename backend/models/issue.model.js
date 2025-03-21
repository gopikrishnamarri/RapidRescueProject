// issue.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    mechanic_Id: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Mechanic", default: null }

});

module.exports = mongoose.model('Issue', issueSchema);