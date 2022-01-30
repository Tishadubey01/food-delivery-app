const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Validator = require("../validators/register")
const bcrypt = require('bcryptjs');

// Create Schema
const FoodSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    food_type: {
        type: String,
        enum : ['Veg','Non-veg']

    },
    price: {
        type: Number,
        require:true
    },
    
    total_quantity: {
        type: Number,
        required: true 
    },
    quantity_remain: {
        type: Number,
        
    },
    images: {
        type: String,
        default: ""
    },
    availability: {
        type:String,
        enum: ['JC','VC','BBC']
    },
    description: {
        type: String
    },
    vendor: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String,
        enum:['Available','Placed','Waiting','Deleted']
    },
    addons1: {
       
        type: String
    },
    add1price: {
        type:Number,
    },
    add2price: {
        type:Number,
    },
    add3price: {
        type:Number,
    },
    addons2: {
        type: String
    },
    addons3: {
        type: String
    }

});
module.exports = Food = mongoose.model("Food", FoodSchema);