const containerCards = document.getElementById("container-cards");

const events = data.events;

function createCards(arrayData) {

    containerCards.innerHTML = ""

    let cards = ''

    for (const event of arrayData) {
        cards += `<div class="col-lg-3 col-sm-4 d-flex justify-content-center mt-3">
        <div class="card">
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body  d-flex flex-wrap">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <input type="button" onclick="seeDetail('${event._id}')" class="btn btn-primary" value="More info" id="button">
            </div>
        </div>
    </div>`
    }
    return cards
}

let cardsCreated = createCards(events);

function seeDetail(_id) {
    window.location.href = `./details.html?_id=${_id}`
}

containerCards.innerHTML = cardsCreated
//search//
const search = document.getElementById("searchEvents");

search.addEventListener("keyup", () => {
    let eventsFilters = events.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()))
    console.log(eventsFilters);
    createCards(eventsFilters);
})

//checkboxes//
const boton = document.getElementById("boton");

const checks = document.querySelectorAll(".category");

boton.addEventListener("click", () => {
    let checkboxes = ''
    checks.forEach((check) => {
        if (check.checked === true) {
            checkboxes.push(check.id)
          }
    })
}
)

//forms//
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {  
    e.preventDefault();
})
