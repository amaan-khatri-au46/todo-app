// importing mongoose from mongoose

const mongoose = require("mongoose");


// Here We Had Created a Mongoose Schema 

const TodoItemSchema = new mongoose.Schema({
    item : {
        type:String,
        required:true
    }
})


module.exports = mongoose.model('todo', TodoItemSchema);