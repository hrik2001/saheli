const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../models/user")
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
        throw Error("bruh")
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

exports.location = async(req, res, next) =>{
    res.status(200).send({"sex":"chad"})
}
