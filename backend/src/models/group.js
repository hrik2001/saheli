const mongoose = require("mongoose")

const groupSchema = mongoose.Schema({
    _guid : {
        type: mongoose.Schema.Types.ObjectId
    }     
})

module.exports = mongoose.model("group" , groupSchema)
