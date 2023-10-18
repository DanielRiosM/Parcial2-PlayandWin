


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

