const jwt = require("jsonwebtoken")
const user = require("../models/user")
require("dotenv").config();

exports.signup = async(req , res , next) =>{
    const email = req.body.email;
    const password = req.body.email;
    const confirmPassword = req.body.email;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const username = req.body.username;
    const aadhaar = req.body.aadhaar;
    if(password != confirmPassword){
        throw Error("bruh")
    }
    //TODO sendgrid, they declined my email lmaooo
    const token = jwt.sign({email: email} , process.env.jwt_secret_key, {algorithm: "HS256", expiresIn: process.env.access_token_life})
    const NewUser = new user({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        aadhaar: aadhaar,
        token: token
    })
    NewUser.save().then(
    (a)=>{
        res.status(200).send({"sex" : token})
    }
    ).catch((error) => {
        //TODO Better error
        res.status(400).send({"Note" : "Something went wrong yaar"})
        //res.status(200).send({"sex" : "randi"})
    })
    console.log(req.body)
    //res.status(200).send({"sex" : token})
}
