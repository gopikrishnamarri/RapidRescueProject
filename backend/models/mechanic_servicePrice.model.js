const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mechanicServicePriceSchema = new Schema({
    mechanicId: {
        type: Schema.Types.ObjectId,
        ref: "Mechanic", // ✅ Links to the Mechanic model
        required: true
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: "Service", // ✅ Links to the Service model
        required: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    deleteFlag: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("MechanicServicePrice", mechanicServicePriceSchema);
