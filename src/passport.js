import passport from "passport"
import {usersManager} from "./db/managers/usersManager.js";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as GithubStrategy} from "passport-github2";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import { hashData, compareData } from "./utils.js";


//Local
passport.use("signup", new LocalStrategy({passReqToCallback: true, usesrnameField: "email"}, async(req, email, password, done) => {
    const {first_name,last_name} = req.body
    if(!first_name || !last_name || !email || !password){
        return done (null, false);
    }
    try{
        const hashedPassword = await hashData(password);
        const createdUser = await usersManager.createOne({...req.body, password: hashedPassword});
        done (null, createdUser);
    } catch (error){
        done(error);
    }
})
);


passport.use("login", new LocalStrategy ({ usernameField: "email"}, async(email,password,done)=>{
    if(!email || !password){
        done (null, false);
    }
    try{
        const user = await usersManager.findByEmail(email);
        if(!user){
            return done (null, false);
        }
        const isPasswordValid = await compareData(password, user.password);
        if(!isPasswordValid){
            return done (null, false);
        }
        const sessionInfo = ( email === "adminCoder@coder.com" && password === "adminCod3r123") ? {email, first_name: user.first_name, isAdmin:true} : {email, first_name: user.first_name, isAdmin:false}
        req.session.user = sessionInfo;
        return done (null, user);
        } catch(error){
        done(error);
} 
})
)

//Google

passport.use("google", new GoogleStrategy({
    clientID: "1093197642295-ftbnlphqprv75u8bglgarmlkbdd7hiai.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/api/sessions/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
    try{
        const userDB = await usersManager.findByEmail(profile._json.email);
        if(userDB){
            if(userDB.isGoogle){
                return done(null, userDB);
            }else{
                return done(null, false);
            }
        }
        console.log(profile._json);
    
        const infoUser={
            first_name:profile._json.given_name,
            last_name:profile._json.family_name,
            email: profile._json.email,
            password: " ",
            isGoogle: true,
        };
        const createdUser = await usersManager.createOne(infoUser);
        done(null, createdUser);
    
    }catch(error){
        done(error);
    }
}
))

const fromCookies = (req)=>{
    return req.cookies.token;
}

//JWT
passport.use("jwt", new JwtStrategy({/* jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() */jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]), secretOrKey: "secretJWT", }, async function (jwt_payload, done){
    done(null, jwt_payload)
}))

passport.serializeUser ((user, done) =>{
    done(null, user._id);
});

//Github
passport.use("github", new GithubStrategy({clientID: "Iv1.aa0d529a61ca2cbb" , clientSecret: "fa7383f4c98448ad901eece51b1c14f026bbd684" , callbackURL: "http://localhost:8080/api/sessions/callback"}, async (accesToken, refreshToken, profile, done)=>{
try{
    const userDB = await usersManager.findByEmail(profile._json.email);
    if(userDB){
        if(userDB.isGithub){
            return done(null, userDB);
        }else{
            return done(null, false);
        }
    }
    console.log(profile._json);

    const infoUser={
        first_name:profile._json.name.split(" ")[0],
        last_name:profile._json.name.split(" ")[1],
        email: profile._json.email,
        password: " ",
        isGithub: true,
    };
    const createdUser = await usersManager.createOne(infoUser);
    done(null, createdUser);

}catch(error){
    done(error);
}
}))

passport.deserializeUser(async (id, done)=>{
    try{
        const user = await usersManager.findById(id);
        done(null, user);
    } catch(error) {
        done(error);
    }
});