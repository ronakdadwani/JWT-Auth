const userModel = require("../model/userSchema");


const signUp = async (req , res , next)=>{
    const {name , email , password , confirmPassword} = req.body;


    console.log(name  , password , confirmPassword);


    // validate all fields are provided
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Every field is required   "
        });
    }
    // validate the email format

    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }


    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "password and confirm doesn't match"
        })
    }

    try {
        const userInfo = userModel(req.body)
        const result = await userInfo.save();
        return res.status(200).json({
            success : true,
            data: result
        });
    } catch (error) {
        if (error.code === 11000){
            return res.status(400).json({
                success : false,
                message : 'Account already exits with provided email id'
        })
        }
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
  
}

module.exports = {
    signUp
}