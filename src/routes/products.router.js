import {Router} from "express"
import {manager} from "../ProductManager.js";

const router = Router();

router.get("/",async(req,res)=>{
    try{
        const products = await manager.getProducts(req.query);
        res.status(200).json({message:"Products found", products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.get("/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const product = await manager.getProductById(+id);
        if(!product){
            return res
            .status(404)
            .json({message: "Producto no encontrado con este id"});
        }
        res.status(200).json({message:"User found",product});
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post("/", async(req,res)=>{
    const {title, description, price, code, category, stock} = req.body;
    if(!title || !description || !price || !code || !category || !stock) {
        return res.status(400).json({message:"falta información"});
    }
    try{
        const response = await manager.addProduct(req.body);
        res.status(200).json({message:"Producto creado", producto: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }

}) 

router.delete ("/:id", async(req,res) =>{
    const {id} =req.params;
    try{
        const response = await manager.deleteProduct(+id);
        if(!response){
            return res
            .status(404)
            .json({message:"Producto no encontrado con el id"});
        }
        res.status(200).json({message:"Producto Eliminado"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

router.put("/:id", async(req,res)=>{
    const{id} =req.params;
    try{
        const response =await manager.updateProduct(+id,req.body);
        if(!response){
            return res
            .status(404)
            .json({message:"Producto no encontrado con el id"});
        }
        res.status(200).json({message:"Producto Modificado"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

export default router