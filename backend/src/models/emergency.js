const mongoose = require("mongoose")

const EmergencySchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    }
},{timestamps : true} )

module.exports = mongoose.model("emergency" , EmergencySchema)
