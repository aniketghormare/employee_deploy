const mongoose=require("mongoose")


const Userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmpassword:String
},{
    versionKey:false
})



const Usermodel=mongoose.model("user",Userschema)



module.exports={
    Usermodel
}