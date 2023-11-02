import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema ({
    id: {
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:0,
    },

});
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model("Products",productsSchema)