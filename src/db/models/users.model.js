import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        reqiured: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    isGithub:{
        type: Boolean,
        default: false,
    },
    isGoogle: {
        type: Boolean,
        default: false,
    },
    cartId:{
        type:[{ type: mongoose.SchemaTypes.ObjectId, ref: "Carts"}],
        default: [],
    },
    role: {
        type: String,
        enum: ["ADMIN", "PREMIUM", "CLIENT"],
        default: "CLIENT",
    }

});

export const usersModel = mongoose.model("Users", usersSchema)