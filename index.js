const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const userRouter = require("./routes/user.post");
const postRouter = require("./routes/post.route");
const app = express()
app.use(express.json())
app.use(cors());

const connect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://ka5452488:mongodb123@cluster0.10yjjlt.mongodb.net/users?retryWrites=true&w=majority")
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

app.use("/users", userRouter)
app.use("/posts", postRouter)

const PORT = 7878
app.listen(PORT,()=>{
    connect()
    console.log(`server is running in the port ${PORT}`)
})