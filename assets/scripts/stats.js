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
    //console.log(data);
    let currentDate = data.currentDate;
    pastEvents = data.events.filter(dat => dat.date < currentDate);
    upcomingEvents = data.events.filter(dat => dat.date > currentDate);
    //console.log(pastEvents);
    //console.log(upcomingEvents);
}
iniciar();


divAllEvents.innerHTML = `
<td>1</td>
<td>2</td>
<td>3</td>
`;
divUpEvents.innerHTML = `
<thead class="thead-dark">
    <tr>
        <th colspan="3">Upcoming events statistics by category</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Categories</td>
        <td>Revenues</td>
        <td>Percentage of attendance</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
    </tr>
</tbody>
`;
divPastEvents.innerHTML = `
<thead class="thead-dark">
    <tr>
    <th colspan="3">Past Events statistics by category</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Categories</td>
        <td>Revenues</td>
        <td>Percentage of attendance</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
    </tr>          
</tbody>
`;