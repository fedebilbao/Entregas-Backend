import {Router} from "express";
import {manager2} from "../ProductManager.js";

const router = Router();


router.get("/:idCart",async(req,res)=>{
    const {idCart} = req.params
    try{
        const cart = await manager2.getCartById(+idCart);
        if(!cart){
            return res
            .status(404)
            .json({message: "Carrito no encontrado con este id"});
        }
        res.status(200).json({message:"Carrito encontrado",cart});
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post("/", async(req,res)=>{
    try{
        const response = await manager2.createCart();
        res.status(200).json({message:"Carrito creado", Carrito: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }

})  

router.post("/:idCart/product/:id", async(req,res)=>{
    const {id,idCart} = req.params;
    try{
        const response = await manager2.addProductToCart(+idCart,+id);
        res.status(200).json({message:"Producto agregado al carrito", Carrito: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }

})  


export default router