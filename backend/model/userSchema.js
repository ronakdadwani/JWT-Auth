const mongoose = require("mongoose");
const {Schema} = mongoose;
const JWT = require('jsonwebtoken');
const userSchema = new Schema({
    name : {
        type : String,
        require: [true , 'user name is Require'],
        minLength : [5 , 'Name must be atleast 5 char'],
        maxLength : [50 , 'Name must be less than 50 char'],
        trim : true
    } ,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,  // Optional: Make the email lowercase 
    },
    
    password : {
        type : String,
        select: false
    },
    forgotPasswordToken: {
        type: String,
    } ,
    forgotPasswordExpiryDate:{
        type: Date
    }
},{
    timestamps : true
});

userSchema.methods = {      
    jwtToken() {
        return JWT.sign(
            {id : this._id , email: this.email },
            process.env.SECRET,
            {expiresIn: '24h'}
            
        )
    }
}

const userModel = mongoose.model('user' , userSchema);
module.exports = userModel;


