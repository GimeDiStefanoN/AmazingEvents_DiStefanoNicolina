// TRAIGO DEL HTML
const divCards = document.querySelector('.cards'); //contenedor de cards
const divCategorias = document.querySelector('.categorias'); //contenedor de checks
const inputSearch = document.getElementById("search"); //traigo el input de busqueda

// FETCH
let data;
        // CON LA URL
async function getData(){
    try{
        await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(json => data = json)
        //console.log(data);
        return data
    } catch(error){
        divCards.innerHTML =`<h2 class="text-white fw-bolder text-center">An error occurred, please try again later: </h2>` 
        + error.message
    }
};

        // CON EL JSON
// async function getData(){
//     try{
//         await fetch('assets/scripts/amazing.json')
//         .then(response => response.json())
//         .then(json => data = json)
        
//         //console.log(data);
//         return data
//     } catch(error){
//         divCards.innerHTML =`<h2 class="text-white fw-bolder text-center">An error occurred, please try again later: </h2>` 
//         + error.message
//     }
    
// };
getData();

let upcomingEvents = [];
async function iniciar() {
    let data = await getData();
    //console.log(data);
    let currentDate = data.currentDate; 
    upcomingEvents = data.events.filter(dat => dat.date > currentDate) //comparo fechas y creo array nuevo de eventos con fechas pasadas
    //console.log(upcomingEvents);
    renderChecks(data); //llamo a la function > muestro los checks
    renderCards(upcomingEvents); //llamo a la funcion > muestro las cards
}
iniciar();

// ESCUCHO LOS EVENTOS

inputSearch.addEventListener('input', superFiltro);

divCategorias.addEventListener('change', superFiltro);

function superFiltro() {
    let filtroBusqueda =searchName(upcomingEvents, inputSearch.value);
    let filtroCategorias = filterCategory('.form-check-input');
    const filtroFinal = filtroBusqueda.filter((evento) => filtroCategorias.includes(evento));
    renderCards(filtroFinal);
    console.log(filtroFinal);
}

// FUNCIONES

function renderChecks(data) { //para mostrar los checks
    let setCategorias = new Set(data.events.map(event => event.category)); //con el map, me traigo todas las cateGorias del DATA y con el SET, hago que no se repitan
    //console.log(setCategorias)
    let opcionesChecks = [] //array donde iran cada check
    //console.log(opcionesChecks);
    setCategorias.forEach(categoria =>{
        opcionesChecks +=`
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="${categoria}" value="${categoria}">
                <label class="form-check-label" for="${categoria}">
                    ${categoria}
                </label>
            </div>
            ` 
    });
    divCategorias.innerHTML = opcionesChecks;
};

function renderCards(params) {
    let cardEvents = params.length > 0 ? params.map(card  => ` 
        <div class="card">
            <img src="${card.image}"  class="card-img-top" alt="cinema">
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.description}</p>
                <div class="btnCard">
                    <span class="price">$ ${card.price}</span>
                    <a href="./details.html?id=${card._id}" class="btn btn-primary" id= ${card._id}>See more</a>
                </div>
            </div>
        </div>
        ` )
        : divCards.innerHTML = `<h2 class="text-white fw-bolder">Try again, no events requested</h2>`

        divCards.innerHTML = cardEvents //renderizo las cards con fecha menor
}

function searchName(names, input) { //para buscar por nombre (escribiendo)
    let eventosFiltrados = names.filter(elemento => elemento.name.toLowerCase().includes(input.toLowerCase()));
    //console.log(eventosFiltrados);
    return eventosFiltrados
}

function filterCategory(selector) {
    const categoriasChecks = Array.from(document.querySelectorAll(selector)); //traigo todos los check del html para usar y lo convierto en array
    const categorias = categoriasChecks.filter(check => check.checked).map(check => check.value); //obtengo el valor de los check seleccionados

    const eventosFiltrados = upcomingEvents.filter(evento => categorias.includes(evento.category)); //filtro los event por las categorias elegidas

    if (categorias.length > 0) {
        return eventosFiltrados; //si coincide muestro los filtrados
    }
    return upcomingEvents; //sino, todos los pasados
}