
const express = require("express")
const { Usermodel } = require("../model/User.model")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const UserRouter = express.Router()



UserRouter.post("/signup", async (req, res) => {
    const { name, email, password,confirmpassword } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.json({ msg: err })
            } else {
                const user = new Usermodel({name,email,password:hash,confirmpassword:hash})
                await user.save()
                res.json({ msg: "User Registered" })
            }
        })

    } catch (error) {
        res.json({ msg: "User not Registered", error })
    }
})

UserRouter.post("/login", async(req, res) => {
     const {email,password}=req.body
     try {
        const user=await Usermodel.findOne({email})
        if(user){
              bcrypt.compare(password,user.password,(err,final)=>{
                if(final){
                     let token=jwt.sign({userID:user._id,user:user.name},"masai")
                     console.log(token)
                    res.json({msg:"Login Success",token})
                }else{
                    res.json({msg:err})
                }
              })
        }else{
            res.json({msg:"User not found 42"})
        }

     } catch (error) {
        res.json({msg:"user not found 46"})
     }
})


module.exports = {
    UserRouter
}

