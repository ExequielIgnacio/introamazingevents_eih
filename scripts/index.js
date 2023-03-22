const containerCards = document.getElementById("container-cards");

const formCheckCat = document.querySelector(".form-check");

const searchBar = document.getElementById("searchEvents");

const searchBtn = document.getElementById("boton");

let events = [];

dateCollection();

// date collection //

function dateCollection() {
    /*fetch('./scripts/data.js')*/
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(data => {
            //console.log(data); // muestra el array en la consola

            events = data.events;
            //console.log(events); // muestra el array de eventos en la consola

            createCards(events, containerCards);

            createCat(events);
        })
        .catch(error => console.log(error));
}

// functions to create cards //

function createCards(arrayData, location) {

    if (arrayData.length == 0) {
        location.innerHTML = `<p class= "display-1 text-center" >No events found, try modifying the filters</p>`;
        return false;
    }

    location.innerHTML = '';

    let cards = ''

    for (const event of arrayData) {
        cards += `<div class="col-lg-3 col-sm-4 d-flex justify-content-center mt-3">
        <div class="card">
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body  d-flex flex-wrap">
                <h5 class="card-title fw-bold text-center">${event.name}</h5>
                <p class="card-text fw-normal">${event.description}</p>
                <input type="button" onclick="seeDetail('${event._id}')" class="btn btn-primary" value="More info" id="button">
            </div>
        </div>
    </div>`
    }
    location.innerHTML = cards
}

// function to display details //

function seeDetail(_id) {
    window.location.href = `./details.html?_id=${_id}`
}

// get categories //

function getCategories(arrayData) {
    let newCat = []

    arrayData.forEach(event => {
        newCat.push(event.category);
    });

    // delete repeat categories //
    let newCatDelRep = new Set(newCat);
    //console.log(newCatDelRep);//
    return newCatDelRep;
}

// create checkboxes //

function createCat(arrayData) {

    let arrayCat = getCategories(arrayData);
    //console.log (arrayCat)//

    let cat = '';

    for (const event of arrayCat) {
        cat += `<div class="col form-check d-flex align-items-center justify-content-evenly">
        <input type="checkbox" onchange="eventsFilters()" name="status" class="form-check-input category" id="${event}" value="${event}">
        <label class="form-check-label" for="${event}">${event}</label>
        </div>`}

    formCheckCat.innerHTML = cat;
}

// show cards filtered by category and search //

function eventsFilters() {

    const search = searchBar.value.toLowerCase();

    let checkboxes = document.querySelectorAll('input[name="status"]:checked')
    //console.log(checkboxes);//

    let catFilters = [];
    checkboxes.forEach(function (input) {
        catFilters.push(input.value)
    })

    let arrayCatCheckedYSearch = events.filter(ev => (ev.description.toLowerCase().includes(search) || ev.name.toLowerCase().includes(search)) && (catFilters.length == 0 || catFilters.includes(ev.category)))

    createCards(arrayCatCheckedYSearch, containerCards);
}

searchBtn.addEventListener("click",
    eventsFilters);

searchBar.addEventListener("keyup",
    eventsFilters);
