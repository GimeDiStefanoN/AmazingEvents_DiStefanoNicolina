const divAllEvents = document.getElementById('allEvents');
const divUpEvents = document.getElementById('tableUp');
const divPastEvents = document.getElementById('tablePast');

// FETCH
let data;
        // CON LA URL
async function getData(){ //con fetch traigo los datos de la URL
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

async function iniciar() {
    let data = await getData();
    //console.log(data);
    mostrarResultados()
    resultadosUp()
    resultadospast()
}
iniciar();


// TABLA 1

let pastEvents = [];

function eventPast(){ //filtro los eventos pasados
    let currentDate = data.currentDate;
    pastEvents = data.events.filter(dat => {return dat.date < currentDate});
    //console.log("🚀 ~ file: prueba.js:45 ~ iniciar ~ pastEvents:", pastEvents);

    return pastEvents
}

const arrayPast = [];
async function calcularPorcentajePasado(pastEvents){ //recorro el array y saco el % de asistencia y nombre de c/evento
    const arrayPast = pastEvents.map(evento => {
    let calculoPasado = ((evento.assistance/evento.capacity) * 100).toFixed(2);
    let nombreEvento = evento.name;
    return {
        calculoPasado,
        nombreEvento 
        };
    });
    arrayPast.sort((a,b) => b.calculoPasado - a.calculoPasado) //ordeno de mayor a menor
    //console.log("🚀 ~ file: prueba.js:75 ~ arrayPast:", arrayPast)
    //console.log("🚀 ~ file: prueba.js:75 ~ arrayPast:", arrayPast[0])
    //console.log("🚀 ~ file: prueba.js:75 ~ arrayPast:", arrayPast[arrayPast.length -1])
    return arrayPast 
}

const arrayCapacidad = [];
async function calcularCapacidad(pastEvents) { //recorro el array y saco la capacidad y nombre de c/evento
    const arrayCapacidad = pastEvents.map(evento => {
        let capacidad = evento.capacity;      
        let nombreEvento = evento.name;
        return {
            capacidad,
            nombreEvento
        };
    });
    arrayCapacidad.sort((a,b) => b.capacidad - a.capacidad) //ordeno de mayor a menor
    //console.log("🚀 ~ file: prueba.js:89 ~ arrayCapacidad ~ arrayCapacidad:", arrayCapacidad)
    //console.log("🚀 ~ file: prueba.js:89 ~ arrayCapacidad ~ arrayCapacidad:", arrayCapacidad[0])
    return arrayCapacidad 
}

async function mostrarResultados() { //junto los resultados para mostrarlos
    await eventPast();
    let arrayPast = await calcularPorcentajePasado(pastEvents);
    let arrayCapacidad = await calcularCapacidad(pastEvents);
    //espero que se terminen todas las funciones accias para poder renderizar (con el await)
    divAllEvents.innerHTML = `
    <td> ${arrayPast[0].nombreEvento} (${arrayPast[0].calculoPasado}%)</td>
    <td> ${arrayPast[arrayPast.length -1].nombreEvento} (${arrayPast[arrayPast.length -1].calculoPasado}%)</td>
    <td> ${arrayCapacidad[0].nombreEvento} (${arrayCapacidad[0].capacidad.toLocaleString()} p.)</td> 
  `; //tolocalString: para poner separadores de decimales al numero
}

// TABLA 2
let upcomingEvents = [];
let upCategorias = [];

async function eventFuture(){ //filtro los eventos futuros
    let currentDate = data.currentDate;
    upcomingEvents = data.events.filter(dat => {return dat.date > currentDate});
    //console.log("🚀 ~ file: prueba.js:47 ~ iniciar ~ upcomingEvents:", upcomingEvents)
    
    return upcomingEvents
}
let resumenUp = [];
async function upTable() {
    const upCategorias = Array.from(new Set(upcomingEvents.map(event => event.category))); //traigo todas las categorias futuras no repetidas y las convierto en Array
    
    const eventUpAgrupados = upCategorias.map(categoria => upcomingEvents.filter( e => e.category == categoria)) //por cada categoria, agrupo los eventos correspondientes en un array diferente
    
    resumenUp = eventUpAgrupados.map( categoria => { //recorro cada array y traigo el nombre y le calculo la ganancia y % asistencia.
        const name = categoria[0].category; //nombre
       
        const gananciaEstimada = categoria.map(item => item.price * item.estimate).reduce((acc, curr) => acc + curr, 0); //precio x asistencia de c/evento y dps sumo
        
        const asistenciaEstimada = categoria.map(item => item.estimate).reduce((acc, curr) => acc + curr, 0);
        const capacidad = categoria.map(item => item.capacity).reduce((acc, curr) => acc + curr, 0);
        const porcentajeCategoria = ((asistenciaEstimada/capacidad) * 100).toFixed(2); //divido asistencia con la capacidad calculada antes y hago porcentaje
        
        return {
            name,
            gananciaEstimada,
            porcentajeCategoria
        }
    })
}

async function resultadosUp() {
    await eventFuture();
    await upTable();
    //console.log(resumenUp);
        //espero que terminen las 2 funcionen para renderizar y recorro resumenUp para hacer una fila por cada objeto y con join uno todas las filas
divUpEvents.innerHTML = resumenUp.map(categoria =>`
    <tr>
        <td> ${categoria.name} </td>
        <td> $ ${(categoria.gananciaEstimada).toLocaleString()} </td>
        <td>  ${categoria.porcentajeCategoria} % </td>
    </tr>
    `).join('');
};

// TABLA 3

let resumenPast = [];
async function pastTable() {
    const pastCategorias = Array.from(new Set(pastEvents.map(event => event.category)));
    //console.log("🚀 ~ file: prueba.js:155 ~ pastTable ~ pastCategorias:", pastCategorias);

    const eventPastAgrupados = pastCategorias.map(categoria => pastEvents.filter( e => e.category == categoria));
    //console.log("🚀 ~ file: prueba.js:158 ~ pastTable ~ eventPastAgrupados:", eventPastAgrupados);

    resumenPast = eventPastAgrupados.map( categoria => { //recorro cada array y traigo el nombre y le calculo la ganancia y % asistencia.
        const name = categoria[0].category; //nombre
       
        const gananciaTotal = categoria.map(item => item.price * item.assistance).reduce((acc, curr) => acc + curr, 0); //precio x asistencia de c/evento y dps sumo
        //console.log("🚀 ~ file: prueba.js:166 ~ pastTable ~ gananciaTotal:", gananciaTotal)
        
        const asistenciaTotal = categoria.map(item => item.assistance).reduce((acc, curr) => acc + curr, 0);
        const capacidad = categoria.map(item => item.capacity).reduce((acc, curr) => acc + curr, 0);
        const porcentajeCategoria = ((asistenciaTotal/capacidad) * 100).toFixed(2); //divido asistencia con la capacidad calculada antes y hago porcentaje
        
        return {
            name,
            gananciaTotal,
            porcentajeCategoria
        }
    })
    //console.log("🚀 ~ file: prueba.js:177 ~ pastTable ~ resumenPast:", resumenPast)
}

async function resultadospast() {
    await eventPast();
    await pastTable();
    //console.log(resumenPast);
    //espero que terminen las 2 funcionen para renderizar y recorro resumenPast para hacer una fila por cada objeto y con join uno todas las filas
    
    divPastEvents.innerHTML = resumenPast.map(categoria =>`
    <tr>
        <td> ${categoria.name} </td>
        <td> $ ${(categoria.gananciaTotal).toLocaleString()} </td>
        <td>  ${categoria.porcentajeCategoria} % </td>
    </tr>
    `).join('');
};