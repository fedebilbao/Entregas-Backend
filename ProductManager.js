import { existsSync, promises} from "fs";
import { createHash} from "crypto"
const path = "Products.json"

class ProductManager {
  async getProducts(queryObj){
    const {limit} = queryObj;
    try{
      if(existsSync(path)){
        const productFile = await promises.readFile (path, "utf-8")
        return JSON.parse(productFile)
        return limit ? productsData.slice(0,+limit) : productsData;
      } else {
        return []
      }

    } catch(error) {
      return error
    }
  }

  async addProduct (product){
    try {
      const { title, description, price, thumbnail, code, stock} = product
 
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log ("Falta un dato para cargar el producto")
        return
      }

      const CodeCheck = this.products.some((p)=> p.code === code)
      if (CodeCheck) {
        console.log("el Code ya fue usado")
        return
      }

      const products = await this.getProducts ({});
      let id
      if(!this.products.length){
          id=1
      }   else{
          id=this.products[this.products.length-1].id+1
      }

      const NewProduct = {id, ...product};
      products.push(NewProduct)
      await promises.writeFile (path, JSON.stringify(products));
      return newUser
    } catch (error) {
      return error
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts({});
      const newArrayProducts = products.filter (u=>u.id!==id);
      await fs.promises.writeFile (path, JSON.stringify(newArrayProducts))
    } catch (error) {
      return error
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts({});
      const product = products.find (u=>u.id===id);
      if(!product){
        return "no existe producto con ese id"
      }
      else{
        return product
      }
    } catch (error) {
      return error
    }
  }

  async updateProduct (id, data) {
    try{
      const products = await this.getProducts()
      const product = products.find (u=>u.id===id)
      if(!product){
        return "no existe producto con ese id"
      }
      else{
        product.price = data;
        const newArrayProducts = products.filter (u=>u.id!==id)
        newArrayProducts.push (product)
        await fs.promises.writeFile (path, JSON.stringify(newArrayProducts))
      }
      
    }
    catch (error) {
      return error
    }
  }

}
/* class ProductManager {
  constructor (){
      this.products = []
  }

getProducts() {
  return this.products
}

getProductByid(idProduct){
  const product = this.products.find((p) =>p.id === idProduct)
  if (!product) {
    console.log("No se encontró el id")
    return
  }
  console.log (product)
  return product
}


addProducts (product) {

  const { title, description, price, thumbnail, code, stock} = product
 
  if (!title || !description || !price || !thumbnail || !code || !stock) {
    console.log ("Falta un dato para cargar el producto")
    return
  }

  const CodeCheck = this.products.some((p)=> p.code === code)
  if (CodeCheck) {
    console.log("el Code ya fue usado")
    return
  }
  

  let id
  if(!this.products.length){
      id=1
  }   else{
      id=this.products[this.products.length-1].id+1
  } 

  const newProduct = {id, ...product}
  this.products.push(newProduct)
  return newProduct
}

}
*/

const product1 = {
  title: "Teclado",
  description: "es un teclado de oficina",
  price: 1000,
  thumbnail: "a",
  code: "ksfg12de56Sjdk",
  stock: 12,
}

/* manager1.addProduct ({
  title: "mouse",
  description: "gamer",
  price: 10000,
  thumbnail: "a",
  code: "ksfg12de56Sjdkd",
  stock: 132,
}) */
async function test(){
  const manager1 = new ProductManager ()
  await manager1.addProduct(product1);
}

test();

export const manager = new ProductManager();


/* manager1.getProductById(2) */ /* control de que funciona el buscador por id*/

 /* console.log(manager1.getProducts()) */  /*control de que el addProducts esta agregando correctamente */
