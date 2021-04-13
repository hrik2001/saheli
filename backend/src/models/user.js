//TODO: Write update validators
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Invalid email :: " + value)
            }
        }
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    aadhaar: {
        type: Number,
        validate(value){
            if(value.toString().length != 12){
                throw Error("Invalid Aadhaar :: "+value.toString())
            }
        }
    },
    verified: {
        type: Boolean,
        default: false
    },
    outside: {
        type: Boolean,
        default: false
    },
    guid: {
        type: String,
        default: ""
    },
    destination: {
        type: String,
        default: ""
    },
    vehicle: {
        type: String,
        default: "walk",
        enum: ["walk" , "taxi", "bus", "bicycle", "motorbike"]
    },
    danger: {
        type: Boolean,
        default: false
    },
    prefer: {
        type: Number,
        default: 500
    }

} , {timestamps: true})
