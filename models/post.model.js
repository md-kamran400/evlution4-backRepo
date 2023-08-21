const mongoose = require("mongoose");

const PostSchemas = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments : Number
});

const PostModel = mongoose.model("posts",PostSchemas)

module.exports = PostModel


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGUzMTY3NThiMTZkNzEyNDg2MDZkZTciLCJpYXQiOjE2OTI2MDQwNDB9.4xnYjVoeQKR0DUf-8Orr_zVejEcV-xMyAw3hf8EZkrA