// #region Modelo 

class Sale{
    constructor(id, titulo, plataforma, cliente, precio) {
        this.id = id;
        this.titulo = titulo;
        this.plataforma = plataforma;
        this.cliente = cliente;
        this.precio = precio;
    }
}

function mapAPIToSales(data){
    return data.map(item => {
        return new Sale(
            item.id = id,
            item.titulo = titulo,
            item.plataforma = plataforma,
            item.cliente = cliente,
            item.precio = precio
        )
    })
}
//#endregion

//#region ventas
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
  
  
  // Funcion que agrega los datos de los modelos de casas a la tabla.
  function displaySalesTable(sales) {
  
    const tablaBody = document.getElementById('data-table-body');
  
    sales.forEach(sale => {
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${sale.id}</td>
        <td>${sale.titulo}</td>
        <td>${sale.plataforma}</td>
        <td>${sale.cliente}</td>
        <td class="text-right">${formatCurrency(sale.precio)}</td>
        <td>
          <button class="btn-delete" data-sale-id="${sale.id}">Eliminar</button>
        </td>
      `;
  
      tablaBody.appendChild(row);
  
    });
  
    initDeleteSaleButtonHandler();
  }
  
  
  // Funcion que limpia la tabla
  function clearTable() {
    const tableBody = document.getElementById('data-table-body');
  
    tableBody.innerHTML = '';
  }
  
  
  // Funcion que muestra mensaje de carga
  function showLoadingMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'Cargando...';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que muestra mensaje de carga
  function showInitialMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'No se ha realizado una consulta de ventas.';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que muestra mensaje de que no se encuentraron datos
  function showNotFoundMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'No se encontraron casas con el filtro proporcionado.';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que oculta mensaje
  function hideMessage() {
    const message = document.getElementById('message');
  
    message.style.display = 'none';
  }
//#endregion

//#region  FILTROS (VIEW)

function initFilterButtonsHandler() {

    document.getElementById('filter-form').addEventListener('submit', event => {
      event.preventDefault();
      searchSales();
    });
  
    document.getElementById('reset-filters').addEventListener('click', () => clearSales());
  
  }
  
  
  function clearSales() {
    document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
  
    displayClearSalesView();
  }
  
  
  function resetSales() {
    document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
    searchSales();
  }
  
  
  function searchSales() {
    const customerName = document.getElementById('customer-filter').value;
    const salesman = document.getElementById('salesman-filter').value;

    getSalesData(customerName, salesman);
  }
  
  //#endregion

  //#region delete
  function initDeleteSaleButtonHandler() {

    document.querySelectorAll('.btn-delete').forEach(button => {
  
      button.addEventListener('click', () => {
  
        const saleId = button.getAttribute('data-sale-id'); // Obtenemos el ID de la venta
        deleteSale(saleId); // Llamamos a la función para eleminar la venta
  
      });
  
    });
  
  }
  
  //#endregion

  //#region 7. CONSUMO DE DATOS DESDE API

function getRealEstateData() {

    fetchAPI(`${apiURL}`, 'GET')
      .then(data => {
        const realEstatesList = mapAPIToRealEstateDescriptors(data);
        displayRealEstateOptions(realEstatesList);
      });
  
  }
  
  
  function getSalesData(customerName, salesman) {
  
    const url = buildGetSalesDataUrl(customerName, salesman);
  
    fetchAPI(url, 'GET')
      .then(data => {
        const salesList = mapAPIToSales(data);
        displaySalesView(salesList);
      });
  }
  
  
  function deleteSale(saleId) {
  
    const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la venta ${saleId}?`);
  
    if (confirm) {
  
      fetchAPI(`${apiURL}/${saleId}`, 'DELETE')
        .then(() => {
          resetSales();
          window.alert("Venta eliminada.");
        });
  
    }
  }
  
  // Funcion que genera la url para consultar ventas con filtros.
  function buildGetSalesDataUrl(customerName, salesman) {
    // Tecnica de string dinamico: se aconseja cuando tenemos una cantidad limitada de parámetros y
    //    cierto control de los tipos de parametros (id, fechas).
    // const url = `${apiURL}/sales?realEstate=${realEstate}&customerName=${customerName}&salesman=${salesman}&saleDate=${saleDate}`;
  
    // URL y URLSearchParams: simplifican la construcción de URLs dinámicas y complejas,
    //    facilitan la gestión de múltiples parámetros y textos dinámicos al encargarse de
    //    la codificación y decodificación de caracteres especiales, lo que evita problemas
    //    comunes relacionados con espacios y caracteres no válidos.
    const url = new URL(`${apiURL}`);
  
  
    if (customerName) {
      url.searchParams.append('cliente', customerName);
    }
  
    if (salesman) {
      url.searchParams.append('titulo', salesman);
    }
  
    return url;
  }
  
  //#endregion
  
  
  //#region 8. INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)
  
  
  initFilterButtonsHandler();
  
  getRealEstateData();
  
  //#endregion