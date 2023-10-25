import { cartsModel } from "../models/carts.model.js";
import { productsManager } from "./ProductsmanagerDB.js";

class CartsManager {

    async findAll(){
        const result = await cartsModel.find()
        return result;

    }
    async findById(id){
        const result = await cartsModel.findById(id);
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
    async updateOne(id,obj){
        /* const carts = await cartsManager.findAll();
        const Cart = await cartsManager.findById (idCart);
        if(Cart){
          const Product = Cart.products.find(u=>u.id===id);
          if(Product){
            const index = Cart.products.findIndex(u=>u.id==id)
            Cart.products[index].qty += 1
          }else{
            const newProd = {id,qty: 1}
            Cart.products.push(newProd)
          }
          const filterCart = carts.filter (u=>u.idCart != idCart)
          filterCart.push (Cart) */
        const result = await cartsModel.updateOne({_id: id }, obj);
        return result

    }
    async deleteOne(id){
        const result = await cartsModel.deleteOne ({_id: id})
        return result
    }
}


export const cartsManager = new CartsManager()