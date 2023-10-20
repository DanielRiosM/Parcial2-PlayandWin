//#region 2. MODELO DE DATOS (MODELS)

class Sale {
  constructor(id, cliente, telefono, juego, precio) {
    this.id = id; // Identificador de la venta
    this.cliente = cliente; // Nombre del cliente
    this.telefono = telefono; // Teléfono del cliente
    this.juego = juego; // Referencia al juego
    this.precio = precio; // Precio de la venta
  }
}

function mapAPIToSales(data) {
  return data.map(item => {
    return new Sale(
      item.id,
      item.cliente,
      item.telefono,
      item.juego,
      item.precio
    );
  });
}

class GameDescriptor {

  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

}


function mapAPIToGameDescriptors(data) {
  return data.map(game => {
    return new GameDescriptor(
      game.id,
      game.title,
      game.price
    );
  });
}

//#endregion

//#region 3. VENTAS (VIEW)

function displaySalesView(sales) {

  clearTable();

  showLoadingMessage();

  if (sales.length === 0) {

    showNotFoundMessage();

  } else {

    hideMessage();

    displaySalesTable(sales);
  }

}


function displayClearSalesView() {
  clearTable();

  showInitialMessage();
}

function displaySalesTable(sales) {

  const tablaBody = document.getElementById('data-table-body');

  sales.forEach(sale => {

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${sale.id}</td>
      <td>${sale.cliente}</td>
      <td>${sale.telefono}</td>
      <td>${sale.juego}</td>
      <td class="text-right">${formatCurrency(sale.precio)}</td>
      <td>
        <button class="btn-delete" data-sale-id="${sale.id}">Eliminar</button>
      </td>
    `;

    tablaBody.appendChild(row);

  });

  initDeleteSaleButtonHandler();
}

function clearTable() {
  const tableBody = document.getElementById('data-table-body');

  tableBody.innerHTML = '';
}

function showLoadingMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'Cargando...';

  message.style.display = 'block';
}

function showInitialMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se ha realizado una consulta de ventas.';

  message.style.display = 'block';
}

function showNotFoundMessage() {
  const message = document.getElementById('message');

  message.innerHTML = 'No se encontraron juegos con el filtro proporcionado.';

  message.style.display = 'block';
}

function hideMessage() {
  const message = document.getElementById('message');

  message.style.display = 'none';
}

//#endregion

//#region 4. FILTROS (VIEW)

function initFilterButtonsHandler() {

  document.getElementById('filter-form').addEventListener('submit', event => {
    event.preventDefault();
    searchSales();
  });

  document.getElementById('reset-filters').addEventListener('click', () => clearSales());

}

function clearSales() {
  document.querySelector('select.filter-field').selectedIndex = 0;
  document.querySelectorAll('input.filter-field').forEach(input => input.value = '');

  displayClearSalesView();
}

function resetSales() {
  document.querySelector('select.filter-field').selectedIndex = 0;
  document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
  searchSales();
}

function searchSales() {
  const game = document.getElementById('game-filter').value;
  const client = document.getElementById('customer-filter').value;
  const seller = document.getElementById('salesman-filter').value;

  getSalesData(game, client, seller);
}

//#endregion

//#region 5. BOTONES PARA AGREGAR Y ELIMINAR VENTAS (VIEW)

function initDeleteSaleButtonHandler() {

  document.querySelectorAll('.btn-delete').forEach(button => {

    button.addEventListener('click', () => {

      const saleId = button.getAttribute('data-sale-id');
      deleteSale(saleId); 

    });

  });

}


//#endregion

//#region 6. CARGAR DATOS DE MODELOS PARA FORM (VIEW)
function displayGameOptions(games) {

  const gameFilter = document.getElementById('game-filter');

  games.forEach(game => {

    const optionFilter = document.createElement('option');

    optionFilter.value = game.title;
    optionFilter.text = `${game.title} - ${formatCurrency(game.price)}`;

    gameFilter.appendChild(optionFilter);
    
  });

}

//#endregion

//#region 7. CONSUMO DE DATOS DESDE API

function getGameData() {
  fetchAPI(`${apiURL}/catalogo`, 'GET')
    .then(data => {
      const gamesList = mapAPIToGameDescriptors(data);
      displayGameOptions(gamesList);
    });

}


function getSalesData(juego, cliente) {

  const url = buildGetSalesDataUrl(juego,cliente);

  fetchAPI(url, 'GET')
    .then(data => {
      const salesList = mapAPIToSales(data);
      displaySalesView(salesList);
    });
}


function deleteSale(saleId) {

  const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la venta ${saleId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/ventas/${saleId}`, 'DELETE')
      .then(() => {
        resetSales();
        window.alert("Venta eliminada.");
      });

  }
}

function createSale(sale) {

  fetchAPI(`${apiURL}/ventas`, 'POST', sale)
    .then(sale => {
      closeAddSaleModal();
      resetSales();
      window.alert(`Venta ${sale.id} creada correctamente.`);
    });

}


function buildGetSalesDataUrl(game, cliente, juego) {

const url = new URL(`${apiURL}/ventas`);

if (game) {
  url.searchParams.append('game', game);
}

if (cliente) {
  url.searchParams.append('cliente', cliente);
}

if (juego) {
  url.searchParams.append('juego', juego);
}

return url;
}





//#endregion

//#region 8. INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)

initFilterButtonsHandler();

getGameData();

//#endregion



