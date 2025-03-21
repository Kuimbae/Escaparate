
document.addEventListener("DOMContentLoaded", () => {
    const carritoContenedor = document.getElementById("carrito-contenedor");
    const totalElemento = document.getElementById("total");
    let totalCompra = 0;

    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length > 0) {
        carrito.forEach(producto => {
            // Crear un contenedor para el producto
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            // Imagen del producto
            const imagen = document.createElement("img");
            imagen.src = `img/${producto.imagen}`;
            imagen.alt = producto.nombre;
            productoDiv.appendChild(imagen);

            // Nombre del producto
            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;
            productoDiv.appendChild(nombre);

        
            // Cantidad del producto
            const cantidad = document.createElement("p");
            cantidad.textContent = `Cantidad: ${producto.cantidad}`;
            productoDiv.appendChild(cantidad);

                // Precio del producto
                const precio = document.createElement("p");
            precio.textContent = `Precio: $${producto.precio}`;
            productoDiv.appendChild(precio);

            // Calcular total parcial y sumarlo al total general
            totalCompra += producto.precio * producto.cantidad;

            // Añadir el producto al contenedor
            carritoContenedor.appendChild(productoDiv);
        });

        // Mostrar el total de la compra
        totalElemento.textContent = `Total de la compra: $${totalCompra.toFixed(2)}`;
    } else {
        carritoContenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
        totalElemento.textContent = "Total de la compra: $0.00";
    }
});
