const shopContent = document.getElementById("shopContent");
const cart = []; //este es nuestro carrito, un array vacío

fetch('http://localhost:3000/api/productos/todos') //Realizamos la consulta
  .then((response) => response.json()) // obtenemos la respuesta
  .then((data) => { // extraemos los datos
    data.forEach((product) => { // remplazamos el arreglo de products.js por data y el resto se mantiene igual
        const content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.product_name}</h3>
        <p>$ ${product.price} </p>
        `;
        shopContent.append(content);

        const buyButton = document.createElement("button");
        buyButton.innerText = "Comprar";

        content.append(buyButton);

        buyButton.addEventListener("click", ()=>{
            const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
            if (repeat) {
                cart.map((prod) => {
                    if (prod.id === product.id){
                        prod.quanty++;
                        displayCartCounter();
                    }
                });            
            }else{
                cart.push({
                    id: product.id,
                    product_name: product.product_name,
                    price: product.price,
                    quanty: product.quanty,
                    img: product.img,
                });
                displayCartCounter();
            }
            //console.log(cart)
        });
    });
});