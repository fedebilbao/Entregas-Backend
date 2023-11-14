import {Router} from "express"
import { messageModel } from "../db/models/views.model.js";
import { productsManager } from "../db/managers/ProductsmanagerDB.js";
import { cartsManager } from "../db/managers/CartManager.js";

const router = Router();


router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})

router.get("/",async(req,res)=>{
        try{
            res.redirect("/api/views/signup");
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

router.get("/cart/:idCart", async(req,res)=>{
    const {idCart} =req.params
    const cart = await cartsManager.findById(idCart);
    const cartObject = cart.products.map(doc=>doc.toObject());
    console.log (cartObject);

    res.render("cart", {cartObject});
})

router.get ("/cookies", (req,res)=>{
    res.render("cookies");
});

router.get("/login", async(req,res)=>{
    if(req.session.user){
        return res.redirect("/api/views/profile")
    }
    res.render("login")
})

router.get("/signup", async(req,res)=>{
    if(req.session.user){
        return res.redirect("/api/views/profile")
    } 
    res.render("signup")
})

router.get("/profile", async(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    res.render("profile", {user: req.session.user});
})

export default router;