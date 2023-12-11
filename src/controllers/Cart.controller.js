import {findAll, findById, createOne, updateOne} from "../services/cart.service.js"

export const findCart = (req,res)=>{
    const {idCart} = req.params
    try{
        const cart = findById(idCart);
        if(!cart){
            return res
            .status(404)
            .json({message: "Carrito no encontrado con este id"});
        }
        res.status(200).json({message:"Carrito encontrado",cart});
    } catch(error){
        res.status(500).json({message:error.message});
    }
};

export const createCart = (req,res)=>{
    try{
        const response =  createOne();
        res.status(200).json({message:"Carrito creado", Carrito: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }

}

export const updateCart =(req,res)=>{
    const {idCart} =req.params
    try{
        const response =  updateOne(idCart);
        res.status(200).json({message:"Se modificó tu carrito", Carrito: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }


}