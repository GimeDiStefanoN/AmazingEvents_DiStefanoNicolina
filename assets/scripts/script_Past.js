// CODIGO PARA MOSTRAR DIFERENTES FILTROS
const divCategorias = document.querySelector('.categorias');

let checks = '';
for(let categoria of data.events){
    checks+=`
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="1">
        <label class="form-check-label" for="1">
            ${categoria.category}
        </label>
    </div>` 
}
divCategorias.innerHTML = checks

// CODIGO PARA MOSTRAR DIFERENTES CARD DE ACUERDO A LA FECHA

let currentDate = new Date(data.currentDate); //obtengo la fecha de corte

let cardsEventos = ''; //creo las card 
const divCards = document.querySelector('.cards'); //llamo al elemento del html

        for(let i = 0; i < data.events.length; i++){ //recorro todos los e de data
            let datos = data.events[i] //traigo los elementos
            let fecha = new Date(datos.date); //obtengo la fecha del evento
            if(currentDate > fecha){ //aca si la fecha es mayor cargo las card
                cardsEventos +=	`
                <div class="card" style="width: 18rem;">
                    <img src="${datos.image}"  class="card-img-top" alt="cinema">
                    <div class="card-body">
                        <h5 class="card-title">${datos.name}</h5>
                        <p class="card-text">${datos.description}</p>
                        <div class="btnCard">
                            <span class="price">$ ${datos.price}</span>
                            <a href="./details.html" class="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>`
            }
        }
        divCards.innerHTML = cardsEventos
        console.log(cardsEventos);
