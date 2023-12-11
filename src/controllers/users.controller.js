import { findById, createOne, findByEmail } from "../services/users.service.js";
import {hashData, compareData, generateToken} from "../utils.js"

export const createUser = (req,res) =>{
    const {first_name,last_name,email,password} = req.body
    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const hashedPassword = hashData(password);
        const createdUser = createOne({...req.body, password: hashedPassword,});
        res.status(200).json({message:"User created", user: createdUser});
    } catch(error){
        res.status(500).json({error});
    }
}

export const loguearUser = (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user = findByEmail(email);
        if(!user){
            return res.redirect("/api/views/signup");
        }
        const isPasswordValid =  compareData(password, user.password);
        if(!isPasswordValid){
            res.status(401).json({message: "Password is not valid"});
        }
        //sessions

        const sessionInfo = ( email === "adminCoder@coder.com" && password === "adminCod3r123") ? {email, first_name: user.first_name, isAdmin:true} : {email, first_name: user.first_name, isAdmin:false}
        req.session.user = sessionInfo; 
        res.redirect("/api/views/profile");

        //jwt
        /* const {first_name, last_name, role} = user;

        const token = generateToken ({first_name,last_name, email, role}); */
         /* res.json({message:"Token", token }); */
        /* res.status(200).cookie("token", token, {httpOnly: true}).json({message: "Bienvenido", token}); */
        } catch(error){
        res.status(500).json({error});
    }
}