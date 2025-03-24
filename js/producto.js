document.addEventListener("DOMContentLoaded", () => {
    const tipos = document.querySelectorAll(".tipo"); // Categorías dentro del menú
    const contenedorImagenes = document.querySelector(".contenedor-imagenes");
    const menuHamburguesa = document.querySelector(".menu-hamburguesa");
    const barraLateral = document.querySelector(".barra-lateral");
    const carritoContador = document.querySelector(".carrito-contador"); // Contenedor para mostrar el número de artículos en el carrito

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

                // Contenedor para la imagen
                const imagenDiv = document.createElement("div");
                imagenDiv.classList.add("imagen");
                const imagen = document.createElement("img");
                imagen.src = `img/${producto.imagen}`;
                imagen.alt = producto.nombre;
                imagen.onerror = () => console.error("Error cargando la imagen:", imagen.src);
                imagenDiv.appendChild(imagen);
                productoDiv.appendChild(imagenDiv);

                // Contenedor para los detalles (precio, descripción, etc.)
                const detallesDiv = document.createElement("div");
                detallesDiv.classList.add("detalles");

                // Nombre del producto
                const nombre = document.createElement("h3");
                nombre.textContent = producto.nombre;
                detallesDiv.appendChild(nombre);

                // Precio del producto
                const precio = document.createElement("p");
                precio.textContent = `Precio: $${producto.precio}`;
                detallesDiv.appendChild(precio);


                // Contenedor para la cantidad de productos
const cantidadDiv = document.createElement("div");
cantidadDiv.classList.add("cantidad");

// Botón para disminuir cantidad
const botonMenos = document.createElement("button");
botonMenos.classList.add("boton-cantidad", "boton-menos");
botonMenos.innerHTML = "&#8722;"; // Símbolo de menos (−)
botonMenos.onclick = () => {
    let cantidadInput = parseInt(cantidadInputField.value);
    if (cantidadInput > 1) {
        cantidadInput--;
        cantidadInputField.value = cantidadInput;
    }
};
cantidadDiv.appendChild(botonMenos);

// Campo de entrada para la cantidad
const cantidadInputField = document.createElement("input");
cantidadInputField.type = "number";
cantidadInputField.value = 1;
cantidadInputField.min = 1;
cantidadInputField.max = 99;
cantidadInputField.setAttribute("readonly", true);
cantidadInputField.classList.add("cantidad-input");
cantidadDiv.appendChild(cantidadInputField);

// Botón para aumentar cantidad
const botonMas = document.createElement("button");
botonMas.classList.add("boton-cantidad", "boton-mas");
botonMas.innerHTML = "&#43;"; // Símbolo de más (+)
botonMas.onclick = () => {
    let cantidadInput = parseInt(cantidadInputField.value);
    cantidadInput++;
    cantidadInputField.value = cantidadInput;
};
cantidadDiv.appendChild(botonMas);

detallesDiv.appendChild(cantidadDiv);


                // Al añadir un producto al carrito
const boton = document.createElement("button");

boton.classList.add("btnAgregarCarrito"); 
boton.textContent = "Añadir al carrito";
// Al añadir un producto al carrito
boton.onclick = () => {
    const cantidad = cantidadInputField.value;
    console.log(`Producto añadido al carrito: ${producto.nombre} x${cantidad}`);

    // Crear un objeto del producto con la cantidad seleccionada
    const productoCarrito = {
        nombre: producto.nombre,
        imagen: producto.imagen,
        precio: producto.precio,
        cantidad: cantidad
    };

    // Obtener el carrito actual del localStorage, o un array vacío si no existe
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Añadir el nuevo producto al carrito
    carrito.push(productoCarrito);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar el contador del carrito
    actualizarContadorCarrito();
};

detallesDiv.appendChild(boton);


                // Añadir el contenedor de detalles al producto
                productoDiv.appendChild(detallesDiv);

                // Añadir el producto al contenedor principal
                contenedorImagenes.appendChild(productoDiv);
            });
        } else {
            console.warn("No hay productos para la categoría:", categoria);
        }
    }

    // Función para actualizar el contador de artículos en el carrito
    function actualizarContadorCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let totalArticulos = 0;

        // Sumar todas las cantidades de los productos en el carrito
        carrito.forEach(producto => {
            totalArticulos += parseInt(producto.cantidad);
        });

        // Actualizar el número de artículos en el carrito
        carritoContador.textContent = totalArticulos;
    }

    // Llamar a la función para mostrar el número de artículos al cargar la página
    actualizarContadorCarrito();

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
