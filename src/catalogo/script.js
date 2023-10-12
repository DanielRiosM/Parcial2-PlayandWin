const games = [
  {
    title: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    image: "The legend of zelda tears of the kingdom.webp",
    precio: "$50.00",
  },
  {
    title: "The Legend of Zelda: Breath of the Wild",
    platform: "Nintendo Switch",
    image: "The legend of zelda breath of the wild.webp",
    precio: "$80.00",
  },
  {
    title: "The Legend of Zelda: Link's Awakening",
    platform: "Nintendo Switch",
    image: "The legend of zelda links awakening.jpg",
    precio: "$60.00",
  },
  {
    title: "God of War Ragnarok",
    platform: "Playstation",
    image: "God of war ragnarok.webp",
    precio: "$70.00",
  },
  {
    title: "Hollow knight",
    platform: "PC, Playstation, Xbox",
    image: "hollow knight.webp",
    precio: "$90.00",
  },
  {
    title: "Elden Ring",
    platform: "PC, Playstation, Xbox",
    image: "Elden ring.webp",
    precio: "$70.00",
  },
  {
    title: "Payday 3",
    platform: "PC, Playstation, Xbox",
    image: "Payday 3.webp",
    precio: "$70.00",
  },
  {
    title: "Sea of Thieves",
    platform: "PC, Playstation, Xbox",
    image: "Sea of thieves.webp",
    precio: "$90.00",
  },
  {
    title: "Fallout New Vegas",
    platform: "PC, Playstation, Xbox",
    image: "Fallout new vegas.webp",
    precio: "$70.00",
  },
];

function displayTable(juegos) {
  clearGames();

  showLoadingMessage();

  setTimeout(() => {

    if (juegos.length === 0) {

      showNotFoundMessage();

    } else {

        hideMessage();

        const gameContainer = document.querySelector(".game-list");

        const imagePath = `./img/`;

        juegos.forEach((juego) => {
          const divgame = document.createElement("div");
          divgame.classList.add("lista");
          
          divgame.innerHTML = `
            <div class="game">
              <img src="${imagePath+juego.image}" />
              <h2> ${juego.title}</h2>
              <p> Plataforma: ${juego.platform}</p>
              <h2> ${juego.precio}</h2>
              <button>Aplicar filtros</button>
            </div>
          `;
          gameContainer.appendChild(divgame);
        });

    }

  }, 2000);

}

// Funcion que limpia la tabla
function clearGames() {
  const gameBody = document.querySelector('.game-list');
  gameBody.innerHTML = '';
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
  const message = document.querySelector('.message');
  console.log(message);
  message.innerHTML = 'Cargando...';

  message.style.display = 'block';
}

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
  const message = document.querySelector('.message');

  message.innerHTML = 'No se encontraron eventos con el filtro proporcionado.';

  message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
  const message = document.querySelector('.message');

  message.style.display = 'none';
}

//Region del formulario
function initButtonsHandler() {

  document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();
    applyFilters();
  });

  document.getElementById('reset-filters').addEventListener('click', () => {
    document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
    applyFilters();
  });

}

function applyFilters() {
  const filterText = document.getElementById('text').value.toLowerCase();;
  const filterMinPrice = parseFloat(document.getElementById('price-min').value);
  const filterMaxPrice = parseFloat(document.getElementById('price-max').value);

  const filteredEvents = filterEvents(games, filterText,  filterMinPrice, filterMaxPrice);

  displayTable(filteredEvents);
}

// Funcion con la logica para filtrar los eventos.
function filterEvents(juegos, text, minPrice, maxPrice) {

  return juegos.filter( juego =>
      (!minPrice || juego.precio >= minPrice) &&
      (!maxPrice || juego.precio <= maxPrice) &&
      (!text     || juego.title.toLowerCase().includes(text))
    );
}

displayTable(games);
initButtonsHandler();


const openLogin = document.getElementById("open-login");

openLogin.addEventListener("click", function () {
  const username = prompt("Este es un apartado administrativo, por lo que necesita iniciar sesion para poder visualizar el apartado de ventas\n\nPor favor, ingrese su nombre de usuario:");
  const password = prompt("Este es un apartado administrativo, por lo que necesita iniciar sesion para poder visualizar el apartado de ventas\n\nPor favor, ingrese su contraseña:");

  // Realiza la autenticación y, si es exitosa, puedes realizar acciones, como redirigir al usuario a la página de ventas
  if (username === "usuario" && password === "contrasena") {
    alert("Inicio de sesión exitoso. Acceso permitido a Ventas.");
    window.location.href = "../ventas/index.html";
  } else {
    alert("Credenciales incorrectas. Acceso denegado.");
  }
});
