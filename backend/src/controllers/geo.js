const redis = require("redis");
const redisPort = 6379;
const client = redis.createClient(redisPort);
const emergency = require("../models/emergency")
const user = require("../models/user")

exports.location = async(req , res, next) =>{
    const lat = req.body.lat;
    const lon = req.body.lon;
    if(req.user.outside){
        client.geoadd("saheli" , lon , lat , req.user.username , (err , results)=>{
            if(err){
                res.status(401).send({"Type":"Error" , "Message" : err})
            }
            res.status(200).send({"Type":"Success"})
        })
    }else{
        res.status(401).send({"Type":"Error" , "Message":"You need to go outside"})
    }

}

exports.nearme = async(req , res, next) =>{
    const username = req.user.username
    client.geopos("saheli" , username , (err , results)=>{
        if(err){
            res.status(401).send({"Type":"Error" , "Message":err})
        }
        const lon = parseFloat(results[0][0])
        const lat = parseFloat(results[0][1])
        client.georadius("saheli" , lon , lat , req.user.prefer.toString() , "m" , "WITHCOORD" , "WITHDIST" , "ASC" , (err , result)=>{
            if(err){
                res.status(401).send({"Type":"Error" , "Message":err})
            }
            res.status(200).send({result})
        })

    })
}

exports.vehicle = async(req , res, next) =>{
    const User = await user.findOne({"username" : req.user.username})
    User.vehicle = req.body.vehicle
    User.save().then((a)=>{
        res.status(200).send({"Type":"Success"})
    }).catch(
    (e)=>{
        res.status(401).send({"Type":"Error" , "Message":e})
    }
    )
}
exports.destination = async(req , res, next) =>{
    const User = await user.findOne({"username" : req.user.username})
    User.destination = req.body.destination
    User.save().then((a)=>{
        res.status(200).send({"Type":"Success"})
    }).catch(
    (e)=>{
        res.status(401).send({"Type":"Error" , "Message":e})
    }
    )
}
exports.range = async(req , res, next) =>{
    const User = await user.findOne({"username" : req.user.username})
    User.prefer = req.body.range
    User.save().then((a)=>{
        res.status(200).send({"Type":"Success"})
    }).catch(
    (e)=>{
        res.status(401).send({"Type":"Error" , "Message":e})
    }
    )
}
exports.outside = async(req , res, next) =>{
    const User = await user.findOne({"username" : req.user.username})
    User.outside = req.body.outside
    User.guid = null
    if(!req.body.outside){
        client.zrem("saheli" , req.user.username)
    }
    User.save().then((a)=>{
        res.status(200).send({"Type":"Success"})
    }).catch(
    (e)=>{
        res.status(401).send({"Type":"Error" , "Message":e})
    }
    )
}

exports.emergency_get = async(req , res , next) =>{
    try{
        //const User = await user.findOne({"username" : req.user.username})
        const new_emergency = new emergency({username : req.user.username})
        await new_emergency.save()
        res.status(200).send({"Type":"Success"})

    }catch(err){
        res.status(401).send({"Type":"Error" , "Message":err})
    }
} 

exports.leave_emergency = async(req , res, next) =>{
    try{
        await emergency.deleteOne({"username" : req.user.username})
        res.status(200).send({"Type" : "Success"})
    }catch(err){
        res.status(401).send({"Type":"Error" , "Message":err})
    }
}

exports.emergency_post = async(req , res , next) =>{
    try{
        victims = []
        i = 0
        emergency.find().then((emergencies)=>{
            n = emergencies.length
            emergencies.map((emer)=>{
                client.geodist("saheli" , emer.username , req.user.username , "km" , (err , result)=>{
                    console.log(victims , 300)
                    if(err){
                        res.send(401).send({"Type": "Error" , "Message" : err})
                    }
                    const distance = parseFloat(result)
                    //Victim distance set to 5 km here
                    //Change the value if you want to
                    if(distance < 5){
                        victims.push(emer.username)
                        console.log(n , 69)
                        console.log(victims , 22)
                        i = i+1
                        if( i == n){
                            res.status(200).send({"Type":"Success" , "victims" : victims})
                        }
                    }
                })
            console.log(victims , 23)
            })
        })
    }catch(err){
        res.status(401).send({"Type":"Error" , "Message":err})
    }
}
