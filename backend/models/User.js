const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim:true
        },
        email:{
            type : String ,
            required: true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        securityQuestion:{
            type: String,
            required: true,
            enum:[
                "What is your mother's hometown?",
                "What was the name of your first school?",
                "What is the name of your first pet?",
                "What is your favorite teacher's name?"
            ]
        },
        securityAnswer:{
            type:String,
            required:true
        }
        ,
        profileImage:{
            type: String,
            default: ""
        }

    },{
        timestamps:true
    }
);

module.exports = mongoose.model("User", userSchema);