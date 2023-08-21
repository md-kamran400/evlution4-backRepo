const {Router, query} = require("express");
const PostModel = require("../models/post.model");
const auth = require("../middleware/auth.middlware")
const postRouter = Router();


postRouter.get("/", async(req, res)=>{
      const {device1, device2} = req.body;
      const {userId} = req.body;
      const Query = {};
      if(userId){
        Query.userId = userId
      }

      if(device1 && device2){
        Query.device = {$and: [{device: device1}, {device: device2}]}
      }
      else if(device1){
        Query.device = device1
      }
      else if(device2){
        Query.device = device2
      }
    try {
        const post = await PostModel.find(Query)
       
        res.status(200).json({meg: "user Post", post});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});


postRouter.post("/add", async(req, res)=>{
    try {
        const newPost = await new PostModel(req.body);
        newPost.save()
        res.status(200).json({msg: "Post created", post: newPost})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} );


bookRouter.patch("/update/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        let post = await PostModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(200).json({msg: "posts Updated"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

bookRouter.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        let post = await PostModel.findByIdAndDelete(id)
        res.status(200).json({msg: "posts deleted"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = postRouter;