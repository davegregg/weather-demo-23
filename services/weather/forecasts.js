function getHourlyForecast(forecastURL) {
    console.info(`Requesting hourly forecast via "${forecastURL}".`)
    fetch(forecastURL)
        .then(response => response.json(), handleNetworkFailure)
        .then(validateForecastPayload)
        .then(data => data.properties.periods.filter(toTodayOnly))
        .then(renderHourlyForecasts)
}


function validateForecastPayload (data) {
    console.info(`Forecast data received:`, data)
    if (Array.isArray(data?.properties?.periods) === false) {
        renderResultsMessage("Forecast Unavailable:<br>No forecast periods found.")
        throw new Error("No forecast periods found.")
    }

    return data
}


function toTodayOnly (forecastPeriod) {
    const date = new Date(forecastPeriod.startTime)
    const today = new Date()

    return date.getDate() === today.getDate()
}
