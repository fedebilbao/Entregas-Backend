import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema ({
    idCart:{
        type:Number,
        required:true,
    },
    products:[
        {
            id:{
                type: mongoose.SchemaTypes.ObjectId,
                ref:"Products",
            },
            qty:{
                type:Number,
            },
            _id:false,
        }
    ]

});

export const cartsModel = mongoose.model("Carts",cartsSchema)