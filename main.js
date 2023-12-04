"use strict"

// 1. Populate city select element with city names from the city array above.
// 2. onchange event handler which finds the latitude & longitude for selected city 
// 3. fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
// 4. Then get the forecast URL using "data.properties.forecast"
//                                 or "data.properties.forecastHourly"
// 5. fetch(data.properties.forecastHourly)
// 6. Loop through the array of forecast periods (data.properties.periods)
// 7. Display a forecast for each forecast period.

window.onload = function () {
    const citySelect = document.querySelector("select#city")
    populateCities(citySelect, cities)
    citySelect.onchange = fetchPointData
}


function populateCities(selectElement, cities) {
    let html = ""
    for (const city of cities) {
        html += `
            <option value="${city.latitude},${city.longitude}">${city.name}</option>
        `
    }

    selectElement.innerHTML += html
    selectElement.removeAttribute("disabled")
}



function renderHourlyForecasts(forecasts) {
    let html = ""
    for (const forecast of forecasts) {
        html += createForecastCard(forecast)
    }

    const resultsDiv = document.querySelector("#forecastResults")
    resultsDiv.innerHTML = html
    triggerCardAnimationsAfterDelay()
    triggerCurrentHourGlow()
}


function createForecastCard (forecast) {
    const hourText = new Date(forecast.startTime)
        .toLocaleTimeString(undefined, { hour: "numeric" })
    const correctedIcon = forecast.icon
        .replace("small", "large")  // get larger icon size
        .replace(",0", ",1")        // 0% icons don't seem to exist, so workaround displaying 1%

    return `
        <div data-hour="${hourText}" class="card">
            <img src="${correctedIcon}" class="card-img-top" alt="${forecast.shortForecast}">
            <div class="card-body">
                <h5 class="card-title">${hourText} today</h5>
                <h6 class="card-subtitle">${forecast.temperature}°${forecast.temperatureUnit}</h6>
                <p class="card-text">${forecast.shortForecast}</p>
            </div>
        </div>
    `
}









function log(message, importance="info", date=new Date()) {
    let logger = null
    switch (importance) {
        case "error":
        case "urgent":
            logger = console.error
            break

        case "warn":
        case "medium":
            logger = console.warn
            break

        case "info":
        case "log":
        case "low":
        default:
            logger = console.log
    }

    logger(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

function info (message) {
    log(message, "info")
}

function warn(message) {
    log(message, "warn")
}

function error(message) {
    log(message, "error")
}

info("Oh, Potato.")
warn("Hmmm... Potato!")
error("ARGGGH! Potato!")

