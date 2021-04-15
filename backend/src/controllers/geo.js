const redis = require("redis");
const redisPort = 6379;
const client = redis.createClient(redisPort);
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
