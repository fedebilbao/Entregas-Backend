import express from "express"
import cookieParser from "cookie-parser"
/* import {manager} from "./ProductManager.js" */
import productsdbRouter from "./routes/productsdb.router.js"
import cartsdbRouter from "./routes/cartsdb.router.js"
import viewsdbRouter from "./routes/viewsdb.router.js"
import cookiedbRouter from "./routes/cookiedb.router.js"
import sessionsdbRouter from "./routes/sessionsdb.router.js"
import usersdbRouter from "./routes/usersdb.router.js"
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import "./db/configDB.js";
import session from "express-session";
/* import { fileStore } from "session-file-store"
const FileStore = FileStore(session); */
import MongoStore from "connect-mongo";
import "./passport.js";
import passport from "passport";
import config from "./config.js"


const app =  express();

app.use (express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(__dirname+"/public"));
app.use (cookieParser("SecretCookie"));

const URI = config.mongo_uri

app.use (session({ 
    store: new MongoStore({
        mongoUrl: URI,
    }),
    secret: "secretSession",
    cookie: { maxAge: 60000},
}))

app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views",__dirname+"/views");


app.use("/api/products", productsdbRouter);
app.use("/api/carts", cartsdbRouter);
app.use ("/api/views", viewsdbRouter);
app.use ("/api/sessions", sessionsdbRouter)
app.use ("/api/views/cookie", cookiedbRouter);
app.use ( "/api/users", usersdbRouter);


app.use (passport.initialize());
app.use (passport.session());
/* app.use (session({secret: "secretSession", cookies: {maxAge:60000}}))
 */




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

const httpServer =app.listen(8080, ()=>{
    console.log("Escuchando al puerto")
});

const socketServer = new Server (httpServer)
const messages = [];

socketServer.on("connection",(socket)=>{
    console.log("Cliente conectado: " + socket.id);
    socket.on("disconnect",()=>{

    });
    socket.on("newProduct",(a,b,c,d,e)=>{
        socketServer.emit("productUpdated",a,b,c,d,e);
    });

    socket.on("newUser", (user)=>{
        socket.broadcast.emit("UserConnected", user);
    });
    socket.on ("message", (infoMessage) => {
        messages.push(infoMessage);
        socketServer.emit("chat", messages);
    });
    socket.on("productos", ()=>{
        socketServer.emit("productos",productos)
    })
    


    /* socket.emit("") */
});
