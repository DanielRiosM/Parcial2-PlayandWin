const games = [
    {
        title: "The Legend of Zelda: Tears of the Kingdom",
        platform: "Nintendo Switch",
        image: "./img/The legend of zelda tears of the kingdom.webp",
        precio: "$50.00"
    },
    {
        title: "The Legend of Zelda: Breath of the Wild",
        platform: "Nintendo Switch",
        image: "./img/The legend of zelda breath of the wild.webp",
        precio: "$80.00"
    },
    {
        title: "The Legend of Zelda: Link's Awakening",
        platform: "Nintendo Switch",
        image: "./img/The legend of zelda links awakening.jpg",
        precio: "$60.00"
    },
    {
        title: "God of War Ragnarok",
        platform: "Playstation",
        image: "./img/God of war ragnarok.webp",
        precio: "$70.00"
    },
    {
        title: "Hollow knight",
        platform: "PC, Playstation, Xbox",
        image: "./img/hollow knight.webp",
        precio: "$90.00"
    },
    {
        title: "Elden Ring",
        platform: "PC, Playstation, Xbox",
        image: "./img/Elden ring.webp",
        precio: "$70.00"
    },
    {
        title: "Payday 3",
        platform: "PC, Playstation, Xbox",
        image: "./img/Payday 3.webp",
        precio: "$70.00"
    },
    {
        title: "Sea of Thieves",
        platform: "PC, Playstation, Xbox",
        image: "./img/Sea of thieves.webp",
        precio: "$90.00"
    },
    {
        title: "Fallout New Vegas",
        platform: "PC, Playstation, Xbox",
        image: "./img/Fallout new vegas.webp",
        precio: "$70.00"
    }
];

const main = document.querySelector("main");

games.forEach(game => {
    const gameElement = document.createElement("div");
    gameElement.classList.add("game");

    const imageElement = document.createElement("img");
    imageElement.src = game.image;

    const titleElement = document.createElement("h2");
    titleElement.textContent = game.title;

    const platformElement = document.createElement("p");
    platformElement.textContent = `Plataforma: ${game.platform}`;

    const precioElement = document.createElement("h2");
    precioElement.textContent = game.precio;

    const buyButtonElement = document.createElement("button");
    buyButtonElement.textContent = "Comprar";

    gameElement.appendChild(imageElement);
    gameElement.appendChild(titleElement);
    gameElement.appendChild(platformElement);
    gameElement.appendChild(precioElement);
    gameElement.appendChild(buyButtonElement);

    main.appendChild(gameElement);
});
