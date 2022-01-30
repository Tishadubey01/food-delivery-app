const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Validator = require("../validators/register")
const bcrypt = require('bcryptjs');

const OrderSchema = newSchema({
    vendor_email: {
        type: String,
        unique: true
    },
    buyer_email: {
        type: String,
        unique: true
    },
    food_type: {
        type: String
    },
    quantity: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Accepted', 'Placed', 'Cooking', 'Ready for pickup','Completed','Rejected']
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    time: {
        type: Date,
        default: Date.now()
    }
})
module.exports = Order = mongoose.model("Food", OrderSchema);