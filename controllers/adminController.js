const admin = require('../models/adminModel');


const adminAuthorization = ((req,res)=>{
    admin.findOne({username: req.body.username}, (err,data)=>{
        if(err){
            res.json("User not found");
        }
        else{
            if(data.password === req.body.password){
                res.setHeader('Set-cookie', "token=valid")
                res.json("You are successfully logged in ");
            }
            else{
                res.setHeader('Set-cookie', "token=invalid")
                res.json("Please enter your correct password ");
            }
        }
    })
});

const newAdmin = ((req,res)=>{
    let newadmin = new admin({
        username: req.body.username,
        password: req.body.password
    })
    newadmin.save((err)=>{
        if(err){
            res.json("Unfortunately admin was not saved");
            console.log("admin was not save due to this error",err);
        }
        else{
            res.json("Admin saved in our database")
        }
    })
});

module.exports ={ 
    adminAuthorization,
    newAdmin
}