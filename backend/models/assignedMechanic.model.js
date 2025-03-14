const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignedMechanicSchema = new mongoose.Schema({
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user_Name: { type: String, required: true },
    mechanic_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Mechanic", required: true },
    mechanic_Name: { type: String, required: true },
    issueType: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    photoUrl: { type: String, required: false },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
}, { timestamps: true });

module.exports = mongoose.model("AssignedMechanic", assignedMechanicSchema);
