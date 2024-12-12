// import library and model
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import dotenv 
require('dotenv').config();

// create function
exports.signup = async(req , res)=>{
    try{
        //find data in request body
        const { name , email , password , role } = req.body;
        // check if user already present
        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(400).json({
                sucess:false,
                message: "User already exists"
            });
        }

        //hasing the password for sequerity resion
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(e){
            return res.status(500).json({
                sucess: false,
                message: "Error hashing password"
            });
        }
        //create a entry in database
        let newUser = await User.create({name,email,password:hashedPassword,role});

        return res.status(200).json({
            success: true, // Fix here
            message: "entry created successfully",
            data: newUser
        });        
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}

exports.login = async(req,res)=>{
    try{
        // find data
        const {email,password} = req.body;
        // check password and name is present or not
        if(!email || !password){
            return res.status(400).json({
                sucess: false,
                message: "Name and Password are required"
            })
        }
        //check user is aleridy present or not if not present gives error
        const  user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                sucess: false,
                message: "Invalid Credentials"
            })
        }

        // find all data in user body , user are present in database
        const payload ={
            email : user.email,
            id : user._id,
            role : user.role,
        }

        // verifing the passoword
        if(await bcrypt.compare(password,user.password)){
            // creating token
            const token = jwt.sing(payload,process.env.JWT_SECRET,{expireIn:"2h"});

            // add token in user body
            user = user.toObject();
            user.token = token;
            // and hide the password for security resion
            user.password = undefined;

            // sending the user data to client with token
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //  3 days 24 hours 60 minutes 60 seconds and one thousend miles
                httpOnly: true
            }
            res.cookie('token', token, options).json({
                sucess: true,
                token,
                message: "Logged in successfully",
                data: user
            })
        }
        else{
            // password dont matched
            res.status(403).json({
                sucess: false,
                message: "Invalid Credentials"
            })
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            sucess: false,
            message: "Server Error"
        })
    }
}

