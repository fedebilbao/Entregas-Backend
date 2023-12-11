import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import {hashData} from "../utils.js"
import passport from "passport";
import { createUser, loguearUser } from "../controllers/users.controller.js";

const router = Router();

router.post("/signup", createUser);


router.post ("/login", loguearUser)

router.post ("/signup", passport.authenticate("signup", {successRedirect: "/api/views/profile", failureRedirect: "/api/views/error"}));

router.post ("/login", passport.authenticate("login",{successRedirect: "/api/views/profile", failureRedirect: "/api/views/error"}));

//signup-login-passport github

router.get("/auth/github", passport.authenticate("github", {scope: ["user:email"]}));

router.get ("/callback", passport.authenticate("github"), (req,res)=>{
    res.redirect("/api/views/profile");
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