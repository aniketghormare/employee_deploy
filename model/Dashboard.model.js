const mongoose=require("mongoose")


const Dashschema=mongoose.Schema({
    name:String,
    lastname:String,
    email:String,
    department :String,
    salary:Number,
    user:String,
    userId:String,
},{
    versionKey:false
})



const Dashmodel=mongoose.model("dash",Dashschema)



module.exports={
    Dashmodel
}