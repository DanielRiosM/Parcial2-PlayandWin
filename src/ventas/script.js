document.addEventListener("DOMContentLoaded", function () {
    const dataTableBody = document.getElementById("data-table-body");
    const message = document.getElementById("message");
    const filterForm = document.getElementById("filter-form");

    // Agrega un evento de escucha al formulario para manejar la solicitud de filtro.
    filterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        fetchData();
    });

    // Realiza la solicitud Fetch para obtener datos de la API.
    function fetchData() {
        // Reemplaza la URL de la API con la URL real.
        const apiUrl = "https://653039776c756603295e6dda.mockapi.io/ventas"; // Cambia esto con la URL de tu API.
        
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    displayData(data);
                } else {
                    displayNoDataMessage();
                }
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }

    // Llena la tabla con los datos obtenidos de la API.
    function displayData(data) {
        dataTableBody.innerHTML = "";
        data.forEach((venta) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${venta.id}</td>
                <td>${venta.titulo}</td>
                <td>${venta.plataforma}</td>
                <td>${venta.cliente}</td>
                <td class="text-right">${venta.precio}</td>
                <td>
                <button class="btn-delete" data-sale-id="${venta.id}">Eliminar</button>
                </td>
            `;
            dataTableBody.appendChild(row);
        });
        
        initDeleteSaleButtonHandler();
    }

    // Muestra un mensaje cuando no hay datos.
    function displayNoDataMessage() {
        dataTableBody.innerHTML = "";
        message.style.display = "block";
    }

    // Inicialmente, cargar los datos al cargar la página.
    fetchData();
});



function initDeleteSaleButtonHandler() {

    document.querySelectorAll('.btn-delete').forEach(button => {

        button.addEventListener('click', () => {

            const saleId = button.getAttribute('data-sale-id'); // Obtenemos el ID de la venta
            deleteSale(saleId); // Llamamos a la función para eleminar la venta

        });

    });

}

// Validar el inicio de sesión (debes implementar la lógica real aquí)
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "usuario" && password === "contraseña") {
        modal.style.display = "none";
        // Aquí puedes permitir el acceso a la sección "Ventas"
    } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
});

