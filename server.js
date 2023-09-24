import express from "express"
import {manager} from "./ProductManager.js"

const app =  express();

app.use (express.json());
app.get("/api/products",async(req,res)=>{
    try{
        const products = await manager.getProducts(req.query);
        res.status(200).json({message:"Products found", products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

app.get("/aou/products/:id",async(req,res)=>{
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

app.listen(8080, ()=>{
    console.log("Escuchando al puerto")
})