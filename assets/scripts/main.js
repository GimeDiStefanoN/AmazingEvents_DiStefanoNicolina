// CODIGO PARA MOSTRAR DIFERENTES CARDS
function renderCards(data) {
    let cardsEventos = '';
    const divCards = document.querySelector('.cards');


    for(let event of data.events){
        cardsEventos +=`
            <div class="card" style="width: 18rem;">
                <img src="${event.image}"  class="card-img-top" alt="cinema">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <div class="btnCard">
                        <span class="price">$ ${event.price}</span>
                        <a href="./details.html" class="btn btn-primary">See more</a>
                    </div>
                </div>
            </div>
        `
    }

    divCards.innerHTML = cardsEventos
    // console.log(cardsEventos);
}
renderCards(data);
// CODIGO PARA MOSTRAR DIFERENTES FILTROS
// const divCategorias = document.querySelector('.categorias');

// let checks = '';
// for(let categoria of data.events){
//     checks+=`
//     <div class="form-check">
//         <input class="form-check-input" type="checkbox" value="" id="1">
//         <label class="form-check-label" for="1">
//             ${categoria.category}
//         </label>
//     </div>` 
// }
// divCategorias.innerHTML = checks


