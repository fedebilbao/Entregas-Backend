import { productsModel } from "../models/products.model.js";

class ProductsManager {

    async findAll(){
        const result = await productsModel.find()
        return result;

    }
    async findById(id){
        const result = await productsModel.findById(id);
        return result

    }
    async createOne(obj){
        const products = await productsManager.findAll ({});
      let id
      if(!products.length){
          id=1
      }   else{
          id=products[products.length-1].id+1
      }
        const result = await productsModel.create({id,...obj})
        return result
    }
    async updateOne(id,obj){
        const result = await productsModel.updateOne({_id: id }, obj);
        return result

    }
    async deleteOne(id){
        const result = await productsModel.deleteOne ({_id: id})
        return result
    }
}


export const productsManager = new ProductsManager()