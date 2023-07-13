const express=require("express")
const { connect } = require("./db")
const cors=require("cors")
const { UserRouter } = require("./Routes/User.routs")
const { DashRouter } = require("./Routes/Dashboard.route")
const app=express()
app.use(express.json())
app.use(cors())


app.use("/users",UserRouter)
app.use("/employees",DashRouter)
app.listen(4500,async()=>{
    try {
        await connect
        console.log("connect to port 4500")
    } catch (error) {
        console.log(error)
    }
    
})