import {Router} from "express";
import { findCart, createCart, updateCart} from "../controllers/Cart.controller.js"
import { cartsManager } from "../dao/managers/CartManager";

const router = Router();


router.get("/:idCart", findCart);

router.post("/", createCart);

router.post("/:idCart/product/:id", async(req,res)=>{
    const {id,idCart} = req.params;
    try{
        const response = await cartsManager.addProducToCart(idCart,id);
        res.status(200).json({message:"Producto agregado al carrito", Carrito: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }

})  

router.delete("/:idCart/product/:id", async(req,res)=>{
    const {id,idCart} = req.params;
    try{
        const response = await cartsManager.deleteOne(idCart,id);
        res.status(200).json({message:"Producto eliminado correctamente", Carrito: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
})

router.put ("/:idCart", updateCart)

router.put("/:idCart/product/:id", async(req,res)=>{
    const {id,idCart} =req.params
    try{
        const response = await cartsManager.updateOne(idCart);
        res.status(200).json({message:"Se modificó tu carrito", Carrito: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }
})


export default router