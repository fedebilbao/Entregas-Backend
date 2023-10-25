import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema ({
    idCart:{
        type:Number,
        required:true,
        unique:true
    },
    products:[
        {
            id:{
                type:Number,
            },
            qty:{
                type:Number,
            }
        }
    ]

});

export const cartsModel = mongoose.model("Carts",cartsSchema)