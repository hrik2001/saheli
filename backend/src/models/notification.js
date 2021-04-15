const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    issuer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    issuee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("notification" , notificationSchema)
