import express from "express"
/* import {manager} from "./ProductManager.js" */
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js";


const app =  express();

app.use (express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

/* app.get("/api/products",async(req,res)=>{
    try{
        const products = await manager.getProducts(req.query);
        res.status(200).json({message:"Products found", products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

app.get("/api/products/:id",async(req,res)=>{
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

 app.post("/api/products", async(req,res)=>{
    const {title, code, password} = req.body;
    if(!title || !code || !password) {
        return res.status(400).json({message:"falta información"});
    }
    try{
        const response = await manager.addProduct(req.body);
        res.status(200).json({message:"Producto creado", producto: response}); 
    }catch(error){
        res.status(500).json({message:error.message});
    }

})  */

app.listen(8080, ()=>{
    console.log("Escuchando al puerto")
})

