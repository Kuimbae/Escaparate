document.addEventListener("DOMContentLoaded", () => {
    const tipos = document.querySelectorAll(".tipo"); // Categorías dentro del menú
    const contenedorImagenes = document.querySelector(".contenedor-imagenes");
    const menuHamburguesa = document.querySelector(".menu-hamburguesa");
    const barraLateral = document.querySelector(".barra-lateral");

    // Mapeo de imágenes por categoría
    const imagenesPorCategoria = {
        "Jeans": ["pantalon/jeans/jeans1.jpeg", "pantalon/jeans/jeans2.jpeg", "pantalon/jeans/jeans3.jpeg", "pantalon/jeans/jeans4.jpeg", "pantalon/jeans/jeans5.jpeg", "pantalon/jeans/jeans6.jpeg"],
        "Traje": ["pantalon/traje/traje1.jpeg", "pantalon/traje/traje2.jpeg", "pantalon/traje/traje3.jpeg", "pantalon/traje/traje4.jpeg", "pantalon/traje/traje5.jpeg", "pantalon/traje/traje6.jpeg"],
        "Cortos": ["vestido/corto/corto1.jpeg", "vestido/corto/corto2.jpeg", "vestido/corto/corto3.jpeg", "vestido/corto/corto4.jpeg", "vestido/corto/corto5.jpeg", "vestido/corto/corto6.jpeg"],
        "Largos": ["vestido/largo/vestidolargo1.jpeg", "vestido/largo/vestidolargo2.jpeg", "vestido/largo/vestidolargo3.jpeg", "vestido/largo/vestidolargo4.jpeg", "vestido/largo/vestidolargo5.jpeg", "vestido/largo/vestidolargo6.jpeg"],
        "Botas": ["zapatos/botas/botas1.jpg", "zapatos/botas/botas2.jpg", "zapatos/botas/botas3.jpg", "zapatos/botas/botas4.jpg", "zapatos/botas/botas5.jpg", "zapatos/botas/botas6.jpg"],
        "Zapatillas": ["zapatos/zapatillas/zapatos7.jpg", "zapatos/zapatillas/zapatos2.jpg", "zapatos/zapatillas/zapatos3.jpg", "zapatos/zapatillas/zapatos4.jpg", "zapatos/zapatillas/zapatos5.jpg", "zapatos/zapatillas/zapatos6.jpg"]
    };

    // Función para cargar imágenes
    function cargarImagenes(categoria) {
        contenedorImagenes.innerHTML = ""; // Limpiar las imágenes anteriores

        if (imagenesPorCategoria[categoria]) {
            imagenesPorCategoria[categoria].forEach(img => {
                const imagen = document.createElement("img");
                imagen.src = `img/${img}`;
                imagen.alt = categoria;
                imagen.onerror = () => console.error("Error cargando la imagen:", imagen.src);
                contenedorImagenes.appendChild(imagen);
            });
        } else {
            console.warn("No hay imágenes para la categoría:", categoria);
        }
    }

    // Evento al hacer clic en una categoría
    tipos.forEach(tipo => {
        tipo.addEventListener("click", (event) => {
            event.preventDefault();
            const categoria = event.target.textContent.trim();
            
            // Primero, cargar imágenes
            cargarImagenes(categoria);

               // Luego, dar un pequeño tiempo antes de cerrar el menú (solo en móviles)
        setTimeout(() => {
            barraLateral.classList.remove("mostrar-menu");
        }, 200); // Agrega un pequeño retraso para evitar conflictos

            // Cierra el menú hamburguesa en dispositivos móviles
            barraLateral.classList.remove("mostrar-menu");
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
