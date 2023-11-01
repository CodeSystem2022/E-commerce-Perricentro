// FUNCIONALIDAD DE BUSQUEDA PARA EL CARROUSEL
const carousel = document.getElementById("carousel"); // llamamos al carrusel

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe

    const busqueda = buscador.value.toLowerCase(); // pasamos todo a minúsculas

    // Realizamos la consulta a la API para obtener los productos
    fetch('http://localhost:3000/api/productos/todos')
        .then((response) => response.json())
        .then((data) => {
            const resultados = data.filter((producto) => {
                return producto.product_name.toLowerCase().includes(busqueda);
            });

            // Limpiamos el contenedor de productos
            shopContent.innerHTML = ""; // Mandamos al HTML, vacío

            // Si hay resultados, se muestran los productos que coincidieron con la búsqueda
            if (resultados.length > 0) {
                resultados.forEach((producto) => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    // Se manda toda la información al index con los detalles de cada producto encontrado
                    card.innerHTML = `
                        <img src="${producto.img}" alt="${producto.product_name}">
                        <h2>${producto.product_name}</h2>
                        <p>Precio: $${producto.price}</p>
                    `;
                    shopContent.appendChild(card); // Insertamos uno a uno los productos para mostrarlos
                });

                // Ocultamos el carrusel cuando se muestran los resultados de la búsqueda
                carousel.classList.add("hidden");
            } else {
                // Si no coinciden los filtros de búsqueda ingresados con nuestros productos
                shopContent.innerHTML = "<p>No se encontraron productos con ese nombre.</p>";
                // Se vuelve a mostrar el carrusel
                carousel.classList.remove("hidden");
            }
        })
        .catch((error) => {
            console.error("Error al obtener los productos: " + error); //Se trabaja con manejo de errores
        });
});
