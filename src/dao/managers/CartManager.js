import { cartsModel } from "../models/carts.model.js";
import { productsManager } from "./ProductsmanagerDB.js";

class CartsManager {

    async findAll(){
        const result = await cartsModel.find()
        return result;

    }
    async findById(id){
        const result = await cartsModel.findById(id).populate("products.id");
        return result

    }
    async createOne(obj){
        const carts = await cartsManager.findAll({});
            let idCart
            if(!carts.length){
                idCart=1
            }   else{
                idCart=carts.length+1
            }      
        const result = await cartsModel.create({idCart,...obj})
        return result
    }
    async updateOne(id){
        const result = await productsManager.findAll({});
        const cart = await cartsModel.updateOne({_id: id }, result);  

        return result

    }

    async addProducToCart (idCart, idProduct){
        const cart = await cartsModel.findById(idCart);
        const productIndex = cart.products.findIndex((p)=>p.id.equals(idProduct));
        if (productIndex === -1){
            cart.products.push ({id: idProduct, qty: 1})
        }
        else{
            cart.products[productIndex].qty++;
        }
        await cart.save();
    }

    async deleteOne(idCart,idProduct){
        const cart = await cartsModel.findById(idCart);
        const result = cart.products.filter ((p)=>p.id != idProduct);
        cart.products= result;
        await cart.save();
    }
}


export const cartsManager = new CartsManager()