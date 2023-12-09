import { Router } from "express";
import { usersManager } from "../db/managers/usersManager.js";
import {hashData, compareData, generateToken} from "../utils.js"
import passport from "passport";

const router = Router();

router.post("/signup", async(req,res) =>{
    const {first_name,last_name,email,password} = req.body
    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const hashedPassword = await hashData(password);
        const createdUser = await usersManager.createOne({...req.body, password: hashedPassword,});
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
        const isPasswordValid = await compareData(password, user.password);
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
})

router.post ("/signup", passport.authenticate("signup", {successRedirect: "/api/views/profile", failureRedirect: "/api/views/error"}));

router.post ("/login", passport.authenticate("login",{successRedirect: "/api/views/profile", failureRedirect: "/api/views/error"}));

//signup-login-passport github

router.get("/auth/github", passport.authenticate("github", {scope: ["user:email"]}));

router.get ("/callback", passport.authenticate("github"), (req,res)=>{
    res.send("probando");

});

//signup-login-passport google

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res)=> {
    res.redirect('/profile');
  });


router.get ("/signout", (req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/api/views/login");
    });
});

router.post("/restaurar", async(req,res)=>{
    const {email,password}= req.body
    try{
        const user = await usersManager.findByEmail(email)
        if(!user){
            return res.redirect("/login");
        }
        const hashedPassword = await hashData(password);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message:"Password updated"});
    }catch(error){
        res.status(500).json({error});
    }
})

router.get ("/current", (req,res)=>{
    res.render("user", {user: req.session.user });
    console.log(req.session.user)
})

export default router;