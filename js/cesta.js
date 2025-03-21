document.addEventListener("DOMContentLoaded", () => {
    const carritoContenedor = document.getElementById("carrito-contenedor");
    const totalElemento = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const realizarPedidoBtn = document.getElementById("realizar-pedido");
    const cerrarModalBtn = document.getElementById("cerrar-modal");
    const modal = document.getElementById("modal");

    let totalCompra = 0;
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarCarrito() {
        carritoContenedor.innerHTML = "";
        totalCompra = 0;

        if (carrito.length > 0) {
            carrito.forEach(producto => {
                const productoDiv = document.createElement("div");
                productoDiv.classList.add("producto");

                const imagen = document.createElement("img");
                imagen.src = `img/${producto.imagen}`;
                imagen.alt = producto.nombre;
                productoDiv.appendChild(imagen);

                const nombre = document.createElement("h3");
                nombre.textContent = producto.nombre;
                productoDiv.appendChild(nombre);

                const cantidad = document.createElement("p");
                cantidad.textContent = `Cantidad: ${producto.cantidad}`;
                productoDiv.appendChild(cantidad);

                const precio = document.createElement("p");
                precio.textContent = `Precio: $${producto.precio}`;
                productoDiv.appendChild(precio);

                totalCompra += producto.precio * producto.cantidad;

                carritoContenedor.appendChild(productoDiv);
            });

            totalElemento.textContent = `Total de la compra: $${totalCompra.toFixed(2)}`;
        } else {
            carritoContenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
            totalElemento.textContent = "Total de la compra: $0.00";
        }
    }

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });

    // Realizar pedido
    realizarPedidoBtn.addEventListener("click", () => {
        if (carrito.length > 0) {
            modal.style.display = "block";
            localStorage.removeItem("carrito");
            carrito = [];
            actualizarCarrito();
        } else {
            alert("El carrito está vacío. Agrega productos antes de realizar el pedido.");
        }
    });

    // Cerrar modal
    cerrarModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cargar carrito al inicio
    actualizarCarrito();
});
