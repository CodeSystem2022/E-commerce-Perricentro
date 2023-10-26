// FUNCIONALIDAD DE BUSQUEDA PARA EL CARROUSEL

const carousel = document.getElementById("carousel"); // llamamos al carrusel


document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe

    const busqueda = buscador.value.toLowerCase(); // pasamos todo a minúsculas

    // Filtramos los productos que tienen las letras que ingresa el usuario en su nombre
    const resultados = productos.filter((producto) => {
        return producto.productName.toLowerCase().includes(busqueda);
    });

    // Limpiamos el contenedor de productos
    shopContent.innerHTML = ""; //mandamos al html, vacío

    // Si hay resultados, se muestran los productos que coincidieron con la búsqueda
    if (resultados.length > 0) { //si hay mas de una coincidencia
        resultados.forEach((producto) => { //para cada producto que coincida
            const card = document.createElement("div"); //creamos un div para mostrarlo
            card.classList.add("card");
            //Se manda toda la información al index con los detalles de cada producto encontrado
            card.innerHTML = ` 
                <img src="${producto.img}" alt="${producto.productName}">
                <h2>${producto.productName}</h2>
                <p>Precio: $${producto.price}</p>
            `;
            shopContent.appendChild(card); //insertamos uno a uno los productos para mostrarlos
        });

        // Ocultamos el carrusel cuando se muestran los resultados de la búsqueda
        carousel.classList.add("hidden"); //hidden es 'ocultar'
    } else { //si no coinciden los filtros de búsqueda ingresados con nuestros productos
        shopContent.innerHTML = "<p>No se encontraron productos.</p>";
        // Se vuelve a mostrar el carrusel
        carousel.classList.remove("hidden"); //retiramos la clase hidden y lo volvemos a hacer 'visible'
    }
});
