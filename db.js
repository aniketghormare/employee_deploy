const mongoose=require("mongoose")


const connect=mongoose.connect("mongodb+srv://aniket:ghormare@cluster0.qr4dpak.mongodb.net/mocktest?retryWrites=true&w=majority")



module.exports={
    connect
}