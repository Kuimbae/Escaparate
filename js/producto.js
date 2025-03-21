document.addEventListener("DOMContentLoaded", () => {
    const tipos = document.querySelectorAll(".tipo"); // Categorías dentro del menú
    const contenedorImagenes = document.querySelector(".contenedor-imagenes");
    const menuHamburguesa = document.querySelector(".menu-hamburguesa");
    const barraLateral = document.querySelector(".barra-lateral");

    let imagenesPorCategoria = {}; // Objeto para almacenar los datos del JSON

    // Cargar datos desde el archivo JSON
    fetch("json/imagenes.json")
        .then(response => response.json())
        .then(data => {
            imagenesPorCategoria = data;
        })
        .catch(error => console.error("Error al cargar el JSON:", error));

    // Función para cargar productos con imágenes, precios y descripciones
    function cargarProductos(categoria) {
        contenedorImagenes.innerHTML = ""; // Limpiar los productos anteriores

        if (imagenesPorCategoria[categoria]) {
            imagenesPorCategoria[categoria].forEach(producto => {
                // Crear un contenedor para cada producto
                const productoDiv = document.createElement("div");
                productoDiv.classList.add("producto");

                // Crear la imagen del producto
                const imagen = document.createElement("img");
                imagen.src = `img/${producto.imagen}`;
                imagen.alt = producto.nombre;
                imagen.onerror = () => console.error("Error cargando la imagen:", imagen.src);
                productoDiv.appendChild(imagen);

                // Crear el nombre del producto
                const nombre = document.createElement("h3");
                nombre.textContent = producto.nombre;
                productoDiv.appendChild(nombre);

                // Crear el precio del producto
                const precio = document.createElement("p");
                precio.textContent = `Precio: $${producto.precio}`;
                productoDiv.appendChild(precio);

                // Crear la descripción del producto
                const descripcion = document.createElement("p");
                descripcion.textContent = producto.descripcion;
                productoDiv.appendChild(descripcion);

                // Crear el botón de añadir al carrito
                const boton = document.createElement("button");
                boton.textContent = "Añadir al carrito";
                productoDiv.appendChild(boton);

                // Añadir el producto al contenedor
                contenedorImagenes.appendChild(productoDiv);
            });
        } else {
            console.warn("No hay productos para la categoría:", categoria);
        }
    }

    // Evento al hacer clic en una categoría
    tipos.forEach(tipo => {
        tipo.addEventListener("click", (event) => {
            event.preventDefault();
            const categoria = event.target.textContent.trim();
            
            // Cargar los productos de la categoría seleccionada
            cargarProductos(categoria);

            // Luego, cerrar el menú en móviles con un pequeño retraso
            setTimeout(() => {
                barraLateral.classList.remove("mostrar-menu");
            }, 200);
        });
    });

    // --- MENÚ HAMBURGUESA ---
    menuHamburguesa.addEventListener("click", () => {
        barraLateral.classList.toggle("mostrar-menu");
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
        if (!barraLateral.contains(event.target) && !menuHamburguesa.contains(event.target)) {
            barraLateral.classList.remove("mostrar-menu");
        }
    });
});
