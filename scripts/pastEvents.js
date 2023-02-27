const containerCards = document.querySelector('#container-cards')
var currentDate = data.currentDate
let cardsCreated = createCards(data.events)

containerCards.innerHTML = cardsCreated



function createCards(arrayData) {
    let cards = ''
    for (const event of arrayData) {
        var dateEvent = event.date
        if (dateEvent < currentDate) {
            cards += `<div class="col-lg-3 col-sm-4 d-flex justify-content-center mt-3">
        <div class="card">
            <img src="${event.image}" class="card-img-top" alt="People in the cinema">
            <div class="card-body  d-flex flex-wrap">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <a href="./details.html" class="btn btn-primary">More info</a>
            </div>
        </div>
    </div>`
        }
    }
    return cards
}

