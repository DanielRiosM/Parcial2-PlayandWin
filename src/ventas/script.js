// Obtener elementos del DOM
const ventasButton = document.getElementById("ventas-button");
const modal = document.createElement("div");
modal.classList.add("modal");

// Crea el contenido del modal
const modalContent = document.createElement("div");
modalContent.classList.add("modal-content");
modalContent.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <form id="login-form">
        <label for="username">Usuario:</label>
        <input type="text" id="username" required>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" required>
        <button type="submit">Iniciar Sesión</button>
    </form>
`;

// Agregar el modal al cuerpo del documento
modal.appendChild(modalContent);
document.body.appendChild(modal);

// Mostrar el modal al hacer clic en "Ventas"
ventasButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
});

// Ocultar el modal al hacer clic en el fondo oscurecido
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Evitar que los clics en el contenido del modal lo cierren
modalContent.addEventListener("click", (e) => {
    e.stopPropagation();
});

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

