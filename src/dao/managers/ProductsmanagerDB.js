import { productsModel } from "../models/products.model.js";

class ProductsManager {

    async findAll(obj){
    var { limit = 10,page = 1, sort, ...query} = obj
        const result = await productsModel.paginate(query,{limit, page, sort: { price: sort}})
        const info ={
            payload: result.docs,
            count: result.totalDocs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? "http://localhost:8080/api/products?page="+result.prevPage : null,
            nextLink: result.hasNextPage ? "http://localhost:8080/api/products?page="+result.nextPage : null,

        };

        return {info};

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