const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mechanicSchema = new Schema({
    user_Name: {
        type: String,
        required: [true, "please enter user name"],
    },
    user_Email: {
        type: String,
        required: [true, "please enter email"],
    },
    country_code:{
        type: String,
    },
    mobile_no:{
        type: String,
        required: [true, "please enter mobile_no"],
    },
    password: {
        type: String,
        required: [true, "please enter password"]
    },
    garage_name: {
        type: String,
        required: [true, "please enter garage name"]
    },
//     latitude: {
//         type: Number,
//         required: [true, "please enter latitude"]
//     },
//     longitude: {
//         type: Number,
//         required: [true, "please enter longitude"]
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     deleteFlag: {
//         type: Boolean,
//         default: false
//     }
// }, {
//     timestamps: true
// })

location: {
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    }
},
isActive: {
    type: Boolean,
    default: true
},
deleteFlag: {
    type: Boolean,
    default: false
}
}, {
timestamps: true
});

// ✅ Create a 2dsphere index for geospatial queries
mechanicSchema.index({ location: "2dsphere" });


module.exports = mongoose.model("Mechanic", mechanicSchema)
