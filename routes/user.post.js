const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const { blackListModel } = require("../models/blackList.model")

const userRouter = Router()


userRouter.post("/register", async(req, res)=>{
    try {
        const email = req.body.email;
        const user = await userModel.findOne({email});
        if(user){
            res.status(400).json({msg: "user already exist"});
        }else{
            bcrypt.hash(req.body.password, 10, async(error, hash)=>{
                if(hash){
                    const newUser = new userModel({
                        ...req.body,
                        password: hash,
                    });
                    await newUser.save();
                    res.status(200).json({msg: "user register successFully"})
                }
            })
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


// userRouter.post("/login", async(req, res)=>{
//     const {email, password} = req.body;
//     try {
//         const user = await userModel.findOne({email})
//         if(user){
//             bcrypt.compare(password, user.password, (error, res)=>{
//                 if(res){
//                     let token = jwt.sign({userId: user._id}, "masasiSchool");
//                     res.status(200).json({msg: "login successfully", token})
//                 }
//                 else{
//                     res.status(200).json({msg: "passowrd is incorrect"})
//                 }
//             })
//         }
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// })


userRouter.post("/login", async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    try {
                        let token = jwt.sign({userId: user._id}, "masasiSchool");
                        return res.status(200)
                        .json({msg: "login successfully", token})
                    } catch (error) {
                        res.status(400).json({error: error.message})
                    }
                }
                res.status(400).json({msg: "login failed wrong paswrod provided"})
            })
        }
        else res.status(200).json({msg: "login failed user not found"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

userRouter.post("/logout", async(req, res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]||null;
        if(token){
            await blackListModel.updateMany({}, {blacklist: [token]});
            res.status(200).json({msg: "Logout successfully"})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports=userRouter