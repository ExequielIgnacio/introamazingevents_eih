const tableHighestPercentage = document.getElementById("eventHighestPercentage");
const tablelowestPercentage = document.getElementById("eventLowestPercentage");
const tablelargerCapacity = document.getElementById("eventlargerCapacity");
const upcomingEventsStatistics = document.getElementById("upcomingEventsStatistics");
const pastEventsStatistics = document.getElementById("pastEventsStatistics");


dateCollection();

// date collection //

function dateCollection() {
    /*fetch('./scripts/data.js')*/
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response => response.json())
        .then(data => {
            //console.log(data); // muestra el array de objetos en la consola

            currentDate = data.currentDate;

            events = data.events;
            console.log(events);

            pastEvents = data.events.filter(event => event.date < currentDate);
            upcomingEvents = data.events.filter(event => event.date > currentDate);

            highestPercentageOfAttendance(pastEvents, tableHighestPercentage);
            lowestPercentageOfAttendance(pastEvents, tablelowestPercentage);
            largerCapacity(events, tablelargerCapacity);

            statisticsUpcomingEvents = resumenEventos(upcomingEvents);
            statisticsPastEvents = resumenEventos(pastEvents);

            statisticsEvents(statisticsUpcomingEvents, upcomingEventsStatistics);
            statisticsEvents(statisticsPastEvents, pastEventsStatistics);

        })
        .catch(error => console.log(error));
}

//Eventos con mayor porcentaje de asistencia//

function highestPercentageOfAttendance(arrayEvents, location) {
    let eventHighestPercentage = null;
    let higherPercentage = 0;

    arrayEvents.forEach((event) => {
        const percentageAttendance = event.assistance / event.capacity * 100;
        if (percentageAttendance > higherPercentage) {
            higherPercentage = percentageAttendance;
            eventHighestPercentage = event.name;
        }
    });

    location.innerText = eventHighestPercentage;

}

//Eventos con menor porcentaje de asistencia//

function lowestPercentageOfAttendance(arrayEvents, location) {
    let eventLowestPercentage = null;
    let lowerPercentage = 100;

    arrayEvents.forEach((event) => {
        const percentageAttendance = event.assistance / event.capacity * 100;
        if (percentageAttendance < lowerPercentage) {
            lowerPercentage = percentageAttendance;
            eventLowestPercentage = event.name;
        }
    });

    location.innerText = eventLowestPercentage;

}

//Evento con mayor capacidad//

function largerCapacity(arrayEvents, location) {
    let eventlargerCapacity = null;
    let largerCapacity = 0;

    arrayEvents.forEach((event) => {
        const capacity = event.capacity;
        if (capacity > largerCapacity) {
            largerCapacity = capacity;
            eventlargerCapacity = event.name;
        }
    });

    location.innerText = eventlargerCapacity;

}

//funcion que toma los arrayEvents y los devuelve en objetos de cada categoria con la suma de ganancias y porcentaje de asistencia o estimaciones//

function resumenEventos(arrayEvents) {
    const resumen = [];

    // busca y obtiene todas las categorías presentes en el arrayEvents sin repetirlas//
    const categorias = [...new Set(arrayEvents.map((evento) => evento.category))];

    // Calcula las ganancias totales y el porcentaje de asistencia para cada categoría//
    categorias.forEach((categoria) => {
        let totalAsistencia = 0;
        let totalCapacidad = 0;
        let totalIngresos = 0;

        arrayEvents.forEach((evento) => {
            if (evento.category === categoria) {
                totalAsistencia += (evento.assistance || evento.estimate);
                totalCapacidad += evento.capacity;
                totalIngresos += evento.price * (evento.assistance || evento.estimate);
            }
        });

        const porcentajeAsistencia = totalAsistencia / totalCapacidad * 100;
        const ganancias = totalIngresos;

        resumen.push({
            categoria,
            porcentajeAsistencia,
            ganancias
        });
    });

    return resumen;
}

//Renderiza las estadísticas obtenidas en el resumen de eventos por categorias//

function statisticsEvents(statistics, location) {
    let table = ``;
    statistics.forEach(statistic => {
        table += `<tr>
        <td>${statistic.categoria}</td>
        <td class="text-center">$ ${statistic.ganancias}</td>
        <td class="text-center">${statistic.porcentajeAsistencia.toFixed(2)} %</td>
    </tr>`
    })
    location.innerHTML = table;
}