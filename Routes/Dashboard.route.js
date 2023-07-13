const express = require("express")
const { auth } = require("../middleware/User.middleware")
const { Dashmodel } = require("../model/Dashboard.model")


const DashRouter = express.Router()



DashRouter.post("/add", auth, async (req, res) => {
    const { name, lastname, email, salary, department,user,userId } = req.body
    try {

        const user1 = new Dashmodel({ name, lastname, email,salary,department,user,userId })
        await user1.save()
        res.json({ msg: "Dsahboard insert success" })


    } catch (error) {
        res.json({ msg: "Dsahboard insert not success", error })
    }
})

DashRouter.get("/", auth, async(req, res) => {
   

    try {
        const {category,page}=req.query
        let skip
        if(page){
            skip=(page-1)*3;

        }else{
            skip=0
        }
        let query={userId:req.body.userId}
       if(category){
            query.category=category
       }
        const data=await Dashmodel.find(query).skip(skip).limit(3)
        res.json({ msg: "get data",data })
    } catch (error) {
        res.json({ msg: error })
    }
    
})




DashRouter.patch("/edit/:noteid",auth, async (req, res) => {
    
    const {noteid}=req.params
    const useriddoc=req.body.userId
    try {
        let note=await Dashmodel.findOne({_id:noteid})
      
        let noteuserid=note.userId
        if(useriddoc===noteuserid){
            await Dashmodel.findByIdAndUpdate({_id:noteid},req.body)
            res.json({msg:"patch done"})
        }else{
            res.json({msg:"not patched"})
        }
    } catch (error) {
        res.send(error)
    }
})

DashRouter.delete("/delete/:noteid",auth, async (req, res) => {
    
    const {noteid}=req.params
    const useriddoc=req.body.userId
    try {
        let note=await Dashmodel.findOne({_id:noteid})
      
        let noteuserid=note.userId
        if(useriddoc===noteuserid){
            await Dashmodel.findByIdAndDelete({_id:noteid})
            res.json({msg:"delete done"})
        }else{
            res.json({msg:"not delete"})
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = {
    DashRouter
}