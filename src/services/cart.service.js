import { cartsManager } from "../dao/managers/CartManager.js";

export const findAll = () => {
    const carts = cartsManager.findAll();
    return carts;
}

export const findById = (id) =>{
    const cart = cartsManager.findById(id);
    return cart
}

export const createOne = (id) =>{
    const cart = cartsManager.createOne(id);
    return cart
}

export const updateOne = (id) =>{
    const cart = cartsManager.updateOne(id);
    return cart
}
