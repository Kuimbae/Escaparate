
    document.getElementById("menu-icon").addEventListener("click", function () {
        document.getElementById("menu").classList.toggle("active");
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


    // Al cargar la página, aseguramos que el mensaje de éxito esté oculto
    document.addEventListener("DOMContentLoaded", function () {  // Aquí se usa DOMContentLoaded para asegurarse de que el código JS se ejecute después de cargar todo el HTML
        const successMessage = document.querySelector(".success-message");
        const emailInput = document.getElementById("email");
        const subscribeButton = document.querySelector(".subscribe-btn");

        successMessage.style.display = "none";  // Aseguramos que el mensaje esté oculto al inicio

        // Función que maneja la lógica de suscripción
        function handleSubscribe() {
            const email = emailInput.value.trim();  // Obtenemos el valor del correo

            if (!email) {
                alert("Por favor, ingrese su correo electrónico.");
                return;  // Salimos de la función para evitar que siga ejecutando el código
            }

            // Validar el formato del correo
            if (validateEmail(email)) {
                successMessage.style.display = "block";  // Mostrar mensaje de éxito
                successMessage.style.animation = "none"; // Reiniciar la animación
                successMessage.offsetHeight; // Forzar reflow
                successMessage.style.animation = "growMessage 1s forwards";  // Aplicar animación

                // Limpiar el campo de correo después de mostrar el mensaje
                emailInput.value = '';
            } else {
                alert("Por favor, ingrese un correo electrónico válido.");
            }
        }



        // Función para validar el formato del correo
        function validateEmail(email) {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        }

        document.getElementById("miBoton").addEventListener("click", function (event) {
            handleSubscribe();
        });

        // Detectar la tecla "Enter" en el campo de correo
        emailInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();  // Evitar que se recargue la página
                handleSubscribe();  // Llamar a la función de suscripción
            }
        });
    });

