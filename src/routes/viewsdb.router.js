import {Router} from "express"
import { messageModel } from "../db/models/views.model.js";
import { productsManager } from "../db/managers/ProductsmanagerDB.js";

const router = Router();


router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})

router.get("/",async(req,res)=>{
        try{
            const products = await manager.getProducts(req.query);
            res.render("home",{products});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    });

    router.get("/chat",(req,res)=>{
        res.render("chat")
    })

router.get("/products", async(req,res)=>{
    const products = await productsManager.findAll(req.query);
    const productObject = products.info.payload.map(doc=>doc.toObject());
    console.log(productObject)
    console.log(products);

    res.render("products",{productObject});
})

export default router;