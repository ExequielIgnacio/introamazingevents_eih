const events = data.events;

const containerCards = document.getElementById("container-cards");
const foodFairCheckbox = document.getElementById("foodFairCheckboox");
const museumCheckbox = document.getElementById("museumCheckbox");
const costomePartyCheckbox = document.getElementById("costumePartyCheckbox");
const musicConcertCheckbox = document.getElementById("musicConcertCheckbox");
const raceCheckbox = document.getElementById("raceCheckbox");
const bookExchangeCheckbox = document.getElementById("bookExchangeCheckbox");
const cinemaCheckbox = document.getElementById("cinemaCheckbox");

const searchBar = document.getElementById("searchEvents");
const searchBtn = document.getElementById("boton");

createCards(events);

// Functions for create cards //

function createCards(arrayData) {

    if (arrayData.length === 0) {
        containerCards.innerHTML = `<h1>No events found, try modifying the filters</h1>`;
    }

    containerCards.innerHTML = '';

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
    containerCards.innerHTML = cards
}

// funcion para mostrar detaills //

function seeDetail(_id) {
    window.location.href = `./details.html?_id=${_id}`
}

// checkBox //

function mostrarCardsChecked() {

    const categoriesChecks = [];

    if (foodFairCheckbox.checked) {
        categoriesChecks.push('food fair');
    }
    if (museumCheckbox.checked) {
        categoriesChecks.push('museum');
    }
    if (costomePartyCheckbox.checked) {
        categoriesChecks.push('costume party');
    }
    if (musicConcertCheckbox.checked) {
        categoriesChecks.push('music concert');
    }
    if (raceCheckbox.checked) {
        categoriesChecks.push('race');
    }
    if (bookExchangeCheckbox.checked) {
        categoriesChecks.push('book exchange');
    }
    if (cinemaCheckbox.checked) {
        categoriesChecks.push('cinema');
    }

    const eventsFilters = events.filter(event => categoriesChecks.includes(event.category.toLocaleLowerCase()));
    let newEventsFilters = []
    eventsFilters.forEach(event => {

        newEventsFilters.push(event)

        //console.log(event);//
    });

    if (newEventsFilters.length > 0) {
        createCards(newEventsFilters.reverse());
    } else {
        createCards(events);
    }
}

foodFairCheckbox.addEventListener('change', mostrarCardsChecked);
museumCheckbox.addEventListener('change', mostrarCardsChecked);
costomePartyCheckbox.addEventListener('change', mostrarCardsChecked);
musicConcertCheckbox.addEventListener('change', mostrarCardsChecked);
raceCheckbox.addEventListener('change', mostrarCardsChecked);
bookExchangeCheckbox.addEventListener('change', mostrarCardsChecked);
cinemaCheckbox.addEventListener('change', mostrarCardsChecked);

// search //

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    search();
});

searchBar.addEventListener("keyup", function (event) {
    event.preventDefault();
    search();
});

function search() {
    let eventsFilters = events.filter((event) => event.name.toLowerCase().includes(searchBar.value.toLowerCase()) || event.description.toLowerCase().includes(searchBar.value.toLowerCase()));
    console.log(eventsFilters);
    createCards(eventsFilters);
}



/* PRIMER INTENTO

//search//

const search = document.getElementById("searchEvents");
console.log(search);


search.addEventListener("keyup", () => {
    let eventsFilters = events.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()))
    console.log(eventsFilters);
    createCards(eventsFilters);
})


//forms//
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
})


//checkboxes//
const boton = document.getElementById("boton");

const checks = document.querySelectorAll(".category");

boton.addEventListener("click", () => {
    let checkboxes = []
    checks.forEach((check) => {
        if (check.checked == true) {
            console.log(checkboxes);
            checkboxes.push(check.id)
        }
    })
    let dataFiltradaXCategoria = events.filter( ev=> ev.category == checkboxes)
    console.log(dataFiltradaXCategoria);
    createCards(dataFiltradaXCategoria);
}
)
*/