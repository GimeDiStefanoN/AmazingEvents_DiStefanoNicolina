// traigo del html
const divCards = document.querySelector('.cards'); //contenedor de cards
const inputSearch = document.getElementById("search"); //traigo el input
const divCategorias = document.querySelector('.categorias'); //contenedor de checks

//ESCUCHO EVENTOS

inputSearch.addEventListener('input', filterCombined); //escucho el e del search
divCategorias.addEventListener('change',filterCombined); //escucho el e del checks

// FUNCIONES 
function filterCombined(){ //combino filtros
    let filterSearch = searchEvent(data.events,inputSearch.value); //filtro de search
    let filterChecks = filterCategory(filterSearch); //filtro de checks al search
    renderCards(filterChecks);
}

function renderCards(data) { // CODIGO PARA MOSTRAR DIFERENTES CARD DE ACUERDO A LA FECHA
    let cardsEventos = ''; //creo las card 
    let currentDate = new Date(data.currentDate); //obtengo la fecha de corte
    data.events.forEach(function(event) {
        var fecha = new Date(event.date);//obtengo la fecha del evento
        
    if (fecha < currentDate) { // Comparo las fechas
        cardsEventos +=	`
                    <div class="card" style="width: 18rem;">
                        <img src="${event.image}"  class="card-img-top" alt="cinema">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                            <div class="btnCard">
                                <span class="price">$ ${event.price}</span>
                                <a href="./details.html?id=${event._id}" class="btn btn-primary" id= ${event._id}>See more</a>
                            </div>
                        </div>
                    </div>`
      }else{
        divCards.innerHTML = `<h2 class="text-white fw-bolder">Try again, no events requested</h2>`
        return
      }
    });
    divCards.innerHTML = cardsEventos
}

function renderChecks(data){  //para mostrar los checks
    let setCategorias = new Set(data.events.map( event => event.category)) //con el map, me traigo todas las cateGorias del DATA y con el SET, hago que no se repitan
    //console.log(setCategorias)
    let todosChecks = Array.from(setCategorias) //creo un array con las categorias del DATA filtradas
    //console.log(todosChecks)
    let opcionesChecks = [] //array donde iran cada check
    //console.log(opcionesChecks)
    todosChecks.forEach(categoria => {
        opcionesChecks +=`
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="${categoria}" value="${categoria}">
                <label class="form-check-label" for="${categoria}">
                    ${categoria}
                </label>
            </div>` 
    });
    divCategorias.innerHTML = opcionesChecks
}

function searchEvent(eventos,input){ //para buscar escribiendo
    let inputEntered = input.toLowerCase(); //al input lo paso a minuscula
    console.log(inputEntered);
    let eventsFiltrados = eventos.filter(evento => evento.name.toLowerCase().includes(inputEntered));
    console.log(eventsFiltrados);
    return eventsFiltrados
}

function filterCategory(opcion){ //para buscar por checks
    let inputsChecks = Array.from(document.querySelectorAll("input[type='checkbox']")) //traigo todos los check del html para usar y lo convierto en array
    //console.log(inputsChecks);
    let checksElegidos = inputsChecks //creo una variable donde voy a guardar las opciones
        .filter(input => input.checked) //que estan seleccionadas
        .map( input => input.value) //y me traigo el nombre
    //console.log(checksElegidos);
    let opcionesFiltradas = opcion.filter(check => checksElegidos.includes(check.category))
    //console.log(opcionesFiltradas);
    if(checksElegidos.length > 0){
        return opcionesFiltradas
    }
    return opcion
}

renderCards(data); //llamo a la function > muestro las cards
renderChecks(data); //llamo a la function > muestro los checks
