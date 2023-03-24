const divAllEvents = document.getElementById('allEvents');
const divUpEvents = document.getElementById('tableUp');
const divPastEvents = document.getElementById('tablePast');

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
        
//         console.log(data);
//         return data
//     } catch(error){
//         divCards.innerHTML =`<h2 class="text-white fw-bolder text-center">An error occurred, please try again later: </h2>` 
//         + error.message
//     }
    
// };
getData();

let pastEvents = [];
let upcomingEvents = [];

async function iniciar() {
    let data = await getData();
    console.log(data);
    let currentDate = data.currentDate;
    pastEvents = data.events.filter(dat => {return dat.date < currentDate});
    upcomingEvents = data.events.filter(dat => {return dat.date > currentDate});
    //console.log(pastEvents);
    //console.log(upcomingEvents);
    calcularPorcentajePasado();
    calcularPorcentajeFuturo();
    maxOmin ();
    mostrarCategoria()
    
}
iniciar();

let porcentage = [];
//console.log(porcentage);
async function calcularPorcentajePasado(){
    pastEvents.forEach(evento => {
    let calculoPasado = (evento.assistance/evento.capacity) * 100;
    porcentage.push(calculoPasado);
    //console.log(porcentage);
    }
  )
}
async function calcularPorcentajeFuturo() {
    upcomingEvents.forEach(evento => {
        let calculoFuturo = (evento.estimate/evento.capacity) * 100;
        porcentage.push(calculoFuturo);
        //console.log(porcentage);
    })
}

let eventoMax = {nombre: '', porcentaje: Math.max.apply(null, porcentage)}
let eventoMin = {nombre: '', porcentaje: Math.min.apply(null, porcentage)}
let eventoMaxCapacidad = {nombre: '', capacidad: 0};

async function maxOmin (){
    porcentage.forEach((p, i) => {
        let evento = data.events[i];
        if (p > eventoMax.porcentaje) {
            eventoMax = {nombre: evento.name, porcentaje: p};
        }
        if (p < eventoMin.porcentaje) {
            eventoMin = {nombre: evento.name, porcentaje: p};
        }
        if (evento.capacity > eventoMaxCapacidad.capacidad) {
            eventoMaxCapacidad = {nombre: evento.name, capacidad: evento.capacity};
        }
    });
    
    divAllEvents.innerHTML = `
        <td>${eventoMax.nombre} (${eventoMax.porcentaje.toFixed(2)}%)</td>
        <td>${eventoMin.nombre} (${eventoMin.porcentaje.toFixed(2)}%)</td>
        <td>${eventoMaxCapacidad.nombre} (${eventoMaxCapacidad.capacidad})</td>
    `;
}
let setCategorias = []
async function mostrarCategoria(){
    setCategorias = new Set(pastEvents.map(event => event.category))
    console.log("🚀 ~ file: stats.js:101 ~ mostrarCategoria ~ setCategorias:", setCategorias)

    divPastEvents.innerHTML = `
    <tr>
        <td>${setCategorias.value}</td>
        <td>2</td>
        <td>3</td>
    </tr>
    `; 
}




divUpEvents.innerHTML = `
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
    </tr>
`;
divPastEvents.innerHTML = `
<tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
</tr>
`;