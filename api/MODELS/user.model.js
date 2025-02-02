import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    avatar: {
        type: String,
        required: true,
         default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKFXnQPm3COQ9nPZiMmbhvfo-sAHvBozV_A&s",
    },
}, { timestamps: true }); 

const User = mongoose.model("User", userSchema); //singular name user will be converted to plural users by mongoose if more than one user is there

export default User; //we can now use User model anywhere in our project  
