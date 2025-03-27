console.log("Portada.js cargado");

document.addEventListener("DOMContentLoaded", function () {
    function redirigirAProductos() {
        let searchTerm = document.querySelector(".search-bar").value.trim();
        if (searchTerm) {
            console.log("Buscando:", searchTerm); // Verificar búsqueda
            window.location.href = `producto.html?search=${encodeURIComponent(searchTerm)}`;
        } else {
            alert("Por favor, ingrese un término de búsqueda.");
        }
    }

    document.querySelector(".search-btn").addEventListener("click", redirigirAProductos);
    document.querySelector(".search-bar").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            redirigirAProductos();
        }
    });
});

function redirigirAProductos() {
    let searchTerm = document.querySelector(".search-bar").value.trim(); // Obtener el término de búsqueda//
    const errorMessage = document.getElementById("error-message");

    if (searchTerm) {

        // Si hay texto en el campo, ocultamos el mensaje de error y redirigimos//
        errorMessage.style.display = "none";
        window.location.href = `producto.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
        // Si el campo está vacío, mostramos el mensaje de error
        errorMessage.style.display = "block";
    }
}

// Ocultar mensaje de error cuando el usuario comience a escribir
document.querySelector(".search-bar").addEventListener("input", function () {
    const errorMessage = document.getElementById("error-message");
    if (this.value.trim() !== "") {
        errorMessage.style.display = "none"; // Ocultamos el mensaje si el campo tiene texto
    }
});

// Detectar tecla Enter en el campo de búsqueda
document.querySelector(".search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita el comportamiento predeterminado
        redirigirAProductos(); // Llama a la función de búsqueda
    }
});

