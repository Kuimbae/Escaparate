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

                const precio = document.createElement("p");
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
    
    function imprimirFactura() {
        // Recuperar el carrito desde localStorage
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let total = 0;
    
        const ventana = window.open('', '', 'width=600,height=400');
        ventana.document.write('<html><head><title>Factura</title></head><body>');
        ventana.document.write('<h1>Factura</h1>');
    
        // Estilos para las imágenes en la factura
        ventana.document.write(`
            <style>
                img { max-width: 100px; height: auto; display: block; margin-bottom: 10px; }
                p { font-size: 1.2rem; }
                h1, h2 { text-align: center; }
                .producto { margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
            </style>
        `);
    
        // Mostrar los productos en la factura
        carrito.forEach(item => {
            let subtotal = item.precio * item.cantidad;
            total += subtotal;
    
            ventana.document.write(`
                <div class="producto">
                    <img src="img/${item.imagen}" alt="${item.nombre}">
                    <p>${item.nombre} - ${item.cantidad} x $${item.precio} = $${subtotal.toFixed(2)}</p>
                </div>
            `);
        });
    
        ventana.document.write(`<h2>Total: $${total.toFixed(2)}</h2>`);
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


    