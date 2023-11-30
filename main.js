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

    citySelect.onchange = handleCityChange
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


function handleCityChange(event) {
    const chosenCoordinates = event.target.value

    console.info(`Requesting point data for coordinates (${chosenCoordinates}).`)
    fetch(`https://api.weather.gov/points/${chosenCoordinates}`)
        .then(response => response.json())
        .then(data => {
            console.info(`Point data received:`, data)
            return data.properties.forecastHourly
        })
        .then(getHourlyForecast)
}


function getHourlyForecast(forecastURL) {
    if (forecastURL === null) {
        const resultsDiv = document.querySelector("#forecastResults")
        resultsDiv.innerHTML = `
            <h2 class="animate__animated animate__flash">
                Forecast Unavailable
            </h2>
        `

        return
    }

    console.info(`Requesting hourly forecast via "${forecastURL}".`)
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            console.info(`Forecast data received"`, data)
            return data.properties.periods.filter(toTodayOnly)
        })
        .then(renderHourlyForecasts)
}


function toTodayOnly (forecastPeriod) {
    const date = new Date(forecastPeriod.startTime)
    const today = new Date()

    return date.getDate() === today.getDate()
}


function renderHourlyForecasts(forecasts) {
    let html = ""
    for (const forecast of forecasts) {
        html += createForecastCard(forecast)
    }

    const resultsDiv = document.querySelector("#forecastResults")
    resultsDiv.innerHTML = html
    triggerCardAnimations()
    triggerCurrentHourGlow()
}


function createForecastCard (forecast) {
    const hourText = new Date(forecast.startTime)
            .toLocaleTimeString(undefined, { hour: "numeric" })
    const correctedIcon = forecast.icon
        .replace("small", "large")  // get larger icon size
        .replace(",0", ",1")        // 0% icons don't seem to exist, so workaround displaying 1%

    return `
            <div data-hour="${hourText}" class="card animate__animated">
                <img src="${correctedIcon}" class="card-img-top" alt="${forecast.shortForecast}">
                <div class="card-body">
                    <h5 class="card-title">${hourText} today</h5>
                    <h6 class="card-subtitle">${forecast.temperature}°${forecast.temperatureUnit}</h6>
                    <p class="card-text">${forecast.shortForecast}</p>
                </div>
            </div>
    `
}
