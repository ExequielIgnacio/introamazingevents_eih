let params = new URLSearchParams(document.location.search)
let id = params.get("_id")

let dataID = data.events.filter(info => info._id == id);

const containerCard = document.getElementById("card-detail");

let card = "";

card += `
     <div class="card mb-3 cardDetails justify-content-center">
                <div class="row no-gutters">
                    <div class="col-md-6">
                        <img src="${dataID[0].image}" class="card-img imgDetails" alt="${dataID[0].name}">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h3 class="card-title">${dataID[0].name}</h3>
                            <p class="card-text">${dataID[0].description}</p>
                            <h4 class="card-text">Date: ${dataID[0].date}</h4>
                            <h4 class="card-text">Category: ${dataID[0].category}</h4>
                            <h4 class="card-text">Place: ${dataID[0].place}</h4>
                            <h4 class="card-text">Price: ${dataID[0].price}</h4>
                            <h4 class="card-text">Capacity: ${dataID[0].capacity}</h4>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>`

containerCard.innerHTML = card

