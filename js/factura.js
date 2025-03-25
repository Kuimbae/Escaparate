// Función para imprimir la factura
function imprimirFactura() {
    print()
}

// Función para mostrar mensaje y ocultar botones
function mostrarMensaje() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('vaciar-carrito').style.display = 'none';
    document.getElementById('realizar-pedido').style.display = 'none';
    document.getElementById('guardarFactura').style.display = 'inline-block';
    document.getElementById('imprimirFactura').style.display = 'inline-block';
}
