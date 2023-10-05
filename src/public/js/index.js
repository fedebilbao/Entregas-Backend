
console.log("probando websocket")
const socketClient = io();
const form = document.getElementById("form");
const inputPrice = document.getElementById("price"); 
const priceP = document.getElementById("priceP");
const inputTitle = document.getElementById("title"); 
const titleP = document.getElementById("titleP");
const inputDescription = document.getElementById("description"); 
const descriptionP = document.getElementById("descriptionP");
const inputCategory = document.getElementById("category"); 
const categoryP = document.getElementById("categoryP");
const inputStock = document.getElementById("stock"); 
const stockP = document.getElementById("stockP");

/* const inputTitle = document.getElementById("title"); */

form.onsubmit=(e)=>{
    e.preventDefault()
    const price = inputPrice.value;
    const description = inputDescription.value;
    const category = inputCategory.value;
    const stock = inputStock.value;
    const title = inputTitle.value;
    socketClient.emit("newProduct", price,description,category,stock,title);
    
}


socketClient.on("productUpdated", (price,description,category,stock,title)=>{
    priceP.innerText = price;
    titleP.innerText = title;
    descriptionP.innerText = description;
    categoryP.innerText = category;
    stockP.innerText = stock;
})
