document.addEventListener("DOMContentLoaded", () => {
    const carritoContenedor = document.getElementById("carrito-contenedor");
    const totalElemento = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

    let totalCompra = 0;
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarCarrito() {
        carritoContenedor.innerHTML = "";
        totalCompra = 0;

        if (carrito.length > 0) {
            carrito.forEach((producto, index) => {
                const productoDiv = document.createElement("div");
                productoDiv.classList.add("producto");

                const imagen = document.createElement("img");
                imagen.src = `img/${producto.imagen}`;
                imagen.alt = producto.nombre;
                productoDiv.appendChild(imagen);

                const nombre = document.createElement("h3");
                nombre.textContent = producto.nombre;
                productoDiv.appendChild(nombre);

                const controlCantidad = document.createElement("div");
                controlCantidad.classList.add("control-cantidad");


                const precio = document.createElement("p");
                precio.textContent = `Precio: ${producto.precio}€ x ${producto.cantidad} = ${(producto.precio * producto.cantidad).toFixed(2)}€`;
                productoDiv.appendChild(precio);

                // Botón de disminuir cantidad
                const btnDisminuir = document.createElement("button");
                btnDisminuir.textContent = "-";
                btnDisminuir.addEventListener("click", () => {
                    if (producto.cantidad > 1) {
                        producto.cantidad--;
                    } else {
                        carrito.splice(index, 1);
                    }
                    guardarCarrito();
                    actualizarCarrito();
                });
                controlCantidad.appendChild(btnDisminuir);

                // Elemento para mostrar la cantidad
                const cantidad = document.createElement("span");
                cantidad.textContent = producto.cantidad;
                controlCantidad.appendChild(cantidad);

                // Botón de aumentar cantidad
                const btnAumentar = document.createElement("button");
                btnAumentar.textContent = "+";
                btnAumentar.addEventListener("click", () => {
                    producto.cantidad++;
                    guardarCarrito();
                    actualizarCarrito();
                });
                controlCantidad.appendChild(btnAumentar);

                productoDiv.appendChild(controlCantidad);


                // Botón de eliminar artículo
                const btnEliminar = document.createElement("button");
                btnEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black">
    <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12H6.5L5 9zm3-5h8v2H8V4z"/>
</svg>`;

                btnEliminar.classList.add("eliminar-articulo");
                btnEliminar.addEventListener("click", () => {
                    carrito.splice(index, 1);
                    guardarCarrito();
                    actualizarCarrito();
                });
                productoDiv.appendChild(btnEliminar);


                totalCompra += producto.precio * producto.cantidad;
                carritoContenedor.appendChild(productoDiv);
            });

            totalElemento.textContent = `Total de la compra: ${totalCompra.toFixed(2)}€`;
        } else {
            carritoContenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
            totalElemento.textContent = "Total de la compra: $0.00";
        }
    }

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });

    actualizarCarrito();
});
