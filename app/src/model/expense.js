const mongoose =require("mongoose")

const Expense = new mongoose.Schema({
    amount : {
        type : Number
    }
    ,
    category : {
        type : String
    }
    ,
    Date : {
        type : String,
        default : new Date().toLocaleDateString()
    }
    ,
    payment_method : {
        type : String,
    }
    ,
    user : {
        type : mongoose.Schema.ObjectId,
        ref:'User'
    }
    ,
    notes : {
        type : String
    }
    
})  

const Exp = mongoose.models.Exp || mongoose.model("Exp", Expense);
export default Exp;

