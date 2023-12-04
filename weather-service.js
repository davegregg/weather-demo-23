function fetchPointData(event) {
    const chosenCoordinates = event.target.value

    console.info(`Requesting point data for coordinates (${chosenCoordinates}).`)
    fetch(`https://api.weather.gov/points/${chosenCoordinates}`)
        .then(handleResponse)
        .then(selectForecastURL)
        .then(fetchHourlyForecast)
}


function handleResponse (response) {
    return response.json()
}


function selectForecastURL (data) {
    console.info(`Point data received:`, data)
    const forecastURL = data.properties?.forecastHourly
    if (forecastURL === "" || typeof forecastURL !== "string") {
        renderResultsMessage("Forecast unavailable.")
        throw new Error("Forecast URL is", forecastURL)
    }

    return data.properties.forecastHourly
}


function fetchHourlyForecast(forecastURL) {
    console.info(`Requesting hourly forecast via "${forecastURL}".`)
    fetch(forecastURL)
        .then(handleResponse)
        .then(selectForecastPeriods)
        .then(renderHourlyForecasts)
}


function selectForecastPeriods (data) {
    console.info(`Forecast data received"`, data)
    return data.properties.periods.filter(toTodayOnly)
}


function toTodayOnly (forecastPeriod) {
    const date = new Date(forecastPeriod.startTime)
    const today = new Date()

    return date.getDate() === today.getDate()
}