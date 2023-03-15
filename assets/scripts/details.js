console.log([document]);
const queryString = location.search //accedo a la propiedad de location y guardo en variable (los queryString estan despues del ? en la ruta dentro de <a></a> en el main)

const params = new URLSearchParams(queryString) //instancio un URLsearchParams, para obtener los distintos queryString de una web(de una ruta)

const id = params.get("id") //en una variable capturo el parametro id para poder usar de la nueva ruta params anterior
console.log(id);

const eventos = data.events.find(event => event._id == id ) //identifico el evento al que se le hace clic

// traigo del html
const divDetail = document.getElementById("containerDetail") 
//document.querySelector('.containerDetail'); //contenedor de detail

divDetail.innerHTML = `
  <div class="containerDetailData">
    <figure class="imageDetail">
        <img src="${eventos.image}" alt="cinema">
    </figure>
    
    <section class="textDetail">
        <div>
            <h2 class="fw-bold" >${eventos.name}</h2>
            <p>Event date: <time class="fw-bold" datetime="${eventos.date}">${eventos.date}</time></p>
            <p>Place: <span class="place fw-bold" >${eventos.place}</span></p>
        </div>
        <div>
            <p class="description">${eventos.description}</p>
        </div>
    <div>
        <div class="persons">
            <span>Capacity: <span class="total fw-bold">${eventos.capacity}</span> p.</span>
            <span>Assistance estimate: <span class="estimados fw-bold">${eventos.assistance}</span> p.</span>
        </div>
        <p class="containerPrice"><mark class="price">$${eventos.price}</mark></p>
        <p class="category" id="indoor">${eventos.category}</p>
    </div>
        
    </section>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end" id="btnDetail" >
        <button type="button" class="btn btn-outline-secondary" onclick="location.href='./index.html'">Return to Events</button>
        <button class="btn btn-primary" type="button" onclick="location.href='./contact.html'">Consult</button>
    </div>
                    
  </div>
`
