import mongoose from "mongoose";

const URI = "mongodb+srv://fedebilbao3:47740646Federicobilbao@cluster0.d4ixrxp.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(URI)
.then(()=>console.log("Conectado a la base de datos"))
.catch((error)=>console.log(error))