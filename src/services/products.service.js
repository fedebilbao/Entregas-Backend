import { productsManager } from "../dao/managers/ProductsmanagerDB.js";

export const findAll = () => {
    const products = productsManager.findAll();
    return products;
}

export const findById = (id) =>{
    const products = productsManager.findById(id);
    return products
}

export const createOne = (id) =>{
    const products = productsManager.createOne(id);
    return products
}

export const updateOne = (id,obj) =>{
    const products = productsManager.updateOne({_id: id }, obj);
    return products
}

export const deleteOne = (id) => {
    const products = productsManager.deleteOne ({_id: id})
    return products
}