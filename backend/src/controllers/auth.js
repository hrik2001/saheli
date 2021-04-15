const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../models/user")
const group = require("../models/group")
const notification = require("../models/notification")
require("dotenv").config();

exports.signup = async(req , res , next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const username = req.body.username;
    const aadhaar = req.body.aadhaar;
    if(password != confirmPassword){
        throw Error("password and confirmPassword not equal")
    }
    //TODO sendgrid, they declined my email lmaooo
    //const token = jwt.sign({email: email} , process.env.jwt_secret_key, {algorithm: "HS256", expiresIn: process.env.access_token_life})
    const NewUser = new user({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        aadhaar: aadhaar,
        //token: token
    })
    NewUser.save().then(
    (a)=>{
        //res.status(200).send({"Authorization" :"Bearer " + token})
        res.status(200).send({"Type" :"Success" })
    }
    ).catch((error) => {
        //TODO Better error
        res.status(401).send({"Type" : "Error" , "Message":"Signup Failed" + error})
        //res.status(200).send({"sex" : "randi"})
    })
    console.log(req.body)
    //res.status(200).send({"sex" : token})
}

exports.login = async(req , res , next) =>{
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({username: username} , process.env.jwt_secret_key, {algorithm: "HS256", expiresIn: process.env.access_token_life})
    const User = await user.findOne({"username" : username})
    User.token = token;
    const right = await bcrypt.compare(password , User.password)
    console.log(right)
    //right not working
    //right = true
    if(right){
        User.save().then((a)=>{
            res.status(200).send({"Type": "Success", "token" : token})
        }).catch((error)=>{
            res.status(401).send({"Type": "Error" , "Message" : error})
    })
    }else{
        res.status(401).send({"Type": "Error" , "Message" : "Wrong Password"})
    }
}

exports.notification_post = async(req , res, next) =>{
    try{
        const current_user = await user.findOne({username : req.user.username})
        const partner = await user.findOne({username : req.body.partner})
        const notif = new notification({issuer : current_user._id , issuee : partner._id})
        await notif.save()
        res.status(200).send({"Type":"Success"})
    }catch(err){
        res.status(401).send({"Type":"Error" , "Message":err})
    }
}

exports.notification_get = async(req , res , next) =>{
    try{
        const User = await user.findOne({username : req.user.username})
        const result = await notification.find({issuee : User._id})
        res.status(200).send(result)
    }catch(err){
        res.status(401).send({"Type":"Error" , "Message" : err})
    }
}

exports.group = async(req , res, next) =>{
    try{
        const current_user = await user.findOne({username : req.user.username})
        const partner = await user.findOne({username : req.body.partner})
        if(partner.guid == null){
            if(current_user.guid != null){
                partner.guid = current_user.guid
                await partner.save()
            }else{
                const newgroup = new group()
                partner.guid = newgroup._id
                current_user.guid = newgroup._id
                await partner.save()
                await current_user.save()
            }
            res.status(200).send({"Type" : "Success"})
        }else{
            res.status(401).send({"Type" : "Error" , "Message" : "Current user already part of group"})
        }
    }catch(err){
        res.status(401).send({"Type" : "Error" , "Message" : err})
    }
}

exports.leavegroup = async(req , res , next) =>{
    try{
        const current_user = await user.findOne({username : req.user.username})
        current_user.guid = null;
        await current_user.save()
        res.status(200).send({"Type" : "Success"})
    }catch(err){
        res.status(401).send({"Type" : "Error" , "Message" : err})
    }
}
