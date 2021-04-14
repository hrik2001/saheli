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
        required: true,
        unique: true
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
    },
    token: String,
    resetToken: String,
    resetTokenExpiration: Date

} , {timestamps: true})

UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12) //default is 10 but have seen people using 8 too
    }
    next()
})

module.exports = mongoose.model( "user" , UserSchema)
