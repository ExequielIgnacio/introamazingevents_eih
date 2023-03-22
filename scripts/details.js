
const containerCard = document.getElementById("card-detail");

dateCollection();

// date collection //

function dateCollection() {
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(data => {
            //console.log(data); // muestra el array de objetos en la consola

            const events = data.events;
            console.log(events);

            let params = new URLSearchParams(document.location.search)
            let id = params.get("_id")
            let dataID = events.filter(info => info._id == id);

            createCardDetail(dataID);

        })
        .catch(error => {
            console.log(error);
        });
}




function createCardDetail(arrayData) {

    let card = "";

    card += `
     <div class="card w-100 border-light mb-3 justify-content-center" style="
     height: 100%">
                <div class="row no-gutters" style="
                height: 100%">
                    <div class="col-md-6">
                        <img src="${arrayData[0].image}" class="rounded-start imgDetails" alt="${arrayData[0].name}">
                    </div>
                    <div class="col-md-6 d-flex flex-column">
                        <div class="card-header">
                            <h3 class="text-center card-title">${arrayData[0].name}</h3>
                        </div>
                        <div class="card-body">
                            <p class="card-text fw-semibold">${arrayData[0].description}</p>
                            <p class="card-text fw-semibold">Date: ${arrayData[0].date}</p>
                            <p class="card-text fw-semibold">Category: ${arrayData[0].category}</p>
                            <p class="card-text fw-semibold">Place: ${arrayData[0].place}</p>
                            <p class="card-text fw-semibold">Capacity: ${arrayData[0].capacity}</p>
                        </div>
                        <div class="row card-footer text-muted d-flex align-content-end flex-wrap">
                            <p class="col card-text d-flex justify-content-start align-items-end mb-0 text-capitalize fw-semibold">${Object.keys(arrayData[0])[9]}: ${arrayData[0].assistance || arrayData[0].estimate}</p>
                            <p class="col card-text d-flex justify-content-end align-items-end fw-semibold">Price: ${arrayData[0].price}</p>
                        </div>
                    </div>
                </div>
            </div>`

    containerCard.innerHTML = card
}
