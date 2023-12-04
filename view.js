function renderResultsMessage (message, parentElement=document.querySelector("#forecastResults")) {
    parentElement.innerHTML = `
        <h2 class="animate__animated animate__flash">
            ${message}
        </h2>
    `
}


function populateCities(selectElement, cities) {
    let html = ""
    for (const city of cities) {
        html += `
            <option data-city="${city.name}" value="${city.latitude},${city.longitude}">${city.name}</option>
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
