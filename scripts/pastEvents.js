const containerCards = document.querySelector('#container-cards')
const currentDate = data.currentDate
let cardsCreated = createCards(data.events)

containerCards.innerHTML = cardsCreated

function createCards(arrayData) {
    let cards = ''
    for (const event of arrayData) {
        let dateEvent = event.date
        if (dateEvent < currentDate) {
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
    }
    return cards
}

function seeDetail(_id) {
    window.location.href = `./details.html?_id=${_id}`
}