const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,res,next) => {
    try{
        // find the token in request body
        const token = req.body.token;
        // verify the token are present or not
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is required"
            });
        }
        //verify the token with using secret key
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }

}


exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role !== 'student'){
            return res.status(401).json({
                success: false,
                message: "this route procted for student"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "user role is not matched"
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role !== 'admin'){
            res.status(401).json({
                success: false,
                message: "this route procted for admin"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "user role is not matched"
        })
    }
}