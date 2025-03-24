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
                /*precio.textContent = `Precio: $${producto.precio}`;*/
                precio.textContent = `Precio: $${producto.precio} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toFixed(2)}`;
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

    // Llamar a la función para actualizar el carrito al cargar la página
    actualizarCarrito();
});

// Simulación de la estructura de la factura (puedes adaptar según tu estructura de carrito)
let carrito = [
    { nombre: "Producto 1", cantidad: 2, precio: 15 },
    { nombre: "Producto 2", cantidad: 1, precio: 25 }
    ];
    
    let total = 0;
    
    // Mostrar los productos y total de la cesta
    function mostrarFactura() {
    let carritoContenedor = document.getElementById('carrito-contenedor');
    let totalElemento = document.getElementById('total');
    carritoContenedor.innerHTML = '';
    carrito.forEach(item => {
        carritoContenedor.innerHTML += `<p>${item.nombre} - ${item.cantidad} x $${item.precio} = $${(item.precio * item.cantidad).toFixed(2)}</p>`;


    total += item.precio * item.cantidad;
    });
    totalElemento.innerHTML = `Total: $${total}`;
    }
    
    // Función para guardar la factura (en formato de texto o JSON)
    function guardarFactura() {
    const factura = {
    items: carrito,
    total: total
    };
    // Convertimos la factura a un formato de texto (podrías usar JSON, CSV, etc.)
    const facturaTexto = `
    Factura:
    -----------------------
    ${carrito.map(item => `${item.nombre} - ${item.cantidad} x $${item.precio} = $${(item.precio * item.cantidad).toFixed(2)}`).join('\n')}

    -----------------------
    Total: $${total}
    `;
    // Crear un archivo de texto y descargarlo
    const blob = new Blob([facturaTexto], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'factura.txt';
    link.click();
    }
    
    // Función para imprimir la factura
    function imprimirFactura() {
    const ventana = window.open('', '', 'width=600,height=400');
    ventana.document.write('<html><head><title>Factura</title></head><body>');
    ventana.document.write('<h1>Factura</h1>');
    // Mostrar los productos en la factura
    carrito.forEach(item => {
        ventana.document.write(`<p>${item.nombre} - ${item.cantidad} x $${item.precio} = $${(item.precio * item.cantidad).toFixed(2)}</p>`);
    });
    
    ventana.document.write(`<h2>Total: $${total}</h2>`);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
    }


// Desaparecen botones de vaciar carrito y de realizar compra y aparecen los de las facturas //
    function mostrarMensaje() {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('vaciar-carrito').style.display = 'none';
        document.getElementById('realizar-pedido').style.display = 'none';
        document.getElementById('guardarFactura').style.display = 'inline-block';
        document.getElementById('imprimirFactura').style.display = 'inline-block';
    }


    