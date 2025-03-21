// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const serviceSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, 'Service name is required'],
//     unique: true // Ensure service names are unique
//   },
//   description: {
//     type: String,
//     required: false // Optional
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the user (admin or mechanic) who created the service
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Service', serviceSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const serviceSchema = new Schema({
//     service_name: {
//         type: String,
//         required: [true, "Service name is required"],
//         unique: true
//     },
//     // description: {
//     //     type: String,
//     // },
//     // price: {
//     //     type: Number,
//     // },
//     createdBy: {
//         type: Schema.Types.ObjectId,
//         refPath: 'role', // References either 'Admin' or 'Mechanic'
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['Admin', 'Mechanic'],
//         required: true
//     },
//     deleteFlag: {
//         type: Boolean,
//         default: false
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model("Service", serviceSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    service_name: {
        type: String,
        required: [true, "Service name is required"], // ✅ Prevents null values
        unique: true, // ✅ Ensures no duplicates
        trim: true, // ✅ Removes extra spaces
    },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     refPath: 'role', // ✅ Links to either 'Admin' or 'Mechanic'
    //     required: true
    // },
    role: {
        type: String,
        enum: ['Admin', 'Mechanic'],
        required: true
    },
    deleteFlag: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// ✅ Recreate the unique index (after dropping old one)
// serviceSchema.index({ service_name: 1 }, { unique: true });

module.exports = mongoose.model("Service", serviceSchema);
