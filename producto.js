
  /*  const dropdown = document.querySelector('.dropdown');
    const submenu = document.querySelector('.submenu');

    dropdown.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que se siga el enlace
        submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
    });
*/

document.addEventListener("DOMContentLoaded", () => {
    const tipos = document.querySelectorAll('.tipo');
    const contenedorImagenes = document.querySelector('.contenedor-imagenes');

    const imagenesPorCategoria = {
        
        "Jeans": ["pantalon/jeans/jeans1.jpeg", "pantalon/jeans/jeans2.jpeg", "pantalon/jeans/jeans3.jpeg", "pantalon/jeans/jeans4.jpeg", "pantalon/jeans/jeans5.jpeg", "pantalon/jeans/jeans6.jpeg", "pantalon/jeans/jeans7.jpeg", "pantalon/jeans/jeans8.jpeg", "pantalon/jeans/jeans9.jpeg"],
        "Traje": ["pantalon/traje/traje1.jpeg", "pantalon/traje/traje2.jpeg", "pantalon/traje/traje3.jpeg", "pantalon/traje/traje4.jpeg", "pantalon/traje/traje5.jpeg", "pantalon/traje/traje6.jpeg", "pantalon/traje/traje7.jpeg", "pantalon/traje/traje8.jpeg", "pantalon/traje/traje9.jpeg"],
                
        "Cortos": ["vestido/corto/corto1.jpeg", "vestido/corto/corto2.jpeg", "vestido/corto/corto3.jpeg", "vestido/corto/corto4.jpeg", "vestido/corto/corto5.jpeg", "vestido/corto/corto6.jpeg", "vestido/corto/corto7.jpeg", "vestido/corto/corto8.jpeg", "vestido/corto/corto9.jpeg"],
        "Largos": ["vestido/largo/vestidolargo1.jpeg", "vestido/largo/vestidolargo2.jpeg", "vestido/largo/vestidolargo3.jpeg", "vestido/largo/vestidolargo4.jpeg", "vestido/largo/vestidolargo5.jpeg", "vestido/largo/vestidolargo6.jpeg", "vestido/largo/vestidolargo7.jpeg", "vestido/largo/vestidolargo8.jpeg", "vestido/largo/vestidolargo9.jpeg"],  
    
        "Botas": ["zapatos/botas/botas1.jpg", "zapatos/botas/botas2.jpg", "zapatos/botas/botas3.jpg", "zapatos/botas/botas4.jpg", "zapatos/botas/botas5.jpg", "zapatos/botas/botas6.jpg", "zapatos/botas/botas7.jpg", "zapatos/botas/botas8.jpg", "zapatos/botas/botas9.jpg"],
        "Zapatillas": ["zapatos/zapatillas/zapatos1.jpg", "zapatos/zapatillas/zapatos2.jpg", "zapatos/zapatillas/zapatos3.jpg", "zapatos/zapatillas/zapatos4.jpg", "zapatos/zapatillas/zapatos5.jpg", "zapatos/zapatillas/zapatos6.jpg", "zapatos/zapatillas/zapatos7.jpg", "zapatos/zapatillas/zapatos8.jpg", "zapatos/zapatillas/zapatos9.jpg"],
    
        
    
    };
    

    tipos.forEach(tipo => {
        tipo.addEventListener('click', (event) => {
            event.preventDefault(); 

            const categoria = event.target.textContent.trim();
            contenedorImagenes.innerHTML = ""; 

            if (imagenesPorCategoria[categoria]) {
                imagenesPorCategoria[categoria].forEach(img => {
                    const imagen = document.createElement("img");
                    console.log("Cargando imagen:", `img/${img}`);
                    imagen.src = `img/${img}`;

                    imagen.alt = categoria;
                    imagen.onerror = function() {
                        console.error("Error cargando la imagen:", this.src);
                    };
                    contenedorImagenes.appendChild(imagen);
                });
            } else {
                console.warn("No hay imágenes para la categoría:", categoria);
            }
        });
    });
});






