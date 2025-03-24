// Función para imprimir la factura
function imprimirFactura() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    const ventana = window.open('', '', 'width=800,height=600');
    ventana.document.write('<html><head><title>Factura</title></head><body>');
    
    // Enlace al archivo de estilos
    ventana.document.write('<link rel="stylesheet" type="text/css" href="style.css">');

    // Cabecera con logo y detalles de la tienda
    ventana.document.write(`
        <div class="header">
            <img src="img/logo.png" alt="Logo de la Tienda">
            <h1>Factura de Compra</h1>
        </div>
    `);

    // Información de la factura
    ventana.document.write(`
        <div class="factura-info">
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Cliente:</strong> Peñascal</p>
            <p><strong>Dirección:</strong> Calle bolueta nº 67</p>
        </div>
    `);

    // Mostrar los productos en la factura
    ventana.document.write('<div class="productos">');
    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        ventana.document.write(`
            <div class="producto">
                <div style="display: flex; align-items: center;">
                    <img src="img/${item.imagen}" alt="${item.nombre}">
                    <div class="producto-info">
                        <p><strong>${item.nombre}</strong></p>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Precio Unitario: ${item.precio} €</p>
                        <p>Total: $${subtotal.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `);
    });
    ventana.document.write('</div>'); // Fin productos

    // Total
    ventana.document.write(`
        <div class="total">
            <p>Total de la compra: $${total.toFixed(2)}</p>
        </div>
    `);

    // Pie de página con mensaje de agradecimiento
    ventana.document.write(`
        <div class="footer">
            <p>Gracias por su compra. ¡Vuelva pronto!</p>
            <p>Si tiene alguna pregunta, no dude en contactarnos.</p>
        </div>
    `);

    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
}

// Función para mostrar mensaje y ocultar botones
function mostrarMensaje() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('vaciar-carrito').style.display = 'none';
    document.getElementById('realizar-pedido').style.display = 'none';
    document.getElementById('guardarFactura').style.display = 'inline-block';
    document.getElementById('imprimirFactura').style.display = 'inline-block';
}
