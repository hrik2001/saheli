const jwt = require("jsonwebtoken")
const user = require("../models/user")
require("dotenv").config()

const auth = async(req, res, next)=>{
    try{
        const token = req.header('Authorization').replace("Bearer " , "")
        console.log("Token" + token)
        const decoded = jwt.verify(token, process.env.jwt_secret_key)
        console.log(decoded)
        const User = await user.findOne({"username":decoded.username})
        console.log(User)
        if(!User){
            throw Error("Not valid")
        }
        req.user = User
        req.token = token
        next()
    }
    catch(e){
        res.status(401).send({"Type":"Error" , "Message":"Bruh login to kar"})
    }
}

module.exports = auth
