<script>
    const dropdown = document.querySelector('.dropdown');
    const submenu = document.querySelector('.submenu');

    dropdown.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que se siga el enlace
        submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
    });
</script>
