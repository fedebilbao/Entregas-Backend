/* import fs from 'fs';
import { busqueda } from './ProductManager';

class CartManager {
    constructor(path){
      this.path = path
    }
    async getCarts(queryObj ){
    const {limit}= queryObj;
    try{
      if(fs.existsSync(this.path)){
        const cartFile = await fs.promises.readFile (this.path, "utf-8");
        const cartsData = JSON.parse(cartFile);
        return limit ? cartsData.slice(0,+limit) : cartsData;
      } else {
       return []
      }

    } catch(error) {
      return error
    }
  }

    async createCart (cart) {
        try{
            const carts = await this.getCarts ({});
            let idCart
            if(!carts.length){
                idCart=1
            }   else{
                idCart=carts[carts.length-1].id+1
            }      
            const NewCart ={idCart, "products":[cart]};
            carts.push(NewCart)
            await fs.promises.writeFile (this.path, JSON.stringify(carts));
            return NewCart
        } catch (error) {
            return error
        }
    }
    async addProductToCart (idCart,id) {
      try{
        const Cart = await this.getCartById (idCart);
        if(Cart){
          const Product = Cart.find(u=>u.id===id);
          if(!Product){
            busqueda
          }
        }

      }catch (error) {
        return error
    }
    }

    async getCartById(idCart) {
        try {
          const carts = await this.getCarts({});
          const cart = carts.find (u=>u.idCart===idCart);
          return cart;
        } catch (error) {
          return error
        }
      }
}

export const manager = new CartManager("./src/carrito.json"); */