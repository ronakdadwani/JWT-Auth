const userModel = require("../model/userSchema");
const emailValidator = require("email-validator")


const signUp = async (req , res , next)=>{
    const {name , email , password , confirmPassword} = req.body;


    console.log(name , email, password , confirmPassword);


    // validate all fields are provided
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        });
    }
    // validate the email format

    const validEmail = emailValidator.validate(email)
    if (!validEmail) {
        return res.status(400).json({
            success:false,
            message: "Please provide a valid email"
        })
        
    }

        // validate the password and confirmpassword are same 

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

const signIn = async (req , res) =>{
    try {
    const {email , password} = req.body;
    // console.log("Request body :" , req.body);
    
    // console.log(`Data is received this : ${email} and for password ${password}`);
    

    // if(!email || !password){
        
    //     return res.status(400).json({
    //         success : false,
    //         message : "Every field is     required"
    //     })
    // }

        const user = await userModel
        .findOne({email})
        .select('+password');

        if(!user || user.password !== password){
            return res.status(400).json({
                success : false,
                message: "invalid credentials"
            })

        }
        const token = user.jwtToken(); 
        user.password = undefined;

        const cookieOption = {
            maxAge : 24 * 60 * 60 * 1000,
             httpOnly : true
        }

        res.cookie("token" , token , cookieOption);
        res.status(200).json({
            success : true,
            data: user
        })


    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: "Server error",
    })
} 
}


const getUser = async (req , res , next) =>{
    const userId = req.user.id;

    try{
        const user = await userModel.findById(userId)
        return res.status(200).json({
            succes: true,
            data : user
        })
    } catch (e) {
        return res.status(400).json({
            succes: false,
            message: e.message
        })
    }
}



module.exports = {
    signUp,
    signIn,
    getUser
}