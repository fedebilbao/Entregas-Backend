import { Router } from "express";
import { usersManager } from "../db/managers/usersManager.js";

const router = Router();

router.post("/signup", async(req,res) =>{
    const {first_name,last_name,email,password} = req.body
    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const createdUser = await usersManager.createOne(req.body);
        res.status(200).json({message:"User created", user: createdUser});
    } catch(error){
        res.status(500).json({error});
    }
})


router.post ("/login", async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const user = await usersManager.findByEmail(email);
        if(!user){
            return res.redirect("/api/views/signup");
        }
        const isPasswordValid = password === user.password;
        if(!isPasswordValid){
            res.status(401).json({message: "Password is not valid"});
        }
        const sessionInfo = ( email === "adminCoder@coder.com" && password === "adminCod3r123") ? {email, first_name: user.first_name, isAdmin:true} : {email, first_name: user.first_name, isAdmin:false}
        req.session.user = sessionInfo;
        res.redirect("/api/views/profile");
        } catch(error){
        res.status(500).json({error});
    }

    router.get ("/signout", (res,req)=>{
        req.session.destroy(()=>{
            res.redirect("/login");
        })
    })

})
export default router;