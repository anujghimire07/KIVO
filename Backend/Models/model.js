const mongoose = require("mongoose")

const todoSchema=  new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        completed: { type: Boolean, default: false },
        priority: { type: String, enum: ["No Priority", "Low", "Medium", "High"], default: "No Priority" }, //! changed here: added priority field (No Priority / Low / Medium / High)
        date: { type: Date, default: Date.now }, //! changed here: added date field (the date the task was added)
         userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    })

    const userSchema= new mongoose.Schema({
        email:{
            type: String, 
            required: true,
            unique: true
        },
        password:{
            type:String,
            required: true
        }
    })

    const todoModel = mongoose.model("Todo", todoSchema)
    const userModel = mongoose.model("User", userSchema)

    module.exports = {todoModel, userModel}