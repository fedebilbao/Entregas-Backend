export const authMiddleware = (req,res,next)=>{
    const {age} =req.body
    if(age<18){
        return res.status(401).json({message:"Usted precisa ser mayor de 18 años"});
    }
    next();
};