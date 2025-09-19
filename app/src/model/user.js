import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    // unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  role: {
        type : String,
        enum : ['User', 'Admin'],
        default : 'User'
    }
    ,
    monthly_spending_limit : {
        type : Number,
        default: 0
    }
});


const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;