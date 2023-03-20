// traigo del html
const divCards = document.querySelector('.cards'); //contenedor de cards
const inputSearch = document.getElementById("search"); //traigo el input
const divCategorias = document.querySelector('.categorias'); //contenedor de checks

//ESCUCHO EVENTOS

inputSearch.addEventListener('input', filterCombined); //escucho el e del search
divCategorias.addEventListener('change',filterCombined); //escucho el e del checks


function filterCombined(){ //combino filtros
    let filterSearch = searchEvent(data.events,inputSearch.value); //filtro de search
    let filterChecks = filterCategory(filterSearch); //filtro de checks al search
    renderCards(filterChecks);
}

renderCards(data.events); //llamo a la function > muestro las cards
renderChecks(data.events); //llamo a la function > muestro los checks

// FUNCIONES 


function renderCards(eventos){  //para mostrar las cards
    if(eventos.length == 0){
        divCards.innerHTML = `<h2 class="text-white fw-bolder">Try again, no events requested</h2>`
        return
    }
    let cardsEventos = '';
    eventos.forEach(event =>{
        cardsEventos +=`
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
            </div>
        `;
    })
    divCards.innerHTML = cardsEventos
    //console.log(cardsEventos);
};

function renderChecks(categorias){  //para mostrar los checks
    let setCategorias = new Set(categorias.map( event => event.category)) //con el map, me traigo todas las cateGorias del DATA y con el SET, hago que no no se repitan
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
    //console.log(inputEntered);
    let eventsFiltrados = eventos.filter(evento => evento.name.toLowerCase().includes(inputEntered));
    //console.log(eventsFiltrados);
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



//no puedo aun implementar correctamente la funcion de borrar lo elegido al hacer focusout

// inputSearch.addEventListener('focusout', resetFilters); //escucho el e para borrar filtros
// function resetFilters(){ //borro al hacer focusout
//     let inputsChecks = Array.from(document.querySelectorAll("input[type='checkbox']")) 
//     inputsChecks.forEach(check => {
//         check.checked = false;
//       });
//     inputSearch.value = "";
//     renderCards(data.events)
// };

