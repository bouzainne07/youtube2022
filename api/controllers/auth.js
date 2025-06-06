import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import { createError } from '../utils/error.js';






export const register = async (req,res,next) =>{
    try{
        const salt = bcrypt.genSaltSync(10); 
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            isadmin:req.body.isadmin,

        })

        await newUser.save()
        res.status(201).send("User has been created")
    }catch(err){
        next(err)
    }

}
export const login = async (req,res,next) =>{
    try{
    const user = await User.findOne({
        username:req.body.username
    })
    if (!user) return next(createError(404, "user not found"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) return next(createError(400, "banned request"))
        const token = jwt.sign({id:user._id,isadmin:user.isadmin}, process.env.jwt)
        const {password, isadmin, ...otherDetails} = user._doc;
        res.cookie("access_token",token, {
            httpOnly:true,
        }).status(201).json({...otherDetails});
    }catch(err){
        next(err)
    }

}