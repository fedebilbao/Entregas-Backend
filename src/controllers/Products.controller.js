import { findAll, findById, createOne, updateOne, deleteOne } from "../services/products.service.js";

export const findProduct = (req,res)=>{
    try{
        const products = findAll(req.query);
        res.status(200).json({message:"Products found", products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export const findById = (req,res)=>{
    const {id} = req.params
    try{
        const product = findById(id);
        if(!product){
            return res
            .status(404)
            .json({message: "Producto no encontrado con este id"});
        }
        res.status(200).json({message:"Product found",product});
    } catch(error){
        res.status(500).json({message:error.message});
    }
}

export const createProduct = (req,res)=>{
    const {title, description, price, code, category, stock} = req.body;
    if(!title || !description || !price || !code || !category || !stock) {
        return res.status(400).json({message:"falta información"});
    }
    try{
        const response = createOne(req.body);
        res.status(200).json({message:"Producto creado", producto: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }

}

export const deleteProduct = (req,res) =>{
    const {id} =req.params;
    try{
        const response =deleteOne(id);
        if(!response){
            return res
            .status(404)
            .json({message:"Producto no encontrado con el id"});
        }
        res.status(200).json({message:"Producto Eliminado"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

export const updateProduct = (req,res)=>{
    const{id} =req.params;
    try{
        const response = updateOne(id,req.body);
        if(!response){
            return res
            .status(404)
            .json({message:"Producto no encontrado con el id"});
        }
        res.status(200).json({message:"Producto Modificado"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}